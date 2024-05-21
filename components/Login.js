import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { MaskedTextInput } from 'react-native-mask-text';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { Constants } from 'expo';

import ImageViewer from './ImageViewer';
import Button from './Button';

const PlaceholderImage = require('../assets/images/139express-logo.png');

export default function Login() {

  const [phone, setPhone] = useState(true);
  const [code, setCode] = useState('');
  const [phoneFail, setPhoneFail] = useState(false);
  const [codeFail, setCodeFail] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [showCodeField, setShowCodeField] = useState(false);
  const [enableButton, setEnableButton] = useState(true);
  const [enableLoginButton, setEnableLoginButton] = useState(true);


  const mask = '+7 (999) 999-9999';
  
  const phoneTyping = (val) =>  {
    var number = val.replace(/\D/g, "");
    setPhone(number);
    if(number.length == 11){
      setEnableButton(false);
    } else {
      setEnableButton(true);
    }
  };
  
  const codeTyping = (val) =>  {
    setCode(val);
    if(val.length == 6){
      setEnableLoginButton(false);
    } else {
      setEnableLoginButton(true);
    }
  };
  
  const onLogin = () =>  {
    var number = phone.replace(/\D/g, "");
    alert('номер: ' + number);
  };

  const sendVerification = () => {
    
  };
  const confirmCode = () => {
    
  };

  const onInputCompleted = (text) => {
    alert(
      text,
      '本次输入的验证码',
      [
        {
          text: '确定',
        },
      ],
      { cancelable: false }
    )
  };

  const getOpt = async() => {
    var number = phone.replace(/\D/g, "");
    
    try {
      let res = await fetch('http://kz.139express.com/api/phone/getopt', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS'

        },
        body: JSON.stringify({
          phone: number
        })
      });
      res = await res.json();
      if(res.status == 'success'){
        setErrorText('');
        setPhoneFail(false);
        setShowCodeField(true);
      } else {
        setErrorText(res.message);
        setPhoneFail(true);
      }
      // console.log(res)
      // alert(res.status);
    } catch (e) {
      console.error(e);
    }
  };

  const login = async() => {
    var number = phone.replace(/\D/g, "");
    // console.log(number);
    // return;
    try {
      let res = await fetch('http://kz.139express.com/api/phone/verification', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS'

        },
        body: JSON.stringify({
          phone: number,
          code: code
        })
      });
      res = await res.json();
      if(res.status == 'success'){
        setErrorText('');
        setCodeFail(false);
        setLoggedIn(true);
        // alert('Yepppp!!!');
      } else {
        setErrorText(res.message);
        setCodeFail(true);
      }
      // console.log(res)
      // alert(res.status);
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <Text style={styles.loginLabel}>
        <FontAwesome
          name="user-o"
          size={20}
          color="#d00020"
          style={{marginRight:10}}
        />
         Войти
      </Text>
      <View style={styles.inputView} >
        <MaskedTextInput
          mask={mask}
          placeholder="Ваш номер телефона" 
          keyboardType="numeric"
          style={styles.inputText}
          onChangeText={number => phoneTyping(number)}/>  
      </View>
      {phoneFail ? 
        <Text style={styles.failText}>
          <FontAwesome
            name="error-o"
            size={20}
            color="#d00020"
            style={{marginRight:10}}
          />
          {errorText}
        </Text>
        : null
      }
      {showCodeField ? 
        <View style={{width:"100%",alignItems: 'center',justifyContent: 'center'}}>
          <View style={styles.inputView}>
              <TextInput
                placeholder="Код из смс"
                onChangeText={number => codeTyping(number)}
                style={styles.inputText}
                maxLength={6}
                keyboardType="numeric" />
            </View>
          <View style={styles.buttonContainer}>
            <Button theme="primary" label="Войти" disabled={enableLoginButton} func={login} />
          </View>
        </View>
        : 
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Получить код" disabled={enableButton} func={getOpt} />
        </View>
      }
      {codeFail ? 
        <Text style={styles.failText}>
          <FontAwesome
            name="error-o"
            size={20}
            color="#d00020"
            style={{marginRight:10}}
          />
          {errorText}
        </Text>
        : null
      }
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    marginHorizontal: 0,
    marginVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
    marginTop: 200,
  },
  footerContainer: {
    flex: 2 / 3,
    alignItems: 'center',
    width:"80%",
  },
  buttonContainer: {
    alignItems: 'center',
    width:"80%",
  },
  loginLabel:{
    width:"80%",
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
    color: "#d00020",
    fontSize:20,
    marginBottom: 20
  },
  failText: {
    width:"80%",
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
    color: "#d00020",
    fontSize:15,
    marginBottom: 15
  },
  inputView:{
    width:"80%",
    // backgroundColor:"#d00020",
    borderWidth: 2,
    borderColor: "#d00020",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    textAlign: "center",
    fontSize: 20,
  }
});
