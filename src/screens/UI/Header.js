import { StyleSheet, View, Pressable, Text, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
const screenWidth = Dimensions.get('screen').width-30;

const Header = ( { label, page, func } ) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  switch(page){
    case 'main':
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.label}>{label}</Text>
          {/* <TouchableOpacity style={styles.btn}
            onPress={() => navigation.navigate('SearchOrder')}
          >
            <FontAwesome
              name="search"
              size={18}
              color="#22264b"
            />
          </TouchableOpacity> */}
        </View>
      );
    case 'orders':
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.label}>{label}</Text>
          <TouchableOpacity
            style={[styles.btn, {
              width: 'auto', 
              paddingHorizontal: 10,
              marginRight: 0
            }]}
            onPress={() => func()}
          >
            <FontAwesome
              name="filter"
              size={18}
              color="#d00020"
            />
            <Text style={{                
              fontSize: 14,
              color: "#22264b",
              marginLeft: 10,
              fontFamily: 'OpenSans-Medium'
            }}>{t('common.sort')}</Text>
          </TouchableOpacity>
        </View>
      );
    
      case 'tasks':
        return (
          <View style={styles.headerContainer}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
              style={[styles.btn, {
                width: 'auto', 
                paddingHorizontal: 10,
                marginRight: 0
              }]}
              onPress={() => func()}
            >
              <FontAwesome
                name="list"
                size={15}
                color="#22264b"
              />
              <Text style={{                
                fontSize: 14,
                color: "#22264b",
                marginLeft: 10,
                fontFamily: 'OpenSans-Medium'
              }}>{t('common.history')}</Text>
            </TouchableOpacity>
          </View>
        );
      
    case 'points':
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.label}>{label}</Text>
          <View style={{
            flexDirection: 'row'
          }}>
            <TouchableOpacity
              style={[styles.btn, {
                width: 'auto', 
                paddingHorizontal: 10,
                marginRight: 0
              }]}
              onPress={() => func()}
            >
              <Text style={{                
                fontSize: 14,
                color: "#22264b",
                marginRight: 5,
                fontFamily: 'OpenSans-Medium'
              }}>{t("screens.points.items.filter")} </Text>
              <FontAwesome
                name="filter"
                size={18}
                color="#d00020"
              />
            </TouchableOpacity>
          </View>
        </View>
      );

    case 'profile':
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.label}>{label}</Text>
          <TouchableOpacity style={[styles.btn, {
              width: 'auto', 
              paddingHorizontal: 10,
              marginRight: 0,
              backgroundColor: '#d00020'
            }]}
            onPress={() => func()}
          >
            <Text style={{                
              fontSize: 14,
              color: "#ffffff",
              marginRight: 5,
              fontFamily: 'OpenSans-Medium'
            }}>{t("screens.profile.items.logout")}</Text>
            <FontAwesome
              name="sign-out"
              size={18}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>
      );

    case 'search':
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
      );

    case 'scan':
      return (
        <View style={{...styles.headerContainer, ...{width: (Dimensions.get('screen').width-90)}}}>
          <Text style={styles.label}>{t(label)}</Text>
          <TouchableOpacity style={[styles.btn, {
              width: 'auto', 
              paddingHorizontal: 10,
              marginRight: 0,
              backgroundColor: '#009CFF'
            }]}
            onPress={() => func()}
          >
            <Text style={{                
              fontSize: 14,
              color: "#ffffff",
              marginRight: 5,
              fontFamily: 'OpenSans-Medium'
            }}>{t('common.transactions')}</Text>
          </TouchableOpacity>
        </View>
      );

    case 'default':
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
      );
  }
}

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenWidth,
  },
  label: {
    color: "#22264b",
    fontSize: 22,
    fontWeight: 600,
  },
  btn: {
    marginRight: 10,
    width: 30,
    height: 30,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});