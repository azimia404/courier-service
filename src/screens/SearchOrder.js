import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  Dimensions, 
  TouchableOpacity, 
  Button, 
  Pressable } from "react-native";
// import Modal from "react-native-modal";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import OrderItem from "./OrderItem";


const win = Dimensions.get('window');
const ratio = win.width/1152;

export default function SearchOrder() {

  const orders = useSelector(state => state.orders);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   orders = useSelector(state => state.orders);
  // });

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  
  const search = (text) => {
    // console.info(text, 'text');
    setQuery(text);
    if(text.length > 4){
      const res = orders.orders.filter((order) => order.TrackingNumber.includes(text));
      setResults(res);
    }
    if(text.length == 0){
      setResults([]);
    }
  }

  const renderEmpty = () => {
    return (
      <View style={{ 
        alignItems: "center",
        marginTop: 50
      }}>
        <FontAwesome
          name="search-plus"
          size={100}
          color="#22264b"
          style={{marginRight:15}}
        />
        <Text
          style={{
            color: '#22264b',
            fontSize: 18,
            marginTop: 20
          }}
        >Пока нет результатов </Text>
      </View>
    )
  }

  const header = () => {
    return(
      <View style={{
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 15
      }}>
        <View style={{
          borderRadius: 14,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 15
        }}>
  
          <FontAwesome
            name="search"
            size={20}
            color="#A6ABAF"
            style={{marginRight:15}}
          />
          <TextInput
            autoFocus={true}
            placeholder="Трек-код"
            onChangeText={q => search(q)}
            style={styles.inputText}
            value={query}
            keyboardType="number-pad"
          />
        </View>
      </View>
    )
  }

  return (
    <>
      {header}
      <FlatList 
        data={results}
        keyExtractor={(item, index) => {
          return  index.toString();
        }}
        // ListEmptyComponent={renderEmpty}
        ListHeaderComponent={header}
        stickyHeaderIndices={[0]}
        renderItem={({item, index}) => (
          
          <OrderItem
            key={index}
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
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  button: {
    width:"90%",
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    borderColor: '#D9D9D9',
    borderWidth: 2,
    borderRadius: 15
  },
  imageContainer: {
    margin: 0,
    width:"90%",
    height: "auto"
  },
  row: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: "auto",
    marginBottom: 30,
    width: '90%',
    flexDirection: "row"
  },
  block: {
    margin: 0,
    width:"48%",
    height: "auto",
    padding: 10,
    borderColor: '#D9D9D9',
    borderWidth: 2,
    borderRadius: 15
  },
  blockDescription: {
    margin: 0,
    width:"100%",
    height: "auto",
    padding: 10,
    borderColor: '#D9D9D9',
    borderWidth: 2,
    borderRadius: 15
  },
  userHeading: {
    width:"100%",
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 10,
    color: "#007aff",
    textAlign: 'center'
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
    fontSize: 16,
    marginBottom: 5
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

