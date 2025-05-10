import { useEffect, useState } from "react";
import { Image, Platform, TouchableOpacity, View } from "react-native"
import * as ImagePicker from 'expo-image-picker'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import utils from "../core/utils";

function PickImage() {

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });

    utils.parse(result)

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image 
        source={require("../assets/blank_profile.png")} 
        style={{ 
          borderRadius: 180, 
          height: 150, 
          width: 150
        }} 
      />
      <View 
        style={{
          borderWidth: 3,
          borderColor: "white",
          borderRadius: 15,
          backgroundColor: "#ffc9c9",
          position: "absolute",
          padding: 4,
          bottom: 5,
          right: 5,
          alignItems: "center"
        }}
      >
        <FontAwesomeIcon 
          icon="pencil" 
          color="white"
          size={15}
        />
      </View>
    </TouchableOpacity>
  )
}

export default PickImage