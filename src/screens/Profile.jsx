import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react'
import { Image, Platform, Pressable, SafeAreaView, Text, View } from 'react-native'
import { moderateScale, scale, verticalScale } from '../common/Scaling'
import globalState from '../core/global'
import PickImage from '../common/PickImage'

function ProfileScreen() {

	const logout = globalState(state => state.logout)
	const user = globalState(state => state.user)
	const [pressed, setPressed] = useState(false)

	console.log(user)
	let [fontLoaded] = useFonts({
		"Fredoka-Regular" : require("../assets/fonts/Fredoka-Regular.ttf"),
		"Fredoka-Bold" : require("../assets/fonts/Fredoka-Bold.ttf")
	})

	return (
		<SafeAreaView style={{flex:1}}>

			<View
				style={{
					marginTop: 50,
					flex: 1,
					alignItems: 'center'
				}}
			>
				<PickImage />
				<View
					style={{
						flex: 1,
						marginTop: verticalScale(10),
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Text
						style={{
							fontFamily: "Fredoka-Bold",
							color: "#292929",
							fontSize: 30
						}}
					>
						{user.full_name}
					</Text>
					<Text 
						style={{
							marginTop: verticalScale(3),
							fontFamily: "Fredoka-Regular",
							color: '#292929',
							fontSize: 20,
						}}
					>
						@{user.username}
					</Text>
					
				</View>

				{/* Button */}
				<View
					style={{
						marginBottom: 50,
						flexDirection: "row",
						justifyContent: "center",
						}
					}
				>
					<Pressable 
						onPress={logout}
						onPressIn={() => setPressed(true)}  // Pressing down
						onPressOut={() => setPressed(false)} // Releasing press
						style={{
							flexDirection: "row",
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
								fontSize: moderateScale(15)
							}}
						>
							Logout
						</Text>
						<FontAwesomeIcon
							icon={"right-from-bracket"}
							size={15}
							color="white"	
							style={{
								marginLeft: 6,
							}}
						/>
					</Pressable>
				</View>
			</View>

		</SafeAreaView>
	)
}

export default ProfileScreen
