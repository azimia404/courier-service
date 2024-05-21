import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import WebView from 'react-native-webview';
import NetInfo from "@react-native-community/netinfo";

import {
  Linking,
  Dimensions,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StatusBar } from 'expo-status-bar';

const win = Dimensions.get('window');
const ratio = win.width/1152;

const Orders = ( { navigation } ) => {
  const [isLoading, setIsLoading] = useState(false);
  const [internet, setInternet] = useState(true);
  const [httpError, setHttpError] = useState(false);

  const webview = useRef(null);
  const user = useSelector(state => state.user);
  
  const dispatch = useDispatch();

  useEffect(() => {
    
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      NetInfo.fetch().then(state => {
        // console.info(state.isConnected);
        if(state.isConnected == false){
          // console.info(state.isConnected);
          setInternet(false);
          setIsLoading(false);
        } else {
          setInternet(true);
        }
      });
    }, [])
  );

  NetInfo.fetch().then(state => {
    // console.info(state.isConnected);
    if(state.isConnected == false){
      console.info(state.isConnected);
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
    const uri = "https://"+(user.user.countryCode != 'kz' ? user.user.countryCode : 'almaty' )+".139express.com/app-orders.php?phone="+user.user.phone+"&lang="+user.lang.code;
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

export default Orders;

const styles = StyleSheet.create({
  statuses: {
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    marginBottom: 50
  },
  button: {
    // width:"23%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor:'#A6ABAF',
    // backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    color: '#22264b',
    fontSize: 16,
    marginLeft: 15,
    fontFamily: 'OpenSans-Medium'
  },
  rightArrow: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  ordersAmount: {
    marginRight: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 5,
    color: '#d00020',
    fontSize: 12,
    fontFamily: 'OpenSans-Regular'
  },
  image: {
    // marginBottom: 10,
    width: win.width*0.9,
    height: 294 * ratio,
    resizeMode: 'contain'
  },
});