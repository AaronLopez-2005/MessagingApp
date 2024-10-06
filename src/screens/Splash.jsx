import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { useFonts } from "expo-font";

function SplashScreen() {
  let [fontLoaded] = useFonts({
    "Fredoka-Regular": require("../assets/fonts/Fredoka-Regular.ttf")
  })

  return (
    <SafeAreaView 
      style = {{
        alignItems: 'center', 
        flex: 1, 
        justifyContent: 'center', 
        backgroundColor: "black"
        }}
    >
      <StatusBar barStyle='light-content'/>
      <View>
        <Text style={{color: "white", textAlign: 'center', fontSize: 48, fontFamily: 'Fredoka-Regular'}}>RealTimeChat</Text>
      </View>
    </SafeAreaView>
  )
}


export default SplashScreen