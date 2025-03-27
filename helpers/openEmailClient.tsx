import { Linking, Alert } from "react-native";
const openEmailClient = () => {
  const url = "mailto:";
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Error", "No email client is available on this device.");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((error) => console.error("Error opening email app:", error));
};

export default openEmailClient;
