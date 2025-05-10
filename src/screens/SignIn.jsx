import { useLayoutEffect, useState } from 'react'
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { useFonts } from 'expo-font'
import { scale, verticalScale, moderateScale } from '../common/Scaling.js'

import Title from '../common/Title'
import Input from '../common/Input'
import Button from '../common/Button'
import api from '../core/api.js'
import utils from '../core/utils.js'
import globalState from '../core/global.js'

function SignInScreen({ navigation }) {
	let [username, setUsername] = useState('')
	let [password, setPassword] = useState('')

	let [usernameError, setUsernameError] = useState('')
	let [passwordError, setPasswordError] = useState('')

	const login = globalState(state => state.login)

	function onLogin() {
		console.log('Login:', username, password)

    let err = false

		if (!username) {
			setUsernameError('Username not provided')
      err = err || true
		}

		if (!password) {
			setPasswordError('Password not provided')
      err = err || true
		}

    if (err) {
      return
    }

		// Calls django api
    api({
      method: 'POST',
      url: '/chat/signIn/',
      data: {
        username: username,
        password: password
      }
    })
    .then(response => {
			utils.parse("Sign in", response.data)
			const credentials = {
				username : username,
				password: password
			}
			login(response.data.user, credentials)
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
			setUsernameError("Username not Found")
			setPasswordError("Password is not correct")
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
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}
		>
			<SafeAreaView
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#ffdddd',
				}}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					{/* Inner Content */}
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
						<Title
							text="RealTimeChat"
							color="#ffc0c0"
							size={moderateScale(40)}
						/>

						{/* Holds Login and Inputs */}
						<View
							style={{
								marginTop: verticalScale(15),
							}}
						>
							<Text
								style={{
									fontFamily: 'Fredoka-Regular',
									fontSize: moderateScale(30),
									marginBottom: 0,
									color: '#909090',
								}}
							>
								Login
							</Text>
							<Input
								title="Username"
								value={username}
								setValue={setUsername}
								error={usernameError}
								setError={setUsernameError}
							/>
							<Input
								title="Password"
								value={password}
								setValue={setPassword}
								error={passwordError}
								setError={setPasswordError}
								password={true}
							/>
						</View>

						{/* Button */}
						<Button
							text="Login"
							onPress={onLogin}
						/>

						{/* Navigation to Sign In Screen */}
						<View
							style={{
								marginTop: verticalScale(25),
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'row',
							}}
						>
							<Text
								style={{
									fontFamily: 'Fredoka-Regular',
									justifyContent: 'space-between',
									marginRight: scale(3),
								}}
							>
								Don't have an account?
							</Text>
							<Text
								style={{
									fontFamily: 'Fredoka-Regular',
									color: '#ffc7c7',
								}}
								onPress={() => navigation.navigate('SignUp')}
							>
								Sign Up!
							</Text>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}

export default SignInScreen
