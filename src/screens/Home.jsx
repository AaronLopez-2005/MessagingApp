import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useLayoutEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Image, TouchableOpacity, View } from 'react-native'
import FriendsScreen from './Friends'
import ProfileScreen from './Profile'
import RequestsScreen from './Requests'
import Title from '../common/Title'

function HomeScreen({ navigation }) {
	const Tab = createBottomTabNavigator()

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		})
	}, [])

	return (
		<Tab.Navigator
			screenOptions={({ route, navigation }) => ({
        headerLeft: () => (
          <View style={{marginLeft: 16}}>
            <Image source={require("../assets/blank_profile.png")} style={{width: 28, height: 28, borderRadius:13}} />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity>
            <FontAwesomeIcon icon="magnifying-glass" size={20} style={{marginRight: 16}} color="#fafafa"/>
          </TouchableOpacity>
        ),
				tabBarIcon: ({ color }) => {
					const icons = {
						Requests: 'heart',
						Friends: 'user-group',
						Profile: 'home',
					}

					const icon = icons[route.name]
					return <FontAwesomeIcon icon={icon} size={24} color={color} />
				},
				tabBarActiveTintColor: '#ffb9b9',
				tabBarShowLabel: false,
				tabBarInactiveTintColor: '#fafafa',
				tabBarStyle: { paddingBottom: 12, height: 75, backgroundColor: "#ffdddd" },
				headerStyle: { backgroundColor: "#ffdddd" },
				headerTitle: () => (
					<Title 
						text={"RealTimeChat"} 
						color="#fafafa" 
						size={28}
						style={{
							borderRadius: 5,
							borderColor: "white"
						}}
					/>
				)
			})}
		>
			<Tab.Screen name="Requests" component={RequestsScreen} />
			<Tab.Screen name="Friends" component={FriendsScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	)
}

export default HomeScreen
