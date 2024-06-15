import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity ,Text} from "react-native";
import * as ImagePicker from "expo-image-picker";
import CameraViewComponent from "../components/CameraView";
import Button from "../components/Button";
import ImageViewer from "../components/ImageViewer";

const PlaceholderImage = require("../assets/png/background-image.png");

export default function Upload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [useCamera, setUseCamera] = useState(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const toggleView = async () => {
    if (useCamera) {
      setUseCamera(false);
    } else {
      setUseCamera(true);
    }
  };

  return useCamera ? (
    <CameraViewComponent />
  ) : (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          theme="primary"
          label="Choose a photo"
          onPress={pickImageAsync}
        />
        <Button theme="primary" label="Use Camera" onPress={toggleView} />
        <TouchableOpacity onPress={toggleView}>
          <Text> use camera</Text>
        </TouchableOpacity>
        <Button label="Use this photo" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
