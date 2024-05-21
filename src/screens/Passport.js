import { 
  StyleSheet, 
  View, 
  Text, 
  Platform,
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Image } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from "../redux/reducers/profile";
import Header from "./UI/Header";
import { useTranslation } from 'react-i18next';

import ImagePicker from "react-native-image-crop-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Passport( { navigation, route } ) {

  const [imageUri, setImageUri] = useState(null);
  const [imageUriBack, setImageUriBack] = useState(null);
  const [stopped, setStopped] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [profileData, setProfileData] = useState(null);
  
  const user = useSelector(state => state.user);
  const profile = useSelector(state => state.profile);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(profileActions.fetchProfile(user.user.phone))
      .then((res) => {      
        setProfileData(profile.data);
        if(profile.data.front !== null && profile.data.back !== null){
          setImageUri({
            path: 'https://kz.139express.com/storage/app/'+profile.data.front,
            width: 400,
            height: 300
          });
          setImageUriBack({
            path: 'https://kz.139express.com/storage/app/'+profile.data.back,
            width: 400,
            height: 300
          });
          setStopped(true);
        }
      })
      .catch(error => {
        setIsLoading(false);
      })
    ;
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <Header page="default" label={t("screens.profile.items.personal_id")} />,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      }
    });
  });

  const uploadImage = async () => {
    // Check selected image is not null
    if (imageUriBack != null && imageUri != null) {     
      const data = new FormData();

      data.append("number", user.user.phone);
      data.append("front", {
        name: "image",
        type: "image/png",
        uri:
          Platform.OS === "android"
            ? imageUri.path
            : imageUri.path.replace("file://", "")
      });
      
      data.append("back", {
        name: "image",
        type: "image/png",
        uri:
          Platform.OS === "android"
            ? imageUriBack.path
            : imageUriBack.path.replace("file://", "")
      });

      try {
        let res = await fetch('http://kz.139express.com/api/upload', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            "Content-Type": "multipart/form-data",
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS'
          },
          body: data,
        });
        res = await res.json();
        if(res.status == 'success'){
          // console.error(res);
          setProfileData(res.profile);
          setStopped(true);
          setLoaded(true);
        } else {
          console.error(res);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      Alert.alert("Please Select image first");
    }
  };

  const pickImage = (type) => {
    console.info('pickImage');
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      cropping: false
    }).then(image => {
      console.log(image);
      if(type == 'front'){
        setImageUri(image);
      } else {
        setImageUriBack(image);
      }
    });
  };
  return (
    <ScrollView style={{backgroundColor:'#fff'}}>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => pickImage('front')}
          disabled={stopped}>
          {imageUri != null && imageUri != '' ? (
            <Image 
              style={{
                resizeMode: 'contain',
                width: (180/imageUri.height)*imageUri.width,
                height: 180
              }}
              source={{uri: imageUri.path}}
            />
          ) : (
            <Text style={{color: '#d00020'}}>
              <FontAwesome
                name="image"
                size={20}
                // color="#d00020"
                style={{marginRight:10}}
              />
              <Text>   </Text>
              {t("screens.profile.items.passport_front")}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => pickImage('back')}          
          disabled={stopped}>
          {imageUriBack != null && imageUriBack != '' ? (
            <Image 
              style={{
                resizeMode: 'contain',
                width: (180/imageUriBack.height)*imageUriBack.width,
                height: 180
              }}
              source={{uri: imageUriBack.path}}
            />
          ) : (
            <Text style={{color: '#d00020'}}>
              <FontAwesome
                name="image"
                size={20}
                // color="#d00020"
                style={{marginRight:10}}
              />
              <Text>   </Text>
              {t("screens.profile.items.passport_back")}
            </Text>
          )}
        </TouchableOpacity>
        {profileData !== null && profileData.status < 2 && (
          <TouchableOpacity
            onPress={uploadImage}
            disabled={imageUri != null && imageUriBack != null && !stopped ? false : true}
            style={[styles.saveBtn, {backgroundColor: '#29A71A'}]}
          >
            <Text style={{color:'#ffffff', fontSize: 20}}>{t("screens.profile.items.save")}</Text>
          </TouchableOpacity>
        )}
        {loaded && (
          <Text style={{color:'#29A71A', fontSize: 14, textAlign: 'center'}}>{t("screens.profile.items.uploaded")}</Text>
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
  saveBtn: {
    width:"90%",
    height: 44,
    marginBottom: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});