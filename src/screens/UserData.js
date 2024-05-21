import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity,
  TextInput
} from "react-native";

import { useMaskedInputProps } from 'react-native-mask-input';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from "./UI/Header";
import * as profileActions from "../redux/reducers/profile";
import { useTranslation } from 'react-i18next';

const win = Dimensions.get('window');
const ratio = win.width/1152;

export default function UserData({navigation}) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [pinfl, setPinfl] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [documentSeries, setDocumentSeries] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [profileData, setProfileData] = useState(null);  
  const [editing, setEditing] = useState(false);  

  const { t } = useTranslation();

  const user = useSelector(state => state.user);
  const profile = useSelector(state => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(profileActions.fetchProfile(user.user.phone))
      .then((res) => {      
        var docChars = profile.data.document_number.replace(/\d+/g, '');
        var docNumbers = profile.data.document_number.replace(/^\D+/g, '');
        setProfileData(profile.data);
        setBirthDate(profile.data.birth_date);
        setDocumentSeries(docChars);
        setDocumentNumber(docNumbers);
        setPinfl(profile.data.pinfl);
        setFirstName(profile.data.first_name);
        setLastName(profile.data.last_name);
        setMiddleName(profile.data.middle_name);
      })
      .catch(error => {
        
      })
    ;
  }, [dispatch]);


  const dateMask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

  const dateInputProps = useMaskedInputProps({
    value: birthDate,
    onChangeText: (val) => dateTyping(val),
    mask: dateMask   
  });
  
  const dateTyping = (val) =>  {
    // var date = val.replace(/\D/g, "");
    setBirthDate(val);
    if(val.length == 10){
      
    } else {
      
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <Header page="default" label={t("screens.profile.items.personal_data")} />,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      }
    });
  });

  const saveProfile = async() => {
    try {
      let res = await fetch('http://kz.139express.com/api/profile_uz/save', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS'

        },
        body: JSON.stringify({
          number: user.user.phone,
          pinfl: pinfl,
          document_number: documentNumber,
          document_series: documentSeries,
          birth_date: birthDate,
          last_name: lastName,
          first_name: firstName,
          middle_name: middleName,
        })
      });
      res = await res.json();
      if(res.status == 'success'){
        // console.error(res);
        setEditing(false);
        setProfileData(res.profile);
      } else {
        console.error(res);
      }
    } catch (e) {
      console.error(e);
    }
  };
  
  return (
    <>
      <ScrollView style={{backgroundColor:'#f2f2f2'}}>
        <View style={styles.container}>
          {!profileData || editing ? (
            <>
              <View>
                <View
                  style={{
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={styles.label}
                  >{t("screens.profile.items.last_name")}:</Text>
                  <TextInput
                    onChangeText={(val) => setLastName(val)}
                    value={lastName}
                    placeholder="Фамилия"
                    style={styles.input}
                  />
                </View>
                <View
                  style={{
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={styles.label}
                  >{t("screens.profile.items.first_name")}:</Text>
                  <TextInput
                    onChangeText={(val) => setFirstName(val)}
                    value={firstName}
                    placeholder="Имя"
                    editable={lastName == '' ? false : true}
                    style={lastName != '' ? styles.input : styles.inputDisabled}
                  />
                </View>
                <View
                  style={{
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={styles.label}
                  >{t("screens.profile.items.middle_name")}:</Text>
                  <TextInput
                    onChangeText={(val) => setMiddleName(val)}
                    value={middleName}
                    placeholder="Отчество"
                    editable={firstName == '' ? false : true}
                    style={firstName != '' ? styles.input : styles.inputDisabled}
                  />
                </View>
                <View
                  style={{
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={styles.label}
                  >{t("screens.profile.items.birth_date")}:</Text>
                  <TextInput
                    placeholder="дд.мм.гггг"
                    onChangeText={(val) => setBirthDate(val)}
                    editable={firstName == '' ? false : true}
                    style={firstName != '' ? styles.input : styles.inputDisabled}
                    {...dateInputProps}
                  />
                </View>
                <View
                  style={{
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={styles.label}
                  >{t("screens.profile.items.pinfl")}:</Text>
                  <TextInput
                    onChangeText={(val) => setPinfl(val)}
                    value={pinfl}
                    placeholder="хххххххххххххх" 
                    keyboardType="numeric" 
                    maxLength={14}
                    minLength={14}
                    editable={birthDate == '' ? false : true}
                    style={birthDate != '' ? styles.input : styles.inputDisabled}
                  />
                </View>
                <View
                  style={{
                    marginBottom: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      width: '20%'
                    }}
                  >
                    <Text
                      style={styles.label}
                    >{t("screens.profile.items.document_series")}:</Text>
                    <TextInput
                      onChangeText={(val) => setDocumentSeries(val)}
                      value={documentSeries}
                      placeholder="AB" 
                      editable={pinfl !== null && pinfl.length == 14 ? true : false}
                      style={pinfl !== null && pinfl.length == 14 ? styles.input : styles.inputDisabled}
                    />
                  </View>
                  <View
                    style={{
                      width: '75%'
                    }}
                  >
                    <Text
                      style={styles.label}
                    >{t("screens.profile.items.document_number")}:</Text>
                    <TextInput
                      onChangeText={(val) => setDocumentNumber(val)}
                      value={documentNumber}
                      placeholder="хххххххх" 
                      keyboardType="numeric" 
                      editable={documentSeries !== null && documentSeries.length > 1 ? true : false}
                      style={pinfl !== null && pinfl.length == 14 ? styles.input : styles.inputDisabled}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity 
                style={pinfl !== null && pinfl.length == 14 && documentSeries.length > 1 && documentNumber.length != 0 ? styles.saveBtn : [styles.saveBtn, {backgroundColor: 'grey'}]} 
                onPress={() => saveProfile()}
                disabled={pinfl !== null && pinfl.length == 14 && documentNumber.length != 0 ? false : true}
              >
                <Text style={styles.saveBtnText}>{t("screens.profile.items.save")}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={{marginVertical: 10}}>
                <View
                  style={{
                    marginBottom: 15,
                    width: '90%'
                  }}
                >
                  <Text
                    style={styles.label}
                  >{t("screens.profile.items.full_name")}:</Text>
                  <Text style={styles.value}>{profileData.last_name} {profileData.first_name} {profileData.middle_name}</Text>
                </View>
                <View
                  style={{
                    marginBottom: 15,
                    width: '90%'
                  }}
                >
                  <Text
                    style={styles.label}
                  >{t("screens.profile.items.birth_date")}:</Text>
                  <Text style={styles.value}>{profileData.birth_date}</Text>
                </View>
                <View
                  style={{
                    marginBottom: 15,
                    width: '90%'
                  }}
                >
                  <Text
                    style={styles.label}
                  >{t("screens.profile.items.pinfl")}:</Text>
                  <Text style={styles.value}>{profileData.pinfl}</Text>
                  {profileData.pinfl.length < 14 && (
                    <Text style={{color: 'red', fontSize: 12, paddingLeft: 10}}>{'PINFL kiriting'}</Text>
                  )}
                </View>
                <View
                  style={{
                    marginBottom: 15,
                    width: '90%'
                  }}
                >
                  <Text
                    style={styles.label}
                  >{t("screens.profile.items.document_number")}:</Text>
                  <Text style={styles.value}>
                    {profileData.documentSeries}{profileData.document_number}
                  </Text>
                  {documentNumber.length < 7 && (
                    <Text style={{color: 'red', fontSize: 12, paddingLeft: 10}}>{'Pasport raqamingizni kiriting'}</Text>
                  )}
                  {documentSeries.length < 2 && (
                    <Text style={{color: 'red', fontSize: 12, paddingLeft: 10}}>{'Pasport seriyasini kiriting'}</Text>
                  )}
                </View>
              </View>
              <TouchableOpacity 
                style={styles.saveBtn} 
                onPress={() => setEditing(true)}
              >
                <Text style={styles.saveBtnText}>{t("screens.profile.items.edit")}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 15
  },
  saveBtn: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 20,
    backgroundColor: '#29A71A',
    borderRadius: 15
  },
  saveBtnText: {
    color: '#ffffff', 
    fontSize: 20, 
    fontWeight: 600
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
    fontWeight: 600,
    marginBottom: 10,
    // color: "#007aff",
    // textAlign: 'center'
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
  image: {
    // marginBottom: 10,
    width: win.width*0.9,
    height: 294 * ratio,
    resizeMode: 'contain'
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
  inputDisabled: {
    fontSize: 14,
    borderWidth: 1,
    height: 44,
    borderRadius: 15,
    borderColor: '#D9D9D9',
    paddingLeft: 15,
    backgroundColor: '#ffffff'
  },
});

