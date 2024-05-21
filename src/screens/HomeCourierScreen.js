import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ActivityIndicator, SafeAreaView, Platform, Linking } from "react-native";
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import Header from "../screens/UI/Header";

import { useTranslation } from 'react-i18next';

const win = Dimensions.get('window');
const ratio = win.width/1152;


const HomeCourierScreen = ( { navigation } ) => {
  const user = useSelector(state => state.user);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      tabBarLabel: t("bottom_tab.profile")
    });
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <Header page="main" label={t("screens.home.title")} />
    });
  });
  

  return(
    <>
        <View style={styles.container}>
          <Text style={{
            marginTop: 10,
            fontSize: 18,
          }}>{t("screens.home.wellcome")}</Text>
          <Text style={{
            marginTop: 0,
            fontWeight: 600,
            fontSize: 25,
            color: '#009CFF'
          }}>{user.user.username}</Text>

          <Text style={{
            marginTop: 70,
            marginBottom: 15,
            fontSize: 16,
            textAlign: 'center'
          }}>{t("screens.home.choose_action")}</Text>

          <TouchableOpacity style={{
              width: '100%',
              backgroundColor: "#009CFF",
              justifyContent: 'center',
              borderRadius: 15,
              paddingVertical: 10,
              width: '100%',
              marginBottom: 15
            }}
            onPress={() => navigation.navigate('ScanCourier', {title: t('screens.home.pick_up'), type: 'in'})}
          >
            <Text style={{
              color: "#ffffff",
              fontSize: 20,
              textAlign: 'center',
            }}>{t("screens.home.pick_up")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
              width: '100%',
              backgroundColor: "#009CFF",
              justifyContent: 'center',
              borderRadius: 15,
              paddingVertical: 10,
              width: '100%',
              marginBottom: 15
            }}
            onPress={() => navigation.navigate('ScanCourier', {title: t('screens.home.drop_off'), type: 'out'})}
          >
            <Text style={{
              color: "#ffffff",
              fontSize: 20,
              textAlign: 'center',
            }}>{t("screens.home.drop_off")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
              width: '100%',
              backgroundColor: "grey",
              justifyContent: 'center',
              borderRadius: 15,
              paddingVertical: 10,
              width: '100%',
            }}
            onPress={() => navigation.navigate('Instruction', {title: 'common.instruction'})}
          >
            <Text style={{
              color: "#ffffff",
              fontSize: 20,
              textAlign: 'center',
            }}>{t('common.instruction')}</Text>
          </TouchableOpacity>
        </View>
      <StatusBar style="dark" backgroundColor="#ffffff" translucent={false} />
    </>
  )
};

export default HomeCourierScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:"90%",
    marginHorizontal: '5%'
  },
  imageContainer: {
    margin: 0,
    width:"90%",
    height: "auto"
  },
  row: {
    flex: 2,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: "auto",
    marginBottom: 15,
    width: '90%',
    flexDirection: "row",
  },
  block: {
    marginBottom: 1,
    width:"49.9%",
    height: "auto",
    padding: 10,
    // borderColor: '#D9D9D9',
    // borderWidth: 2,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#ffffff'
  },
  blockLeft: {
    marginBottom: 1,
    width:"49.9%",
    height: "auto",
    padding: 10,
    // borderColor: '#D9D9D9',
    // borderWidth: 2,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: '#ffffff'
  },
  linkBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
    width:"49.9%",
    height: "auto",
    padding: 10,
    // borderColor: '#D9D9D9',
    // borderWidth: 2,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  linkBlockLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
    width:"49.9%",
    height: "auto",
    padding: 10,
    // borderColor: '#D9D9D9',
    // borderWidth: 2,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  blockDescription: {
    marginBottom: 15,
    width:"100%",
    height: "auto",
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#ffffff'
  },
  message: {
    width:"100%",
    height: "auto",
    padding: 10,
    backgroundColor: 'yellow'
  },
  blockHeading: {
    width:"100%",
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 10,
    color: "#d00020",
  },
  blockHeading2: {
    width:"100%",
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 5,
    color: "#d00020",
    textAlign: 'center'
  },
  blockText: {
    width:"100%",
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 600
  },
  header: {
    marginBottom: 15,
  },
  image: {
    // marginBottom: 10,
    width: win.width*0.9,
    height: 294 * ratio,
    resizeMode: 'contain'
  },
  contactBtn: {
    width:"100%",
    height: 44,
    marginBottom: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
