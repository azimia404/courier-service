import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
} from "react-native";
  
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from "@expo/vector-icons/FontAwesome";

import * as orderActions from "../redux/reducers/order";
import { useTranslation } from 'react-i18next';

export default function Order({navigation, route}) {
  const [list, setList] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const { t } = useTranslation();
  const order = useSelector(state => state.order);

  const dispatch = useDispatch();
  
  navigation.setOptions({ title: t("screens.search.title") });
  useEffect(() => {
    dispatch(orderActions.fetchOrder(route.params.trackCode))
      .then((res) => {
        setList(order.statuses);
        if(order.statuses.length > 0){
          navigation.setOptions({ title: route.params.trackCode });
        } else {
          setShowNoResults(true);
        }
      })
      .catch(error => {
        setShowNoResults(true);
      })
    ;
  }, [dispatch]);

  const renderEmpty = () => {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{t("common.no_results")}</Text>
    </View>
  }

  if (showNoResults) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{t("common.no_results")}</Text>
      </View>
    );
  }


  return (
    <FlatList
      data={list}
      keyExtractor={(item, index) => {
        return  index.toString();
      }}
      style={{backgroundColor: '#ffffff'}}
      ListEmptyComponent={renderEmpty}
      renderItem={({item, index}) => (
        <View style={styles.statusBlock}>
          <View style={styles.statusItem}>     
            <View style={styles.iconContainer}>
              <FontAwesome
                name="flag"
                size={15}
                color={index == 0 ? 'green' : '#A6ABAF'}
              />
            </View>
            <Text style={index == 0 ? {color:'#22264b', fontFamily: 'OpenSans-Bold'} : {color:'#A6ABAF', fontFamily: 'OpenSans-Bold'}}>{item.country}</Text>
          </View>
          <View style={styles.statusItem}> 
            <View style={styles.iconContainer}>
              <FontAwesome
                name="info"
                size={15}
                color={index == 0 ? 'green' : '#A6ABAF'}
              />
            </View>
            <Text style={index == 0 ? styles.descriptionFirst : styles.description}>{item.description}</Text>
          </View>
          <View style={styles.statusItem}>  
            <View style={styles.iconContainer}>
              <FontAwesome
                name="clock-o"
                size={15}
                color={index == 0 ? 'green' : '#A6ABAF'}
              />
            </View>
            <Text style={index == 0 ? {color:'#22264b', fontFamily: 'OpenSans-Medium'} : {color:'#A6ABAF', fontFamily: 'OpenSans-Medium'}}>{item.datetime}</Text>
          </View>
        </View>
      )}
    />
  );
}


const styles = StyleSheet.create({
  statusBlock: {
    margin: 20,
    marginBottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 18
  },
  statusItem: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 5,
    alignItems: 'center',
  },
  description: {
    width:'90%',
    color:'#A6ABAF',
    fontFamily: 'OpenSans-Medium'
  },
  descriptionFirst: {
    width:'90%',
    color:'#22264b',
    fontFamily: 'OpenSans-Medium'
  }
});

