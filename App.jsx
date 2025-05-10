import {  StatusBar } from 'react-native'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import './src/core/fontawesome.js'

import SplashScreen from './src/screens/Splash'
import SignInScreen from './src/screens/SignIn'
import SignUpScreen from './src/screens/SignUp'
import HomeScreen from './src/screens/Home'
import SearchScreen from './src/screens/Search'
import MessageScreen from './src/screens/Message'
import globalState from './src/core/global.js'
import { useEffect } from 'react'

const LightTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "white"
	}
}

const Stack = createNativeStackNavigator()


export default function App() {
	const initialized= globalState(state => state.initialized)
	const authenticated = globalState(state => state.authenticated)
	const init = globalState(state => state.init)
	useEffect(()=>{init()},[])

	return (
		<NavigationContainer theme={LightTheme} >
			<StatusBar barStyle={'dark-content'} />
			<Stack.Navigator>
				{!initialized ? (
					<>
						<Stack.Screen name="Splash" component={SplashScreen}></Stack.Screen>
					</>
				) : !authenticated ? (
					<>
						<Stack.Screen name="SignIn" component={SignInScreen}></Stack.Screen>
						<Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
					</>
				) : (
					<>
						<Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
						<Stack.Screen name="Search" component={SearchScreen}></Stack.Screen>
						<Stack.Screen
							name="Message"
							component={MessageScreen}
						></Stack.Screen>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	)
}
