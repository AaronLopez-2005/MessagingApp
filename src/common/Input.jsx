import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font'
import { scale, verticalScale, moderateScale } from "../common/Scaling.js"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useState } from 'react'

function Input({ title, value, setValue, error, setError, password=false }) {
	let [fontLoaded] = useFonts({
		'Fredoka-Regular': require('../assets/fonts/Fredoka-Regular.ttf'),
		'Fredoka-Bold': require('../assets/fonts/Fredoka-Bold.ttf'),
	})

  let [showPassword, setShowPassword] = useState(false)

	return (
		<View
			style={{
				marginTop: verticalScale(15),
			}}
		>
			<Text
				style={{
					fontFamily: 'Fredoka-Regular',
					fontSize: moderateScale(20),
					marginBottom: verticalScale(4),
					color: '#bababa',
				}}
			>
				{title}
			</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#fff',
          borderRadius: 4,
          borderWidth: 1.3,
          borderColor: error ? 'red': '#ffefef',
        }}
      >
        <TextInput
          autoComplete='off'
          autoCapitalize='off'
          style={{
            flex: 1,
            paddingVertical: verticalScale(8),
            paddingHorizontal: scale(4),
          }}
          secureTextEntry={password ? !showPassword : false}
          placeholder = {error ? error : ''}
          value={error ? '' : null}
          color="#a7a7a7"
          onChangeText={ text => {
            setValue(text)
            setError(false)
          }}
          selectionColor = "#ffdddd"
        />
        {password ? (
          <TouchableOpacity 
            onPress={() => (
              showPassword ? setShowPassword(false) : setShowPassword(true)
              )
            }
            style={{
              marginRight: 8
            }}
          >
            <FontAwesomeIcon 
              icon={showPassword ? "eye-slash": "eye"}
              color="#ffbbbb"
            />
          </TouchableOpacity>
        ) : (
          <>
          </>
        )}

      </View>
		</View>
	)
}

export default Input
