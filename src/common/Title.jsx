import { Text } from 'react-native'
import { useFonts } from 'expo-font'

function Title({ text, color, size, style={} }) {
	let [fontLoaded] = useFonts({
		'Fredoka-Bold': require('../assets/fonts/Fredoka-Bold.ttf'),
	})

	return (
		<Text
			style={{
				color: color,
				textAlign: 'center',
				fontSize: size,
				fontFamily: 'Fredoka-Bold',
			}}
		>
			{text}
		</Text>
	)
}

export default Title
