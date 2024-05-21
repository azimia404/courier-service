import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity,
} from "react-native";

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/slices/userSlice';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Header from "./UI/Header";
import * as profileActions from "../redux/reducers/profile";
import RBSheet from "react-native-raw-bottom-sheet";
import { chooseLang } from '../redux/slices/userSlice';

import { useTranslation } from 'react-i18next';

const win = Dimensions.get('window');
const ratio = win.width/1152;

export default function Profile({navigation}) {
  
  const RBSheetLangs = useRef(null);
	const RBSheetMain = useRef(null)

  const profile = useSelector(state => state.profile);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [sure, setSure] = useState(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      tabBarLabel: t("bottom_tab.profile")
    });
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <Header page="profile" label={t("screens.profile.title")} func={onPress} />,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      }
    });
  });

  const langs = [
    { code: 'ru', label: 'Русский язык' },
    { code: 'en', label: 'English' },
    { code: 'ge', label: 'ქართული ენა' },
    // { code: 'kz', label: 'Қазақ тілі' },
    // { code: 'kg', label: 'Кыргыз тили' },
    // { code: 'uz', label: 'Оʻzbek tili' },
  ];

  const openLanguages = () => {
    RBSheetLangs.current.open();
  };

  const changeLanguage = (lang) => {
    dispatch(chooseLang(lang));
    i18n.changeLanguage(lang.code);
    
    navigation.setOptions({
      tabBarLabel: t("bottom_tab.profile")
    });
    // i18n.changeLanguage(lang);
    RBSheetLangs.current.close();
  };
  
  const onPress = () => {    
    dispatch(signOut());  
    dispatch({
      type: 'CLEAR_ITEMS'
    });
  };

	const openDeleteProfileSheet = () => {
		RBSheetMain.current.open()
	}

	const preventDeleting = () => {
		setSure(false)
		RBSheetMain.current.close()
	}

	const deleteProfile = () => {
    dispatch(signOut())
	}
  
  return (
    <>
      <ScrollView style={{backgroundColor:'#f2f2f2'}}>
        <View style={styles.container}>
          {user.user !== null && (
            <View style={{width:'90%'}}>
                <Text style={{
                  width:"100%",
                  fontSize: 15,
                  fontFamily: 'OpenSans-Bold',
                  marginBottom: 10,
                }}>
                  <FontAwesome
                    name="user-o"
                    size={20}
                    // color="#d00020"
                    style={{marginRight:10}}
                  />
                  <Text>   </Text>
                  <Text style={{color: 'grey'}}>{user.user.username}</Text>
                </Text>
            </View>
          )}
        </View>
        <View style={styles.statuses}>
          <TouchableOpacity
            style={styles.button} 
            onPress={openLanguages}
          >
            <FontAwesome
              name="language"
              size={20}
              color="#d00020"
            />
            <Text style={styles.buttonText}>{t("screens.profile.items.language")}</Text>
            <View style={styles.rightArrow}>
              <Text style={styles.successText}>{user.lang.label}</Text>
              <FontAwesome
                name="chevron-right"
                size={12}
                color="#A6ABAF"            
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button} 
            onPress={() => navigation.navigate('Instruction', {title: 'common.instruction'})}
          >
            <FontAwesome
              name="info"
              size={20}
              color="#d00020"
            />
            <Text style={styles.buttonText}>{t('common.instruction')}</Text>
            <View style={styles.rightArrow}>
              <FontAwesome
                name="chevron-right"
                size={12}
                color="#A6ABAF"            
              />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.button} 
            onPress={() => {}}
          >
            <FontAwesome
              name="rocket"
              size={20}
              color="#d00020"
            />
            <Text style={styles.buttonText}>{'Link 2'}</Text>
            <View style={styles.rightArrow}>
              <FontAwesome
                name="chevron-right"
                size={12}
                color="#A6ABAF"            
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button} 
            onPress={() => {}}
          >
            <FontAwesome
              name="pencil"
              size={20}
              color="#d00020"
            />
            <Text style={styles.buttonText}>{'Link 3'}</Text>
            <View style={styles.rightArrow}>
              <FontAwesome
                name="chevron-right"
                size={12}
                color="#A6ABAF"            
              />
            </View>
          </TouchableOpacity> */}
        </View>
        <View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 20,
					}}
				>
					<TouchableOpacity onPress={() => openDeleteProfileSheet()}>
						<Text style={{ color: '#d00020' }}>
							{t('screens.profile.items.delete_accaunt')}
						</Text>
					</TouchableOpacity>
				</View>
      </ScrollView>
			<RBSheet
				ref={RBSheetMain}
				height={450}
				openDuration={250}
				customStyles={{
					container: {
						borderTopRightRadius: 20,
						borderTopLeftRadius: 20,
					},
					draggableIcon: {
						backgroundColor: '#d00020',
						width: 58,
					},
				}}
				closeOnDragDown={true}
			>
				<View
					style={{
						paddingHorizontal: 20,
						paddingTop: 10,
					}}
				>
					<Text
						style={{
							fontSize: 25,
							fontFamily: 'OpenSans-Bold',
							textAlign: 'center',
							marginBottom: 20,
							color: '#d00020',
						}}
					>
						{t('screens.profile.items.delete_accaunt')}
					</Text>
					<ScrollView>
						<View
							style={{
								marginBottom: 15,
								width: '100%',
								height: 'auto',
								padding: 10,
								borderRadius: 15,
								backgroundColor: '#f2f2f2',
								flexDirection: 'row',
								justifyContent: 'flex-start',
								alignItems: 'center',
							}}
						>
							<FontAwesome
								name='check-circle'
								size={20}
								color='#d00020'
								style={{ marginRight: 10 }}
							/>
							<Text
								style={{
									width: '100%',
									fontSize: 16,
									marginBottom: 5,
									flexDirection: 'row',
									alignItems: 'center',
									fontFamily: 'OpenSans-Bold',
								}}
							>
								{t('screens.profile.items.delete_accaunt_point_one')}
							</Text>
						</View>
						<View
							style={{
								marginBottom: 15,
								width: '100%',
								height: 'auto',
								padding: 10,
								borderRadius: 15,
								backgroundColor: '#f2f2f2',
								flexDirection: 'row',
								justifyContent: 'flex-start',
								alignItems: 'center',
							}}
						>
							<FontAwesome
								name='check-circle'
								size={20}
								color='#d00020'
								style={{ marginRight: 10 }}
							/>
							<Text
								style={{
									width: '100%',
									fontSize: 16,
									marginBottom: 5,
									flexDirection: 'row',
									alignItems: 'center',
									fontFamily: 'OpenSans-Bold',
								}}
							>
								{t('screens.profile.items.delete_accaunt_point_two')}
							</Text>
						</View>
						<TouchableOpacity
							onPress={() => setSure(true)}
							style={{
								marginBottom: 15,
								width: '100%',
								height: 'auto',
								padding: 10,
								borderRadius: 15,
								backgroundColor: '#f2f2f2',
							}}
						>
							<Text
								style={{
									fontSize: 16,
									fontFamily: 'OpenSans-Bold',
									color: '#d00020',
									textAlign: 'center',
								}}
							>
								{t('screens.profile.items.sure_to_continue')}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => preventDeleting()}
							style={{
								marginBottom: 15,
								width: '100%',
								height: 'auto',
								padding: 10,
								borderRadius: 15,
								backgroundColor: '#f2f2f2',
							}}
						>
							<Text
								style={{
									fontSize: 16,
									fontFamily: 'OpenSans-Bold',
									textAlign: 'center',
								}}
							>
								{t('screens.profile.items.cancel')}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => deleteProfile()}
							style={
								sure
									? {
											marginBottom: 15,
											width: '100%',
											height: 'auto',
											padding: 10,
											borderRadius: 15,
											backgroundColor: '#d00020',
									  }
									: {
											marginBottom: 15,
											width: '100%',
											height: 'auto',
											padding: 10,
											borderRadius: 15,
											backgroundColor: '#f2f2f2',
									  }
							}
							disabled={!sure}
						>
							<Text
								style={
									sure
										? {
												fontSize: 16,
												fontFamily: 'OpenSans-Bold',
												color: '#ffffff',
												textAlign: 'center',
										  }
										: {
												fontSize: 16,
												fontFamily: 'OpenSans-Bold',
												textAlign: 'center',
										  }
								}
							>
								{t('screens.profile.items.delete')}
							</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</RBSheet>
      <RBSheet
        ref={RBSheetLangs}
        height={250}
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
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
        >
          <Text style={{
            fontSize: 22,
            fontFamily: 'OpenSans-Bold',
            textAlign: 'center',
            marginBottom: 20,
            color: "#d00020"
          }}>{t("screens.profile.items.choose_language")}</Text>
          <ScrollView>
            {langs.map(lang => (
              <TouchableOpacity
                style={{marginBottom: 10}}
                key={lang.code}
                onPress={() => changeLanguage(lang)}
              >
                <Text style={{fontSize: 16, textAlign: 'center'}}>{lang.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>    
      </RBSheet>
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
    fontFamily: 'OpenSans-Bold',
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
  inputText:{
    height:50,
    fontSize: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
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
  button: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor:'#A6ABAF',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    color: '#22264b',
    fontSize: 16,
    marginLeft: 15
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
  successText: {
    marginRight: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 5,
    color: 'green',
    fontSize: 12,
  }
});

