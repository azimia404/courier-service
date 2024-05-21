import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from "./UI/Header";
import RBSheet from "react-native-raw-bottom-sheet";
import * as tasksAction from "../redux/reducers/tasks";

import { useTranslation } from 'react-i18next';

import {
  Platform,
  Linking,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from "react-native";

const History = ( { navigation } ) => {
  const [isLoading, setIsLoading] = useState(false);
  const [listToShow, setListToShow] = useState([]);
  const [filter, setFilter] = useState(null);

  const history = useSelector(state => state.tasks);
  const user = useSelector(state => state.user);

  const RBSheetFilter = useRef();

  console.info(history.history);
  
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <Header page="main" label={t("screens.history.title")} />,
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    dispatch(tasksAction.fetchHistory(user.user.username)).then(() => {
      setIsLoading(false);
      console.info(history, 'history');
      setListToShow(history.history);
      setTotal(history.total_count);
    })
    .catch(error => {
      console.info(history, 'history');
      setIsLoading(false);
    });
  }, [dispatch]);

  const countryCodes = {
    "KZ": '+7',
    "KG": '+996',
    "UZ": '+998',
    "AM": '+374',
    "GE": '+995',
    "AZ": '+994',
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

  const openMap = (address) => {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const url = Platform.select({
      ios: `${scheme}${address}`,
      android: `${scheme}${address}`
    });
    Linking.openURL(url);
  };

  const openHistory = () => {
    navigation.navigate('History');
  }

  const openFilter = () => {
    RBSheetFilter.current.open();
  }
  
  const chooseType = (type) => {
    setFilter(type);
    const filteredList = history.history.filter((item) => item.type == type);
    setListToShow(filteredList);
    RBSheetFilter.current.close();
  };
  
  const clearFilter = () => {
    setFilter(null);
    setListToShow(history.history);
  };

  if (listToShow.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{fontFamily: 'OpenSans-Medium'}}>{t('common.no_results')}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color="#d00020" />
      </View>
    );
  }

  const renderEmpty = () => {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{fontFamily: 'OpenSans-Medium'}}>{'No result'}</Text>
    </View>
  }  
  
  return (
    <>
      {filter !== null && (
        <View style={{
          paddingVertical: 10,
          paddingHorizontal: 25,
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}>
          <Text style={{          
            fontSize: 18
          }}>Applied Filter: <Text style={{fontWeight: 600}}>{filter == 'in' ? 'Stock In' : 'Stock Out'}</Text></Text>
          <TouchableOpacity
            onPress={() => clearFilter()}
          >
            <Text>Очистить</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView style={{backgroundColor:'#fff'}}>
        {history.history.length > 0 && (
          history.history.map((item, index) => (
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
                  fontSize: 12
                }}>{item.object_code}</Text>
                <Text style={{
                  fontWeight: 500,
                  color: '#cccccc',
                  fontSize: 12
                }}>{item.created_at}</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <Text style={{
                  fontWeight: 500,
                  fontSize: 12
                }}>{item.Customercode}</Text>
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
              {/*  */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <TouchableOpacity
                  onPress={() => openMap('город Алматы,   Медеуский район,   ДругойЖетысуская 43')}
                >
                  <Text style={{
                    fontWeight: 500,
                    fontSize: 12
                  }}>город Алматы,   Медеуский район,   ДругойЖетысуская 43</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <RBSheet
        ref={RBSheetFilter}
        height={450}
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
        <View>
          <Text style={{
            fontSize: 25,
            fontFamily: 'OpenSans-Bold',
            textAlign: 'center',
            marginBottom: 20,
            color: "#d00020"
          }}>{'Filter'}</Text>
          <ScrollView style={{marginBottom:100}}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => chooseType('in')}
                style={{
                  marginBottom: 5
                }}
              >
                <Text style={{
                    fontSize: 16,
                    fontFamily: 'OpenSans-Medium',
                    marginLeft: 10,
                }}>{'Stock In'}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => chooseType('out')}
                style={{
                  marginBottom: 5
                }}
              >
                <Text style={{
                    fontSize: 16,
                    fontFamily: 'OpenSans-Medium',
                    marginLeft: 10,
                }}>{'Stock Out'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </>
  );
}

export default History;

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