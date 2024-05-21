import { StyleSheet, View, Pressable, Text, TouchableOpacity } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({ label, theme, func, disabled }) {
  if (theme === "login") {
    return (
      <View
      style={[styles.buttonContainer]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#009CFF" }]}
          onPress={func}
        >
          <FontAwesome
            name="user-o"
            size={18}
            color="#ffffff"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#ffffff" }]}>{label}</Text>
        </Pressable>
    </View>
    );
  }

  if (theme === "primary") {
    return (
      <View style={styles.buttonContainer} >
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary, {backgroundColor:disabled ? "grey" : "#009CFF"}]}
          onPress={func}
          disabled={disabled}
          activeOpacity={disabled ? 0.2 : 0.7}
        >
          <Text style={styles.buttonPrimaryLabel}>{label}</Text>
        </TouchableOpacity>
    </View>
    );
  }

  if (theme === "secondary") {
    return (
      <View style={styles.buttonContainer} >
        <Pressable
          style={[styles.button, styles.buttonPrimary, {backgroundColor : "grey"}]}
          onPress={func}
          disabled={disabled}
          activeOpacity={disabled ? 0.2 : 0.7}
        >
          <Text style={styles.buttonPrimaryLabel}>{label}</Text>
        </Pressable>
    </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    width: '100%',
    padding: 1,
    borderColor: "#d00020"
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
  },
  buttonPrimary: {
    width: '100%',
    backgroundColor: "#d00020",
    borderRadius:25,
    color: "#ffffff",
    justifyContent: 'center',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#d00020',
    fontSize: 20,
  },
  buttonPrimaryLabel: {
    width: '100%',
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
});