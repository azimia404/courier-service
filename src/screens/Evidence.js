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
import Header from "./UI/Header";
import { useIsFocused } from '@react-navigation/native';
import * as Device from 'expo-device';

import Sign from "./UI/Sign";
import Photo from "./UI/Photo";

import { useTranslation } from 'react-i18next';
import dropoff from "../redux/reducers/dropoff";

export default function Evidence( { navigation, route } ) {

  const [isLoading, setIsLoading] = useState(false);
  const [evidenceType, setEvidenceType] = useState(null);
  const [stopped, setStopped] = useState(false);

  const listTracked = useSelector(state => state.trackedList);
  const user = useSelector(state => state.user);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <Header page="main" label={t('common.evidence')} />,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      }
    });
  }, []);

  const saveCustom = async() => {
    try {
      let res = await fetch('https://pda.139express.com/api/savedropoff', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS'
        },
        body: JSON.stringify({
          OperateUserID: user.user.username
        })
      });
      res = await res.json();
      if(res.status == 'success'){
        // console.error(res);

        setStopped(true);
        setTimeout(() => {
          navigation.goBack();
        }, 1000)
      } else {
        navigation.goBack();
        console.error(res);
      }
    } catch (e) {
      navigation.goBack();
      console.error(e);
    }
  };

  const goToSign = () => {
    setEvidenceType('sign');
  }

  const goToPhoto = () => {
    setEvidenceType('photo');
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color="#d00020" />
      </View>
    );
  }

  return <>
    <View style={{
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
        onPress={() => saveCustom()}
        // disabled={scanned}
      >
        <Text style={styles.buttonText}>{t('common.sticker_finish')}</Text>
      </TouchableOpacity>
    </View>
    {stopped && (
      <Text style={{color:'#29A71A', fontSize: 14, textAlign: 'center', marginBottom:50}}>{t("common.finished")}</Text>
    )}
    {evidenceType == 'sign' && (
      <Sign/>
    )}
    {evidenceType == 'photo' && (
      <Photo/>
    )}
  </>;
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

