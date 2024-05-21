import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
// import Modal from "react-native-modal";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import Header from "./UI/Header";
import { useIsFocused } from '@react-navigation/native';
import * as Device from 'expo-device';

import { useTranslation } from 'react-i18next';
import * as tasksAction from "../redux/reducers/tasks";

export default function ScanCourier( { navigation, route } ) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanType, setScanType] = useState(null);
  const [list, setList] = useState([]);
  const [trackCode, setTrackCode] = useState('');
  const [readyToScan, setReadyToScan] = useState(true);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [again, setAgain] = useState(false);
  const [packageType, setPackageType] = useState(null);
  const [errorText, setErrorText] = useState('');
  const [scannedText, setScannedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [onEvidence, setOnEvidence] = useState(false);
  const [evidenceType, setEvidenceType] = useState(null);
  

  const scanerInput = useRef();

  const tasks = useSelector(state => state.tasks);
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(tasksAction.fetchTasks(user.user.username))
    .catch(error => {
      console.error(error, 'error');
    });
  }, []);
  
  const isFocused = useIsFocused();

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    if(item.type == 'in'){
      dispatch({
        type: 'ADD_TASK',
        payload: item.item,
      });
    }
    if(item.type == 'out'){
      dispatch({
        type: 'DELETE_TASK',
        payload: item.trackCode,
      });
    }
  };

  const goToStock = () => {
    navigation.navigate('Tasks')
  };
  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <Header page="main" label={route.params.title} />,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      }
    });
    if(Device.manufacturer == 'UROVO') {
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

    if(Device.manufacturer == 'UROVO') {
      setScannedText(input);
    }
    setTrackCode(input);
    
    setReadyToScan(false);

    const neededStatus = scanType == 'out' ? 1 : 0;

    var сomplate = tasks.tasks.filter((task) => task.object_code == input && task.finished == neededStatus);
    setIsLoading(true);
    if(сomplate.length > 0){
      setAgain(true);
      setIsLoading(false);
    } else {      
      try {
        const base = 'https://pda.139express.com/api/';
        const url = packageType == 'p' ? 'courierpushbatch' : 'courierpushpackage';
        console.info(user, 'user');
        let res = await fetch(base+url, {
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
            packageType: packageType,
            eventLocation: user.user.address,
            eventCountry: user.user.S_Country,
            eventProvince: user.user.Stateormunicipality,
            eventZipCode: user.user.ZipCode,
            OperateUserID: user.user.username,
          })
        });
        res = await res.json();
        console.info(input, 'code');
        console.info(res);
        setIsLoading(false);
        if(res.status == 'success'){
          setSuccess(true);
          setErrorText('');
          handleAddItem({
            type: scanType,
            trackCode: input,
            item: res.item
          });

        } else {
          setFail(true);
          if(res.data.Message){
            setErrorText(res.data.Message);
          }
        }
      } catch (e) {
        setIsLoading(false);
        console.error(e);
      }
    }
  }

  const handleBarCodeScanned = ({ type, data }) => {
    sendData(data);
  };

  const goToEvidence = () => {
    setOnEvidence(true);
  }

  const goToSign = () => {
    setOnEvidence(true);
  }

  const goToPhoto = () => {
    setOnEvidence(true);
  }

  const goToSticker = () => {
    setOnEvidence(true);
  }

  if (onEvidence) {
    return <View style={{  
      paddingHorizontal: 20,
      paddingTop: 20
    }}>
      <TouchableOpacity
        style={styles.buttonToEvidence}
        onPress={() => goToSign()}
        // disabled={scanned}
      >
        <Text style={styles.buttonText}>{t('common.sign')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonToEvidence}
        onPress={() => goToPhoto()}
        // disabled={scanned}
      >
        <Text style={styles.buttonText}>{t('common.photo')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonToEvidence}
        onPress={() => goToSticker()}
        // disabled={scanned}
      >
        <Text style={styles.buttonText}>{t('common.sticker')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => setOnEvidence(false)}
        // disabled={scanned}
      >
        <Text style={styles.buttonText}>{t('common.back')}</Text>
      </TouchableOpacity>
    </View>;
  }



  const readyToScanFunc = () => {
    setReadyToScan(true);
    setAgain(false);
    setSuccess(false);
    setFail(false);
    setErrorText('');

    if(Device.manufacturer == 'UROVO') {      
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

  if (Device.manufacturer != 'UROVO' && hasPermission === null) {
    return <View />;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color="#d00020" />
      </View>
    );
  }

  if (Device.manufacturer != 'UROVO' && hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission not granted</Text>
      </View>
    );
  }


  if (list.length > 0) {
    return (
      <FlatList
        data={list}
        keyExtractor={(item, index) => {
          return  index.toString();
        }}
        style={{backgroundColor: '#ffffff'}}
        renderItem={({item, index}) => (
          <View style={styles.statusBlock}>
            <View style={styles.statusItem}>     
              <View style={styles.iconContainer}>
                <FontAwesome
                  name="flag"
                  size={15}
                  color={index == 0 ? 'green' : '#A6ABAF'}
                />
              </View>
              <Text style={index == 0 ? {color:'#22264b'} : {color:'#A6ABAF'}}>{item.country}</Text>
            </View>
            <View style={styles.statusItem}> 
              <View style={styles.iconContainer}>
                <FontAwesome
                  name="info"
                  size={15}
                  color={index == 0 ? 'green' : '#A6ABAF'}
                />
              </View>
              <Text style={index == 0 ? styles.descriptionFirst : styles.description}>{item.description}</Text>
            </View>
            <View style={styles.statusItem}>  
              <View style={styles.iconContainer}>
                <FontAwesome
                  name="clock-o"
                  size={15}
                  color={index == 0 ? 'green' : '#A6ABAF'}
                />
              </View>
              <Text style={index == 0 ? {color:'#22264b'} : {color:'#A6ABAF'}}>{item.datetime}</Text>
            </View>
          </View>
        )}
      />
    );
  }

  return (
    <View style={styles.container}>
      {packageType === null &&(
        <Text style={{
          fontSize: 18,
          paddingVertical: 15
        }}>{t('common.what_scan')}</Text>
      )}
      {readyToScan && (
        <>
        <View style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          // marginBottom: 20,
          paddingVertical: 10,
          paddingHorizontal: 10,
          position: 'absolute',
          top: 0,
          zIndex: 10,
          // backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <TouchableOpacity 
            style={{
              padding: 10,
              backgroundColor: packageType == 'p' ? 'green' : 'grey',
              width: '48%',
              borderRadius: 5,
            }}
            onPress={() => setPackageType('p')}
          >
            <Text style={{
              textAlign: 'center', 
              color: '#ffffff'
            }}>{t('common.parent')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
              padding: 10,
              backgroundColor: packageType == 'c' ? 'green' : 'grey',
              width: '48%',
              borderRadius: 5,
            }}
            onPress={() => setPackageType('c')}
          >
            <Text style={{
              textAlign: 'center', 
              color: '#ffffff'
            }}>{t('common.child')}</Text>
          </TouchableOpacity>
        </View>

        {packageType !== null && Device.manufacturer == 'UROVO' && readyToScan && (
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
        </>
      )}
        {!readyToScan && (
          <View style={{
            position: 'absolute',
            top: 20,
            justifyContent: 'center',
            zIndex: 100
          }}>
            <View>
              {success && (
                <Text style={{
                  color: 'green',
                  fontSize: 15,
                  marginBottom: 15,
                  textAlign: 'center'
                }}>{t('common.status_for')} <Text style={{fontWeight: 600}}>{trackCode}</Text> {t('common.changed_successfully')}!</Text>
              )}
              {fail && (
                <Text style={{
                  color: 'red',
                  fontSize: 15,
                  marginBottom: 15,
                  textAlign: 'center'
                }}>{errorText}</Text>
              )}
              {again && (
                <Text style={{
                  color: 'red',
                  fontSize: 15,
                  marginBottom: 15
                }}>{t('common.already_scanned')}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => readyToScanFunc()}
              // disabled={scanned}
            >
              <Text style={styles.buttonText}>{t('common.scan')}</Text>
            </TouchableOpacity>
            {scanType == 'out' && (
              <TouchableOpacity
                style={styles.buttonToEvidence}
                onPress={() => navigation.navigate('Evidence')}
                // disabled={scanned}
              >
                <Text style={styles.buttonText}>{t('common.finish')}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {packageType !== null && Device.manufacturer != 'UROVO' && renderCamera()}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
    // width: '100%',
    height: '100%',
    aspectRatio: 1,
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
  },
  buttonToEvidence: {
    backgroundColor: '#009CFF',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonBack: {
    backgroundColor: 'grey',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center'
  },
});

