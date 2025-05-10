import React, { useLayoutEffect } from 'react'
import { Animated, SafeAreaView, StatusBar, Text, View } from 'react-native'
import Title from '../common/Title'

function SplashScreen({ navigation }) {
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		})
	}, [])

	const translateY = new Animated.Value(0)

	Animated.loop(
		Animated.sequence([
			Animated.timing(translateY, {
				toValue: 10,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(translateY, {
				toValue: 0,
				duration: 1000,
				useNativeDriver: true,
			}),
		])
	).start()

	return (
		<SafeAreaView
			style={{
				alignItems: 'center',
				flex: 1,
				justifyContent: 'center',
				backgroundColor: '#ffdddd',
			}}
		>
			<StatusBar barStyle="light-content" />

			<Animated.View style={{ transform: [{ translateY }] }}>
				<Title text={'RealTimeChat'} color={'#fafafa'} size={48} />
			</Animated.View>
		</SafeAreaView>
	)
}

export default SplashScreen
