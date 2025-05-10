import { useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TouchableWithoutFeedback, View } from 'react-native'
import { useFonts } from 'expo-font'

import Button from '../common/Button'
import Title from '../common/Title'
import Input from '../common/Input'
import { scale, verticalScale, moderateScale } from "../common/Scaling.js"
import api from '../core/api'
import utils from '../core/utils'
import globalState from '../core/global'


function SignInScreen({ navigation }) {

  let [username, setUsername] = useState('')
  let [fName, setFName] = useState('')
  let [lName, setLName] = useState('')
  let [password, setPassword] = useState('')
  let [confirmPassword, setConfirmPassword] = useState('')

  let [usernameError, setUsernameError] = useState(false)
  let [fNameError, setFNameError] = useState(false)
  let [lNameError, setLNameError] = useState(false)
  let [passwordError, setPasswordError] = useState(false)
  let [confirmPasswordError, setConfirmPasswordError] = useState(false)

  const login = globalState(state => state.login)
  
  function onSignIn(){
    console.log("Sign In:", username, fName, lName, password, confirmPassword)

    let err = false

    if (username.length <= 5) {
      setUsernameError("Username is not over 5 characters")
      err = err || true
    }

    if (!fName) {
      setFNameError("First Name not provided")
      err = err || true
    }

    if (!lName) {
      setLNameError("Last Name not provided")
      err = err || true
    }
    
    if (!confirmPassword) {
      setConfirmPasswordError("Password not provided")
      err = err || true
    }
    else if (password != confirmPassword) {
      setConfirmPasswordError("Passwords do not match")
      err = err || true
    }

    if (password.length < 6) {
      setPasswordError("Password is too short")
      err = err || true
    }

    if(err) {
      return
    }

    // Calls django api
    api({
      method: 'POST',
      url : '/chat/signUp/',
      data : {
        username: username.toLowerCase(),
        first_name : fName,
        last_name : lName,
        password : password
      }
    })
    .then(response => {
      utils.parse("Sign up", response.data)
      const credentials = {
        username: username,
        password : password
      }
      login(response.data.data, credentials)
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Request made: ", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      setUsernameError("Username taken")
    })
  }

  let [fontLoaded] = useFonts({
    'Fredoka-Regular': require('../assets/fonts/Fredoka-Regular.ttf'),
  })
  
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		})
	}, [])

	return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      style={{ flex: 1 }} 
    >
      <SafeAreaView style={{ flex: 1, justifyContent: 'center',alignItems: 'center', backgroundColor: "#ffdddd" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          {/* Inner Box Content */}
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: verticalScale(30),
              paddingHorizontal: scale(40),
              shadowColor: '#000',
              borderRadius: 10,
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
            }}
            >

            <Title text="RealTimeChat" color="#ffc0c0" size={moderateScale(40)}/>

            {/* Sign Up and Inputs */}
            <View
              style={{
                marginTop:verticalScale(15),
              }}
              >
              <Text 
                style={{
                  fontFamily: "Fredoka-Regular",
                  fontSize: moderateScale(30),
                  marginBottom: 0,
                  color: "#909090"
                }}
                >
                Sign Up
              </Text>

              <Input 
                title="Username" 
                value={username} 
                setValue={setUsername}
                error={usernameError}
                setError={setUsernameError}
              />
              <Input 
                title="First Name" 
                value={fName} 
                setValue={setFName} 
                error={fNameError}
                setError={setFNameError}
              />
              <Input 
                title="Last Name" 
                value={lName} 
                setValue={setLName}
                error={lNameError}
                setError={setLNameError}
                />
              <Input 
                title="Password" 
                value={password} 
                setValue={setPassword}
                error={passwordError}
                setError={setPasswordError} 
                password={true} 
              />
              <Input 
                title="Confirm Password" 
                value={confirmPassword} 
                setValue={setConfirmPassword} 
                error={confirmPasswordError}
                setError={setConfirmPasswordError}  
                password={true}
              />
            </View>
            
            {/* Button */}
            <Button text="Sign Up" onPress={onSignIn}/>
            
            {/* Navigate to Sign In page */}
            <View
              style={{
                marginTop: verticalScale(25),
                alignItems: "center",
                justifyContent: 'center',
                flexDirection: "row"
              }}
            >
              <Text
                  style={{
                    fontFamily: "Fredoka-Regular",
                    justifyContent: "space-between",
                    marginRight: scale(3)
                  }}
                >
                  Already have an account? 
                </Text>
                <Text
                  style={{
                    fontFamily: "Fredoka-Regular",
                    color: "#ffc7c7"
                  }}
                  onPress={() => navigation.navigate("SignIn")}
                  >
                  Sign In!
                </Text>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
	)
}

export default SignInScreen
