import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  FlatList,
  Dimensions,
  View,
  Text,
  StyleSheet,
} from "react-native";

const win = Dimensions.get('window');
const ratio = win.width/1152;

const OrdersCategory = ( { navigation, route } ) => {
  const [listToShow, setListToShow] = useState([]);

  const trackedList = useSelector(state => state.trackedList);
  const user = useSelector(state => state.user);

  console.info(trackedList.list);
  
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ title: route.params.title });

    console.info(trackedList);
    switch(route.params.type){
      case 'out':
        const outList = trackedList.list.filter((item) => item.type =='out');
        setListToShow(outList);
        break;

      case 'in':
        const inList = trackedList.list.filter((item) => item.type == 'in');
        setListToShow(inList);
        break;

      case 'all':
        setListToShow(trackedList.list);
        break;
    }

  }, [dispatch]);

  if (listToShow.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{fontFamily: 'OpenSans-Medium'}}>{'No result'}</Text>
      </View>
    );
  }

  const renderEmpty = () => {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{fontFamily: 'OpenSans-Medium'}}>{'No result'}</Text>
    </View>
  }  

  return (
    <FlatList
      data={listToShow}
      backgroundColor='#ffffff'
      keyExtractor={(item, index) => {
        return  index.toString();
      }}
      ListEmptyComponent={renderEmpty}
      style={{
        backgroundColor: '#ffffff',
      }}
      renderItem={({item, index}) => (
        <View style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 25,
          borderBottomWidth: 1,
          flexDirection: 'row',
          backgroundColor: (item.type == 'in' ? 'green' : 'red')
        }}>
          <Text style={{color: '#ffffff'}}>{item.trackCode}</Text>
          <Text style={{color: '#ffffff'}}>{item.type}</Text>
          <Text style={{color: '#ffffff'}}>{item.time}</Text>
        </View>
      )}
    />
  );
}
export default OrdersCategory;

const styles = StyleSheet.create({
  statuses: {
    padding: 15,
    backgroundColor: '#f2f2f2'
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
    fontFamily: 'OpenSans-Bold',
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