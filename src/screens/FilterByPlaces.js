import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from './OrderItem';
import * as ordersActions from "../redux/reducers/orders";
// import { signOut } from '../redux/slices/userSlice'

import {
  FlatList,
  Dimensions,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

const win = Dimensions.get('window');
const ratio = win.width/1152;

const FilterByPlaces = ( { navigation, route } ) => {
  const [type, setType] = useState(route.params.type);
  const [listToShow, setListToShow] = useState([]);

  const orders = useSelector(state => state.orders);
  const user = useSelector(state => state.user);
  
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ title: route.params.title });

    switch(type){
      case 'stock':
        const stock = orders.orders.filter((order) => order.TrackLatest === 'Прибыло в сортировочный центр назначния');
        setListToShow(stock);
        break;

      case 'road':
        const road = orders.orders.filter((order) => order.IsSucceed === false && order.TrackLatest !== 'Прибыло в сортировочный центр назначния');
        setListToShow(road);
        break;

      case 'сomplate':
        const сomplate = orders.orders.filter((order) => order.IsSucceed === true);
        setListToShow(сomplate);
        break;
    }

  }, [dispatch]);

  if (listToShow.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>У вас пока нет заказов</Text>
      </View>
    );
  }

  const renderEmpty = () => {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>У вас пока нет заказов</Text>
    </View>
  }  

  return (
    <FlatList
      data={listToShow}
      keyExtractor={(item, index) => {
        return  index.toString();
      }}
      ListEmptyComponent={renderEmpty}
      renderItem={({item, index}) => (
        
        <OrderItem
          amount={item.id}
          track_code={item.TrackingNumber}
          date={item.created_at}
          address={item.accept_address}
          currency={item.Currency}
          price={item.EstimatePay}
          weight={item.Billableweight}
          time={item.Addtime} //{item.time}
          status={item.TrackLatest} //{item.status}
          UserCode={item.UserCode}
          Billableweight={item.Billableweight}
        />
      )}
    />
  );
}

export default FilterByPlaces;

const styles = StyleSheet.create({
  statuses: {
    padding: 15,
    // backgroundColor: '#f2f2f2'
  },
  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8edf3'
  },
  container: {
    backgroundColor: '#e8edf3'
  },
  textNormal: {
    color: '#22264b',
    fontSize: 16
  },
  textSmall: {
    color: '#22264b',
    fontSize: 12
  },
  textLarge: {
    color: '#22264b',
    fontWeight: 'bold',
    fontSize: 18
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  button: {
    // width:"23%",
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderColor:'#A6ABAF',
    // backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    color: '#22264b',
    fontSize: 16,
    marginLeft: 15
  },
  buttonArrow: {
    position: 'absolute',
    right: 20
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
  },

  header: {
    marginBottom: 20,
  },
  image: {
    // marginBottom: 10,
    width: win.width*0.9,
    height: 294 * ratio,
    resizeMode: 'contain'
  },
});