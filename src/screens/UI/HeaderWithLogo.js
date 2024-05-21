import { StyleSheet, View, Image, Dimensions } from 'react-native';

const win = Dimensions.get('window');
const ratio = win.width*0.4/win.width;
export default function Header({ label, page }) {

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../assets/images/139express-logo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width:'100%',
    // backgroundColor: 'yellow',
  },
  image: {
    margin: 0,
    width: win.width*0.4,
    height: 82 * ratio,
    resizeMode: 'contain',
  },
});