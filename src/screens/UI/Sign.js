import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { SketchCanvas } from "@kichiyaki/react-native-sketch-canvas";
import { useTranslation } from 'react-i18next';


export default function Sign() {
  const navigation = useNavigation();
  const sketch = useRef(null);
  const { t } = useTranslation();
  
  const user = useSelector(state => state.user);
  const [stopped, setStopped] = useState(false);
  
  const clearSketch = () => {
    sketch.current.clear();
  };

  const saveSketch = async() => {
    const paths = sketch.current.getPaths();
    if(paths.length > 0){
      try {
        let res = await fetch('https://pda.139express.com/api/savedropoffwithsign', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS'
          },
          body: JSON.stringify({
            OperateUserID: user.user.username,
            paths: paths,
          })
        });
        res = await res.json();
        if(res.status == 'success'){
          // console.error(res);
          setStopped(true);
          setTimeout(() => {
            navigation.goBack();
            // navigation.navigate('Home');
          }, 1000)
        } else {
          console.error(res);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginVertical: 30,
          width: '80%'
        }}
      >
        <Text style={{textAlign: 'center', fontSize: 20}}>{t("screens.profile.items.sign")}</Text>
      </View>
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <SketchCanvas
            ref={sketch}
            style={{flex: 1, backgroundColor: '#cccccc', borderWidth: 1, borderColor: 'blue', marginHorizontal: 10, height: 300}}
            strokeColor={'#000000'}
            strokeWidth={5}
            touchEnabled={!stopped}
          />
        </View>
        {stopped && (
          <Text style={{color:'#29A71A', fontSize: 14, textAlign: 'center', marginBottom:50}}>{t("screens.profile.items.sign_saved")}</Text>
        )}
      </View>
      {!stopped && (
        <View style={{ 
          width: '90%',
          padding: 10,
          backgroundColor: '#ffffff',
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}>
          <TouchableOpacity 
            style={{
              width: '38%',
              borderRadius: 10,
              backgroundColor: 'yellow',
              height: 40,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={clearSketch}>
            <Text>{t("screens.profile.items.clean")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '58%',
              borderRadius: 10,
              backgroundColor: '#1b8918',
              height: 40,
              alignItems: 'center',
              justifyContent: 'center'
            }} 
            onPress={saveSketch}
          >
            <Text style={{color: '#ffffff'}}>{t("common.save_finish")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff"
  },
  strokeColorButton: {
      marginHorizontal: 2.5,
      marginVertical: 8,
      width: 30,
      height: 30,
      borderRadius: 15
  },
  strokeWidthButton: {
      marginHorizontal: 2.5,
      marginVertical: 8,
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#39579A"
  },
  functionButton: {
      marginHorizontal: 2.5,
      marginVertical: 8,
      height: 30,
      width: 60,
      backgroundColor: "#39579A",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5
  }
});