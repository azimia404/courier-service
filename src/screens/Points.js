import { StyleSheet, View, Text, Image, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity, Linking, Platform } from "react-native";
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as pointsAction from "../redux/reducers/points";
import RBSheet from "react-native-raw-bottom-sheet";
// const Stack = createNativeStackNavigator();
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFocusEffect } from '@react-navigation/native';
import Header from "./UI/Header";
import { useTranslation } from 'react-i18next';

const win = Dimensions.get('window');
const ratio = win.width/1152;

const Points = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [pointsToShow, setPointsToShow] = useState([]);
  const [places, setPlaces] = useState([]);
  const [currentPoint, setCurrentPoint] = useState({});
  const [pointsList, setPointsList] = useState([]);
  
  const list = useSelector(state => state.points);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const RBSheetMain = useRef();
  const RBSheetFilter = useRef();

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerTitle: props => <Header page="points" label={t("screens.points.title")} func={openFilter} />,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        }
      });
    }, [])
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: props => <Header page="points" label={t("screens.points.title")} func={openFilter} />,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      }
    });

    // setPointsToShow(pointsList);
    
    setIsLoading(true);
    dispatch(pointsAction.fetchPoints()).then(() => {
      setIsLoading(false);
      setPointsList(list.points);
      if(filter != '') {
        const filteredList = list.points.filter((point) => point.place == filter);
        setPointsToShow(filteredList);
      } else {
        setPointsToShow(list.points);
      }
      
      // list.points.map(point => {
      //   console.info(point, 'point');
      // })
    })
    .catch(error => {
      setIsLoading(false);
      // console.info(error, 'error');
    });
    dispatch(pointsAction.fetchPlaces()).then(() => {
      // console.info(list.places);
      setPlaces(list.places);
    })
    .catch(error => {
      setIsLoading(false);
      // console.info(error, 'error');
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color="#d00020" />
      </View>
    );
  }

  if (!pointsList) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{t("common.no_results")}</Text>
      </View>
    );
  }

  const openFilter = () => {
    RBSheetFilter.current.open();
  }

  const link = (latitude, longitude) => {
    const location = `${latitude},${longitude}`
    const url = Platform.select({
      ios: `maps:${location}`,
      android: `geo:${location}?center=${location}&q=${location}&z=16`,
    });
    Linking.openURL(url);
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
  
  const choosePlace = (place) => {
    setFilter(place);

    const filteredList = pointsList.filter((point) => point.place == place);
    setPointsToShow(filteredList);

    RBSheetFilter.current.close();
  };

  const clearFilter = () => {
    setFilter('');
    setPointsToShow(pointsList);
  };

  const choosePoint = (point) => {
    setCurrentPoint(point);
    setTimeout(() => RBSheetMain.current.open(), 300);
  };

  return (
    <>
      <ScrollView>
        {filter != '' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
              marginTop: 15,
              marginBottom: 5
            }}
          >
            <Text style={{fontSize: 13}}>{filter}</Text>
            <TouchableOpacity
              onPress={() => clearFilter()}
              style={{
                padding: 3,
                borderStartColor: '#ffffff'
              }}
            >
              <Text style={{fontSize: 13, color: '#d00020'}}>{t("screens.points.items.all_points")}</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.container}>
          {pointsToShow.length > 0 ? 
              pointsToShow.map((point, key) => (
                <TouchableOpacity 
                  style={styles.block} 
                  key={key}
                  onPress={() => choosePoint(point)}
                  // onPress={() => navigation.navigate('Point', {point: point})}
                > 
                  <View style={{width: '90%'}}>
                    <Text style={{
                      color:'#d00020',
                      fontFamily: 'OpenSans-Medium',
                      fontSize: 20,
                      marginBottom: 5
                    }}>{point.place_code}</Text>
                    <Text style={{fontSize: 16, marginBottom: 5}}>{point.address}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                      <Text style={{fontSize: 14, fontFamily: 'OpenSans-Medium',}}>{point.place}</Text>
                      {point.region && (<><Text style={{fontSize: 14}}> | </Text>
                      <Text style={{fontSize: 14}}>{point.region}</Text></>)}
                    </View>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <FontAwesome
                      name="chevron-right"
                      size={12}
                      color="#d00020"            
                    />
                  </View>
                </TouchableOpacity>
              ))
           : (
            <Text style={{
              color:'#d00020',
              fontFamily: 'OpenSans-Medium',
              fontSize: 20,
              marginBottom: 5
            }}>{t("screens.points.items.no_points")}</Text>
          )}
        </View>
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
        }}>{t("screens.points.items.choose_place")}</Text>
        <ScrollView style={{marginBottom:100}}>
          
          {places.length > 0 && (
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 10,
              }}
            >
              {places.map((place, key) => (
                <TouchableOpacity
                  onPress={() => choosePlace(place)}
                  style={{
                    marginBottom: 5
                  }}
                  key={key}
                >
                  <Text style={{
                      fontSize: 16,
                      fontFamily: 'OpenSans-Medium',
                      marginLeft: 10,
                  }}>{place}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
      </RBSheet>
      <RBSheet
        ref={RBSheetMain}
        height={500}
        openDuration={500}
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
            flexDirection: 'column',
            flexWrap: 'wrap',
            height: 450
          }}
        >
          <View style={{width:'100%'}}>
              <>
                <Text style={{
                  fontSize: 25,
                  fontFamily: 'OpenSans-Bold',
                  textAlign: 'center',
                  marginBottom: 20,
                  color: "#d00020"
                }}>{currentPoint.place_code}</Text>
                {currentPoint.message && (
                  <View
                    style={[styles.pointItem, styles.messageItem]}
                  >
                    <View
                      style={styles.pointIcon}
                    >       
                      <FontAwesome
                        name="info-circle"
                        size={30}
                        color="#d00020"
                      />
                    </View>
                    <View>
                      <Text style={{
                        fontSize: 14
                      }}>  
                        {currentPoint.message}
                      </Text>
                    </View>
                  </View>
                )}
                {currentPoint.phone && (
                  <View
                    style={styles.pointItem}
                  >
                    <View
                      style={styles.pointIcon}
                    >       
                      <FontAwesome
                        name="mobile-phone"
                        size={30}
                        color="#d00020"
                      />
                    </View>
                    <View>
                      <Text style={styles.blockHeader}>  
                        {currentPoint.phone}
                        {currentPoint.additional_phone && (
                          ',  '+currentPoint.additional_phone
                        )}
                      </Text>
                    </View>
                  </View>
                )}
              </>
            {currentPoint.schedule && (
              <View
                style={styles.pointItem}
              >
                <View
                  style={styles.pointIcon}
                >       
                  <FontAwesome
                    name="clock-o"
                    size={30}
                    color="#d00020"
                  />
                </View>
                <View>
                  <Text style={styles.blockHeader}>  
                    {currentPoint.schedule}
                  </Text>
                </View>
              </View>
            )}
            {currentPoint.cost && (
              <View
                style={styles.pointItem}
              >
                <View
                  style={styles.pointIcon}
                >       
                  <FontAwesome
                    name="dollar"
                    size={30}
                    color="#d00020"
                  />
                </View>
                <View>
                  <Text style={styles.blockHeader}>  
                    {currentPoint.cost}
                  </Text>
                </View>
              </View>
            )}
            {currentPoint.address && (
              <View
                style={styles.pointItem}
              >
                <View
                  style={styles.pointIcon}
                >       
                  <FontAwesome
                    name="map-marker"
                    size={30}
                    color="#d00020"
                  />
                </View>
                <View>
                  {currentPoint.address && (
                    <Text style={styles.blockHeader}>  
                      {currentPoint.address}
                    </Text>
                  )}
                  {currentPoint.place && (
                    <Text style={styles.blockText}>  
                      {currentPoint.place}
                    </Text>
                  )}
                  {currentPoint.state && (
                    <Text style={styles.blockText}>  
                      {currentPoint.state}
                    </Text>
                  )}
                </View>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 'auto'
            }}
          >
            {currentPoint.latitude && (
              <TouchableOpacity
                onPress={() => link(currentPoint.latitude,currentPoint.longitude)}
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  paddingVertical: 10,
                  borderRadius: 10,
                  backgroundColor: '#d00020',
                  alignItems: 'center',
                  flex: 3,
                  marginRight: 10
                }}
              >
                <FontAwesome
                  name="map-marker"
                  size={20}
                  color="#ffffff"
                />
                <Text style={{
                    fontSize: 16,
                    color: '#ffffff',
                    fontFamily: 'OpenSans-Medium',
                    marginLeft: 10,
                  }}>{t("screens.points.items.show_in_map")}</Text>
              </TouchableOpacity>
            )}
            {currentPoint.phone && (
              <TouchableOpacity
                onPress={() => makeCall(currentPoint.phone)}
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  paddingVertical: 10,
                  borderRadius: 10,
                  backgroundColor: '#d00020',
                  alignItems: 'center',
                  flex: 2
                }}
              >
                <FontAwesome
                  name="phone"
                  size={20}
                  color="#ffffff"
                />
                <Text style={{
                    fontSize: 16,
                    color: '#ffffff',
                    fontFamily: 'OpenSans-Medium',
                    marginLeft: 10,
                  }}>{t("screens.points.items.call")}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </RBSheet>
    </>
  );
};

export default Points;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  block: {
    width:"92%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    // borderColor: '#D9D9D9',
    // borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: '#ffffff'
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
  blockHeader: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
  },
  blockText: {
    fontSize: 16,
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
  pointItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20
  },
  pointIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 30,
    marginRight: 10,
  },
  messageItem: {
    borderRadius: 10,
    backgroundColor: 'yellow',
    padding: 5
  }
});
