import React, { useState } from 'react'
import { Text, View, TextInput } from 'react-native'

export default () => {

	const [text, setText] = useState('')

	return (
		<View>
			<Text>{text}</Text>
			<TextInput
				value={text}
				onChangeText={(text) => setText(text)}
				placeholder="Digite aqui"
			/>
		</View>
	)

}
