import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import WebView from 'react-native-webview';
import NetInfo from "@react-native-community/netinfo";

import {
  Linking,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView
} from "react-native";

import { StatusBar } from 'expo-status-bar';
import Header from "../screens/UI/Header";

import { useTranslation } from 'react-i18next';

const Instruction = ( { navigation } ) => {
  const [isLoading, setIsLoading] = useState(false);
  const [internet, setInternet] = useState(true);
  const [httpError, setHttpError] = useState(false);

  const { t, i18n } = useTranslation();

  const webview = useRef(null);
  const user = useSelector(state => state.user);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <Header page="main" label={t('common.instruction')} />
    });
  });  

  useFocusEffect(
    React.useCallback(() => {
      NetInfo.fetch().then(state => {
        if(state.isConnected == false){
          setInternet(false);
          setIsLoading(false);
        } else {
          setInternet(true);
        }
      });
    }, [])
  );

  NetInfo.fetch().then(state => {
    if(state.isConnected == false){
      setInternet(false);
      setIsLoading(false);
    }
  });


  if (!internet) {    
    return(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{color:'#d00020'}}>Нет подключения к интернету</Text>
      </View>
    )
  }

  if (httpError) {    
    return(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{color:'#d00020'}}>Страница временно недоступна</Text>
      </View>
    )
  }

  const displaySpinner = () => {
    return(
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color="#d00020" />
      </View>
    )
  }

  if (internet) {
    const uri = "https://pda.139express.com/instruction/"+user.user.type+"/"+user.lang.code;
    console.info(uri);
    return(
      <SafeAreaView style={{flex: 1}}>
        {isLoading && (
          <View style={{ 
            flex: 1, 
            justifyContent: "center", 
            alignItems: "center", 
            height: '100%', 
            width: '100%', 
            position: 'absolute', 
            zIndex: 10 
          }}>
            <ActivityIndicator size='large' color="#d00020" />
          </View>
        )}
        <WebView
          ref={webview}
          renderLoading={displaySpinner}
          source={{ uri: uri }} 
          onShouldStartLoadWithRequest={(event) => {
            if (event.url == uri) {
              return true;
            }
            webview.current.stopLoading();
            Linking.openURL(event.url);

            return false;
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            setHttpError(true);
          }}
          onLoadProgress={({nativeEvent}) => {
            if (nativeEvent.progress != 1 && isLoading == false ) {
              setIsLoading(true)
            } else if (nativeEvent.progress == 1 ) {
              setIsLoading(false)
            }
          }} 
        />
        <StatusBar style="dark" backgroundColor="#ffffff" translucent={false} />
      </SafeAreaView>
    )
  }
}

export default Instruction;

const styles = StyleSheet.create({
  
});