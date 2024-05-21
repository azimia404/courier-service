import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import Header from "../screens/UI/Header";
import RBSheet from "react-native-raw-bottom-sheet";

import { useTranslation } from 'react-i18next';


const Home = ( { navigation } ) => {
  const user = useSelector(state => state.user);

  const { t, i18n } = useTranslation();
  const RBSheetOptions = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <Header page="main" label={t('bottom_tab.home')} />
    });
  });  

  return(
    <>
        <View style={styles.container}>
          <Text style={{
            marginTop: 10,
            fontSize: 18,
          }}>{t('common.your_pickup_point')}</Text>
          <Text style={{
            marginTop: 10,
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 600,
            color: '#009CFF'
          }}>{user.user.S_Name}</Text>
          <Text style={{
            marginTop: 0,
            fontWeight: 600,
            fontSize: 18,
          }}>{user.user.address}</Text>

          <Text style={{
            marginTop: 70,
            marginBottom: 15,
            fontSize: 16,
          }}>{t('common.select_action')}</Text>

          <TouchableOpacity style={{
              width: '100%',
              backgroundColor: "#009CFF",
              justifyContent: 'center',
              borderRadius: 15,
              paddingVertical: 10,
              width: '100%',
              marginBottom: 15
            }}
            onPress={() => navigation.navigate('Scan', {title: 'common.stock_in', type: 'in'})}
          >
            <Text style={{
              color: "#ffffff",
              fontSize: 20,
              textAlign: 'center',
            }}>{t('common.stock_in')}</Text>
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
            onPress={() => RBSheetOptions.current.open()}
          >
            <Text style={{
              color: "#ffffff",
              fontSize: 20,
              textAlign: 'center',
            }}>{t('common.stock_out')}</Text>
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

      <RBSheet
        ref={RBSheetOptions}
        height={350}
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
          draggableIcon: {
            backgroundColor: '#000000',
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
            color: "#000000"
          }}>{t("common.selct_stock_out_option")}</Text>
          <ScrollView>
            <TouchableOpacity style={{
                width: '100%',
                backgroundColor: "#009CFF",
                justifyContent: 'center',
                borderRadius: 15,
                paddingVertical: 10,
                width: '100%',
                marginBottom: 15
              }}
              onPress={() => navigation.navigate('ClientOrders', {title: 'common.stock_out_by_client_number', type: 'client_number'})}
            >
              <Text style={{
                color: "#ffffff",
                fontSize: 20,
                textAlign: 'center',
              }}>{t('common.stock_out_by_client_number')}</Text>
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
              onPress={() => navigation.navigate('ClientOrders', {title: 'common.stock_out_by_phone_number', type: 'phone'})}
            >
              <Text style={{
                color: "#ffffff",
                fontSize: 20,
                textAlign: 'center',
              }}>{t('common.stock_out_by_phone_number')}</Text>
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
              onPress={() => navigation.navigate('Scan', {title: 'common.stock_out', type: 'out'})}
            >
              <Text style={{
                color: "#ffffff",
                fontSize: 20,
                textAlign: 'center',
              }}>{t('common.stock_out_by_track_code')}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{
                width: '100%',
                backgroundColor: "#009CFF",
                justifyContent: 'center',
                borderRadius: 15,
                paddingVertical: 10,
                width: '100%',
                marginBottom: 15
              }}
              onPress={() => navigation.navigate('ClientOrders', {title: 'common.stock_out_by_client_number_manually', type: 'track_code'})}
            >
              <Text style={{
                color: "#ffffff",
                fontSize: 20,
                textAlign: 'center',
              }}>{t('common.stock_out_by_client_number_manually')}</Text>
            </TouchableOpacity> */}
          </ScrollView>
        </View>    
      </RBSheet>
    </>
  )
};

export default Home;

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
