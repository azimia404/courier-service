import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Card from "./UI/Card";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useNavigation } from '@react-navigation/native';

const OrderItem = props => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Order', {trackCode: props.track_code})}
      key={props.track_code}
      style={styles.orderItem}
    >      
      <View style={styles.orderSummary}>
        <Text style={styles.description}>
          <Text> </Text>
          <FontAwesome
            name="user"
            size={14}
            color="#A6ABAF"
          />
          <Text>   </Text>
          {props.UserCode ? props.UserCode : 'не указано'}
        </Text>
        <Text style={styles.time}>                      
          <FontAwesome
            name="clock-o"
            size={14}
            color="#A6ABAF"
            style={{marginRight: 5}}
          />
          <Text> </Text>
          <Text style={{marginLeft: 5}}>{props.time}</Text>
        </Text>
        {/* {props.status ? <Text style={styles.status}>{props.status}</Text> : ''} */}
      </View>
      <Text style={styles.description}>
        <FontAwesome
          name="hashtag"
          size={14}
          color="#A6ABAF"
        />
        <Text>   </Text>
        {props.track_code}
      </Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
      }}>  
        <FontAwesome
          name="map-marker"
          size={14}
          color="#A6ABAF"
        />
        <Text style={{marginLeft: 18, fontFamily: 'OpenSans-Regular'}}>{props.address}</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text style={styles.weight}>               
          <FontAwesome
            name="balance-scale"
            size={14}
            color="#A6ABAF"
          />
          <Text>  </Text>
          {props.Billableweight} кг
        </Text>
        {props.price > 0 ? <View style={{flexDirection:'row', alignItems: 'flex-end'}}>
          <Text style={styles.price}>{props.price}</Text>
          <Text style={{fontFamily: 'OpenSans-Medium'}}> {props.currency}</Text>
        </View> : <></>}
      </View>
      
      {/* {props.status ? <Text style={styles.status}>{props.status}</Text> : <></>} */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    // borderWidth: 0.5,
    // borderColor: '#22264b'
  },
  orderSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#22264b',
    // backgroundColor: '#ffffff'
  },
  status: {
    fontSize: 10,
    color: "#007aff",
    marginTop: 15,
    textAlign: "right"
  },
  time: {
    fontSize: 12,
    color: "grey"
  },
  weight: {
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    marginBottom: 5,
    color: "grey"
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
    color: "#22264b",
    fontFamily: 'OpenSans-Medium'
  },
  price: {
    fontSize: 18,
    color: "#007aff",
    fontFamily: 'OpenSans-Bold'
  },
});

export default OrderItem;