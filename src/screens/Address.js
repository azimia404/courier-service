import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from "../redux/reducers/profile";
import Header from "./UI/Header";

import { useTranslation } from 'react-i18next';

export default function Address( { navigation } ) {

  const [stopped, setStopped] = useState(false);
  const [address, setAddress] = useState(null);
  const [place, setPlace] = useState(null);
  const [readyAddress, setReadyAddress] = useState(null);
  const [readyPlace, setReadyPlace] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [editing, setEditing] = useState(false);  

  const { t } = useTranslation();

  const user = useSelector(state => state.user);
  const profile = useSelector(state => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileActions.fetchProfile(user.user.phone))
      .then((res) => {      
        setProfileData(profile.data);
        if(profile.data.address !== null){
          setAddress(profile.data.address);
          setReadyAddress(profile.data.address);
        }
        if(profile.data.place !== null){
          setPlace(profile.data.place);
          setReadyPlace(profile.data.place);
        }
      })
      .catch(error => {
        
      })
    ;
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <Header page="default" label={t("screens.profile.items.residence_address")} />,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      }
    });
  });

  const saveAddress = async() => {
    try {
      let res = await fetch('http://kz.139express.com/api/address/save', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS'

        },
        body: JSON.stringify({
          number: user.user.phone,
          address: address,
          place: place
        })
      });
      res = await res.json();
      if(res.status == 'success'){
        // console.error(res);
        setProfileData(res.profile);
        setStopped(true);
        setReadyAddress(address);
        setReadyPlace(place);
      } else {
        // console.error(res);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ScrollView style={{backgroundColor:'#fff'}}>
      <View style={styles.container}>
        <View
          style={{
            marginBottom: 30,
            width: '90%'
          }}
        >
          <Text style={{textAlign: 'center', fontSize: 20}}>{t("screens.profile.items.address")}</Text>
          {readyAddress !== null && readyPlace !== null ? (<></>) : (
            <Text style={{textAlign: 'center'}}>{t("screens.profile.items.address_desc")}</Text>
          )}
        </View>
        {readyAddress !== null && readyPlace !== null && !editing ? (
          <>
            <View
              style={{
                marginBottom: 15,
                width: '90%'
              }}
            >
              <Text
                style={styles.label}
              >{t("screens.profile.items.city_area")}:</Text>
              <Text style={styles.value}>{readyPlace}</Text>
            </View>
            <View
              style={{
                marginBottom: 15,
                width: '90%'
              }}
            >
              <Text
                style={styles.label}
              >{t("screens.profile.items.address")}:</Text>
              <Text style={styles.value}>{readyAddress}</Text>
            </View>
            <View
              style={{
                marginBottom: 25,
                width: '90%'
              }}
            >
              <Text
                style={styles.label}
              >{t("screens.profile.items.phone")}:</Text>
              <Text style={styles.value}>{user.user.phone}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.saveBtn, {backgroundColor: '#29A71A'}]}
              onPress={() => setEditing(true)}
            >
              <Text style={{color:'#ffffff', fontSize: 20}}>{t("screens.profile.items.edit")}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View
              style={{
                marginBottom: 15,
                width: '90%'
              }}
            >
              <Text
                style={styles.label}
              >{t("screens.profile.items.city_area")}:</Text>

              <TextInput
                onChangeText={(val) => setPlace(val)}
                value={place}
                placeholder=""
                style={styles.input}
              />
            </View>
            <View
              style={{
                marginBottom: 25,
                width: '90%'
              }}
            >
              <Text
                style={styles.label}
              >{t("screens.profile.items.address")}:</Text>

              <TextInput
                onChangeText={(val) => setAddress(val)}
                value={address}
                placeholder=""
                style={styles.input}
              />
            </View>
            <TouchableOpacity
              onPress={() => saveAddress()}
              disabled={!stopped ? false : true}
              style={[styles.saveBtn, {backgroundColor: '#29A71A'}]}
            >
              <Text style={{color:'#ffffff', fontSize: 20}}>{t("screens.profile.items.save")}</Text>
            </TouchableOpacity>
            {stopped && (
              <Text style={{color:'#29A71A', fontSize: 14, textAlign: 'center'}}>{t("screens.profile.items.address_saved")}</Text>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  button: {
    width:"90%",
    height: 200,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
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
    fontWeight: 700,
    marginBottom: 10,
    color: "#007aff",
    textAlign: 'center'
  },
  blockHeading2: {
    width:"100%",
    fontSize: 18,
    fontWeight: 700,
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
  saveBtn: {
    width:"90%",
    height: 44,
    marginBottom: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputText:{
    height:50,
    fontSize: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 5,
    paddingLeft: 10
  },
  value: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    marginBottom: 5,
    paddingLeft: 10
  },
  input: {
    fontSize: 14,
    borderWidth: 1,
    height: 44,
    borderRadius: 15,
    paddingLeft: 15,
    backgroundColor: '#ffffff'
  },
});