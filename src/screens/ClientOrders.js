import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from "../screens/UI/Header";

import {
  Linking,
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput
} from "react-native";

import { useTranslation } from 'react-i18next';

const ClientOrders = ( { navigation, route } ) => {
  const [isLoading, setIsLoading] = useState(false);
  const [listToShow, setListToShow] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [query, setQuery] = useState('');
  const [phone, setPhone] = useState('');
  const [errorText, setErrorText] = useState('');
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [trackCode, setTrackCode] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  const user = useSelector(state => state.user);
  const { t, i18n } = useTranslation();
  
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <Header page="main" label={t(route.params.title)} />,
    });
    setPlaceholder(t('common.type_'+route.params.type));
  }, [dispatch]);

  const getClientOrders = async () => {
    setIsLoading(true);
    try {
      let res = await fetch('https://pda.139express.com/api/pickupinventory?S_Country='+user.user.S_Country+'&S_Code='+user.user.S_Code+'&UserCode='+query+'&accept_tel='+phone);
      // if (!res.ok) {
      //   throw new Error("Something went wrong!");
      // }
      const resData = await res.json();
      setListToShow(resData.data);
      setTotal(resData.total_count);
      setTotalPrice(resData.total_price);
      setTotalWeight(resData.total_weight);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.info(err, 'err');
      throw err;
    }
  }

  const sendData = async(input) => {
    setTrackCode(input);
    setIsLoading(true);
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
          type: 'out',
          eventLocation: user.user.address,
          eventCountry: user.user.S_Country,
          eventProvince: user.user.Stateormunicipality,
          eventZipCode: user.user.ZipCode,
          OperateUserID: user.user.username,
        })
      });
      res = await res.json();
      setIsLoading(false);
      if(res.status == 'success'){
        setSuccess(true);
        setFail(false);
        setErrorText('');

        const filtered = listToShow.filter((order) => order.TrackingNumber != input);        
        setListToShow(filtered);      
        setTotal(total-1);
      } else {
        setFail(true);
        setSuccess(false);
        if(res.data.Message){
          setErrorText(res.data.Message);
        }
      }
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  }

  const countryCodes = {
    "KZ": '+7',
    "KG": '+996',
    "UZ": '+998',
    "AM": '+374',
    "GE": '+995',
    "AZ": '+994',
  }

  // if (listToShow.length === 0) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text style={{fontFamily: 'OpenSans-Medium'}}>{'No result'}</Text>
  //     </View>
  //   );
  // }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color="#d00020" />
      </View>
    );
  }

  const renderEmpty = () => {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{fontFamily: 'OpenSans-Medium'}}>{t('common.no_results')}</Text>
    </View>
  }  

  const makeCall = (number) => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
    } else {
        phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };
  
  return (
    <>
      <View style={{
        margin: 10,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignContent: 'center',
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 10
      }}>
        <TextInput
          placeholder={placeholder}
          onChangeText={val => route.params.type == 'phone' ? setPhone(val) : setQuery(val)}
          value={route.params.type == 'phone' ? phone : query}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            textAlign: 'left',
            width: '80%'
          }} />
          <TouchableOpacity
            onPress={() => getClientOrders()}
            style={{
              width: '20%',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#009CFF',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <Text
              style={{
                alignSelf: 'center',
                color: '#ffffff'
              }}
            >{t('common.search')}</Text>
          </TouchableOpacity>
      </View>
      <ScrollView style={{backgroundColor:'#fff'}}>
        <Text style={{
          marginTop: 5,
          fontSize: 15,
          textAlign: 'center'
        }}><Text style={{fontWeight: 600}}>{t('common.total_items_shown')}:</Text> {listToShow.length} {t('common.from')} {total}</Text>
        <Text style={{
          marginTop: 5,
          fontSize: 15,
          textAlign: 'center'
        }}><Text style={{fontWeight: 600}}>{t('common.total_items_price')}:</Text> {totalPrice}</Text>
        <Text style={{
          marginTop: 5,
          fontSize: 15,
          textAlign: 'center'
        }}><Text style={{fontWeight: 600}}>{t('common.total_items_weight')}:</Text> {totalWeight} {t('common.kg')}</Text>
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
        {listToShow.length > 0 ? (
          listToShow.map((item, index) => (
            <View key={index} style={{
              borderColor: '#cccccc',
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              margin: 5
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderColor: '#cccccc',
                marginBottom: 10,
                paddingBottom: 10,
                borderBottomWidth: 0.5
              }}>
                <Text style={{
                  fontWeight: 600,
                  fontSize: 15
                }}>{item.TrackingNumber}</Text>
                <Text style={{
                  fontWeight: 500,
                  color: '#cccccc',
                  fontSize: 12
                }}>{item.Refreshtime}</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <Text style={{
                  fontWeight: 500,
                  fontSize: 12
                }}>{item.UserCode}</Text>
                <Text style={{
                  fontWeight: 600,
                  fontSize: 12
                }}>{item.accept_name}</Text>
                <TouchableOpacity
                  onPress={() => makeCall(countryCodes[item.country]+item.accept_tel)}
                >
                  <Text style={{
                    fontWeight: 500,
                    color: 'blue',
                    fontSize: 12
                  }}>{countryCodes[item.country]+item.accept_tel}</Text>
                </TouchableOpacity>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10
              }}>
                <View>
                  <Text style={{
                    fontWeight: '600'
                  }}>{t('common.price')}:  {item.EstimatePay2} {item.Currency2}</Text>
                  <Text style={{
                    fontWeight: '600'
                  }}>{t('common.weight')}:  {item.Billableweight} {t('common.kg')}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: '50%',
                    backgroundColor: '#009CFF',
                    paddingVertical: 10,
                    borderRadius: 10
                  }}
                  onPress={() => sendData(item.TrackingNumber)}
                >
                  <Text style={{
                    fontWeight: 500,
                    color: '#ffffff',
                    fontSize: 12,
                    textAlign: 'center'
                  }}>{t('common.execute')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{fontFamily: 'OpenSans-Medium'}}>{t('common.no_results')}</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

export default ClientOrders;

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
    fontWeight: 600
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
  }
});