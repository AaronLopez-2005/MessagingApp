import { View, Pressable, Text } from "react-native"
import { useFonts } from "expo-font"
import { scale, verticalScale, moderateScale } from "../common/Scaling.js"
import { useState } from "react";


function Button({ text, onPress, style={} }) {

  const [pressed, setPressed] = useState(false);

  let [fontLoaded] = useFonts({
    'Fredoka-Bold': require('../assets/fonts/Fredoka-Bold.ttf'),
  })

  return (
    <View
      style={[{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: verticalScale(28)
      },
      style
    ]}
    >
      <Pressable 
        onPress={onPress}
        onPressIn={() => setPressed(true)}  // Pressing down
        onPressOut={() => setPressed(false)} // Releasing press
        style={{
          alignItems: 'center',
          paddingVertical: verticalScale(12),
          paddingHorizontal: scale(20),
          borderRadius: 4,
          elevation: 3,
          backgroundColor: '#ffd0d0',
          opacity: pressed ? 0.5 : 1, // Change opacity based on press state
        }}
      >
        <Text
          style={{
            fontFamily: "Fredoka-Bold",
            color: "white",
            fontSize: moderateScale(20)
          }}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  )
}

export default Button