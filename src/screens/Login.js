import { StyleSheet, View, TextInput, ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../redux/slices/userSlice';

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Button from './UI/Button';
import RBSheet from "react-native-raw-bottom-sheet";
import Header from "../screens/UI/Header";

import { chooseLang } from '../redux/slices/userSlice';
import { useTranslation } from 'react-i18next';

export default function Login({navigation}) {

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [phoneFail, setPhoneFail] = useState(false);
  const [codeFail, setCodeFail] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState(null);
  
  const RBSheetLangs = useRef(null);
  const user = useSelector(state => state.user);

  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const langs = [
    { code: 'ru', label: 'Русский язык' },
    { code: 'en', label: 'English' },
    { code: 'ge', label: 'ქართული ენა' },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <Header page="main" label={t('bottom_tab.home')} />
    });
  });

  const openLanguages = () => {
    RBSheetLangs.current.open();
  };

  const changeLanguage = (lang) => {
    dispatch(chooseLang(lang));
    i18n.changeLanguage(lang.code);
    
    // i18n.changeLanguage(lang);
    RBSheetLangs.current.close();
  };

  const signin = (user) => {
    dispatch(signIn(user))
  }

  const login = async() => {
    setIsLoading(true);
    try {
      let res = await fetch('https://pda.139express.com/api/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS'
        },
        body: JSON.stringify({
          username: phone,
          password: code,
          type: userType
        })
      });
      res = await res.json();
      console.info(res);
      setIsLoading(false);
      if(res.status == 'success'){
        setErrorText('');
        setCodeFail(false);
        signin(res.user);

      } else {
        setErrorText(res.message);
        setCodeFail(true);
      }
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color="#d00020" />
      </View>
    );
  }


  return (
    <>
      <View style={styles.container}>
        {userType !== null ? (
          <>
            <Text style={styles.welcomeLabel}>{t('common.sign_in')}</Text>
            <Text style={styles.subLabel}>
            {t('common.wellcome_text')}
            </Text>
            <View style={styles.phoneBlock} >
              <TextInput
                placeholder={t('common.enter_username')} 
                style={styles.inputText}
                value={phone}
                onChangeText={(val) => setPhone(val)}
              />
            </View>
            <View style={styles.phoneBlock} >
              <TextInput
                placeholder={t('common.enter_pass')} 
                style={styles.inputText}
                value={code}
                secureTextEntry={true}
                onChangeText={(val) => setCode(val)}
              />
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
            <View style={styles.footerContainer}>
              <Button theme="primary" label={t('common.login')} disabled={code && phone ? false : true} func={login} />
              <Button theme="secondary" label={t('common.back')} func={() => setUserType(null)} />
            </View>
            <View style={styles.footerContainer}>
              <Text style={{textAlign: 'center'}}>
                {t('common.contact_it')}
              </Text>
            </View>
            {codeFail ? 
              <Text style={styles.failText}>
                <FontAwesome
                  name="warning"
                  size={20}
                  color="#d00020"
                  style={{marginRight:10}}
                />
                {errorText}
              </Text>
              : null
            }
          </>
        ) : (
          <>
            <Text style={styles.welcomeLabel}>{t('common.sign_in')}</Text>
            <Text style={styles.subLabelTwo}>
              {t('common.select_role')}
            </Text>
            <View style={styles.footerContainer}>
              <Button theme="primary" label={t('common.courier')} func={() => setUserType('c')} />
            </View>
            <View style={styles.footerContainerTwo}>
              <Button theme="primary" label={t('common.pickup_point')} func={() => setUserType('p')} />
            </View>
            {/* <View style={styles.footerContainerTwo}>
              <Button theme="primary" label={t('common.distribution')} func={() => setUserType('d')} />
            </View> */}

            <TouchableOpacity
              style={{
                marginTop: 40,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }} 
              onPress={openLanguages}
            >
              <FontAwesome
                name="language"
                size={22}
                color="#d00020"
              />
              <Text>  </Text>
              <Text style={{
                fontSize: 18
              }}>{user.lang.label}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <RBSheet
        ref={RBSheetLangs}
        height={250}
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
          draggableIcon: {
            backgroundColor: '#d00020',
            width: 58
          },
        }}
        closeOnDragDown={true}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
        >
          <Text style={{
            fontSize: 22,
            fontFamily: 'OpenSans-Bold',
            textAlign: 'center',
            marginBottom: 20,
            color: "#d00020"
          }}>{t("screens.profile.items.choose_language")}</Text>
          <ScrollView>
            {langs.map(lang => (
              <TouchableOpacity
                style={{marginBottom: 10}}
                key={lang.code}
                onPress={() => changeLanguage(lang)}
              >
                <Text style={{fontSize: 16, textAlign: 'center'}}>{lang.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>    
      </RBSheet>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // minHeight: height
  },
  input: {
    height: 40,
    marginHorizontal: 0,
    marginVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
  footerContainer: {
    // flex: 2 / 3,
    alignItems: 'center',
    width:"80%",
    marginTop: 20
  },
  footerContainerTwo: {
    // flex: 2 / 3,
    alignItems: 'center',
    width:"80%",
    marginTop: 5
  },
  welcomeLabel: {
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
    color: "#009CFF",
    fontSize: 25,
    fontWeight: 600,
    marginBottom: 0
  },
  subLabel: {
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
    color: "#000000",
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 35
  },
  subLabelTwo: {
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
    color: "#000000",
    fontSize: 18,
    fontWeight: 500
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
  phoneBlock:{
    width:"80%",
    borderWidth: 2,
    borderColor: "#cccccc",
    borderRadius:10,
    height:50,
    marginBottom:10,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    fontSize: 20,
  }
});
