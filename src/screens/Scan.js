import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  Dimensions, 
  TouchableOpacity,
  PermissionsAndroid,
  Button, 
  Pressable } from "react-native";
// import Modal from "react-native-modal";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from "react";

import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import Header from "./UI/Header";
import { useIsFocused } from '@react-navigation/native';
import * as Device from 'expo-device';

import { useTranslation } from 'react-i18next';

export default function Search( { navigation, route } ) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanType, setScanType] = useState(null);
  const [trackCode, setTrackCode] = useState('');
  const [readyToScan, setReadyToScan] = useState(true);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [customScaner, setCustomScaner] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [scannedText, setScannedText] = useState('');

  const user = useSelector(state => state.user);

  const scanerInput = useRef();
  
  const isFocused = useIsFocused();

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const goToStock = () => {
    navigation.navigate('Orders')
  };
  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <Header page="scan" label={route.params.title} func={goToStock} />,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      }
    });
    if(Device.manufacturer == 'UROVO' || customScaner) {
      setTimeout(() => scanerInput.current.focus(), 500) 
    } else {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }
    setScanType(route.params.type);
  }, []);

  const sendData = async(input) => { 

    if(Device.manufacturer == 'UROVO' || customScaner) {
      setScannedText(input);
    }
    setTrackCode(input);
    setReadyToScan(false);

    try {
      let res = await fetch('https://pda.139express.com/api/pushdata', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS'

        },
        body: JSON.stringify({
          track_code: input,
          type: route.params.type,
          eventLocation: user.user.address,
          eventCountry: user.user.S_Country,
          eventProvince: user.user.Stateormunicipality,
          eventZipCode: user.user.ZipCode,
          OperateUserID: user.user.username,
        })
      });
      res = await res.json();
      // console.info(res);
      if(res.status == 'success'){
        setSuccess(true);
        console.info(scanType);
        if(scanType == 'in'){
          dispatch({
            type: 'ADD_ORDER',
            payload: res.data.Data,
          });
        }
        if(scanType == 'out'){
          dispatch({
            type: 'DELETE_ORDER',
            payload: input,
          });
        }
      } else {
        setFail(true);
        if(res.data.Message){
          setErrorText(res.data.Message);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handleBarCodeScanned = async({ type, data }) => {
    sendData(data);
  };

  const readyToScanFunc = () => {
    setReadyToScan(true);
    setSuccess(false);
    setFail(false);
    setScannedText('');

    if(Device.manufacturer == 'UROVO' || customScaner) {
      setTimeout(() => scanerInput.current.focus(), 500)      
    }
  };

  const renderCamera = () => {
    return (
      <>
        <View style={styles.cameraContainer}>
          {isFocused && readyToScan ? (
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          ) : null}
        </View>
      </>
    );
  };

  if (!customScaner && Device.manufacturer != 'UROVO' && hasPermission === null) {
    return <View />;
  }

  if (!customScaner && Device.manufacturer != 'UROVO' && hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!readyToScan && (
        <View style={{
          // marginTop: 20
        }}>
          <View>
            {success && (
              <Text style={{
                color: 'green',
                fontSize: 15,
                marginBottom: 15
              }}>{t('common.status_for')} <Text style={{fontWeight: 600}}>{trackCode}</Text> {t('common.changed_successfully')}!</Text>
            )}
            {fail && (
              <Text style={{
                color: 'red',
                fontSize: 15,
                marginBottom: 15
              }}>{errorText}</Text>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => readyToScanFunc()}
              // disabled={scanned}
            >
              <Text style={styles.buttonText}>{t('common.scan')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {(customScaner || Device.manufacturer == 'UROVO') && readyToScan && (
          <View style={{
            width: '100%',
            marginBottom: 20,
            paddingHorizontal: 10
          }}>
            <TextInput
              placeholder="Scan Barcode"
              onChangeText={val => sendData(val)}
              value={scannedText}
              ref={scanerInput}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderColor: '#cccccc',
                borderWidth: 1,
                borderRadius: 10,
                textAlign: 'center',
                backgroundColor: '#ffffff'
              }} />
          </View>
        )}
      {!customScaner && Device.manufacturer != 'UROVO' && renderCamera()}
      {Device.manufacturer != 'UROVO' && (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 'auto'
        }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#009CFF',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
              width: '45%'
            }}
            onPress={() => setCustomScaner(!customScaner)}
            // disabled={scanned}
          >
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'OpenSans-Bold',
              textAlign: 'center'
            }}>{customScaner ? t('common.camera') : t('common.scaner')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 20
  },
  title: {
    fontSize: 24,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '100%',
    // height: '70%',
    aspectRatio: 0.8,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: '#d00020',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center'
  },
});

