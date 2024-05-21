import { 
  StyleSheet, 
  View, 
  Text, 
  Modal, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  Button, 
  Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const win = Dimensions.get('window');
const ratio = win.width/1152;

export default function Point({ navigation, route }) {
  const point = route.params.point;
  return (
    <ScrollView style={{backgroundColor:'#fff'}}>
      <Text style={[styles.blockText, {marginBottom:5, fontWeight:700}]}>
        {point.place} 
        <Text>   </Text>
        <Text style={{color:'grey', fontWeight:500, fontSize: 13}}>{point.place_code}</Text> 
        <Text>   </Text>
        {point.region ? <Text style={{color:'grey', fontWeight:500, fontSize: 13}}>({point.region})</Text>  : ''}
      </Text>
      <Text style={[styles.blockText, {marginBottom:5}]}>            
        <FontAwesome
          name="map-marker"
          size={20}
          color="#A6ABAF"
          style={{marginRight:10}}
        />
        <Text>   </Text>
        {point.address}
      </Text>
      <Text style={styles.blockText}>
        <FontAwesome
          name="phone"
          size={20}
          color="#A6ABAF"
          style={{marginRight:10}}
        />
        <Text>  </Text>
        {point.phone}
      </Text>
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
  image: {
    // marginBottom: 10,
    width: win.width*0.9,
    height: 294 * ratio,
    resizeMode: 'contain'
  },
});

