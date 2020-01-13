import React from 'react'
import { View, Text, TextInput } from 'react-native'

import globalStyles from '../styles/global';

export default function FormNumericInput({ title, placeholder, inputValue, onChangeText, errorText = null }) {
  return (
    <View style={globalStyles.optionItem}>
      <Text>
        {title}
        {errorText
          ? (<Text style={{ color: 'red' }}> ({errorText})</Text>)
          : null}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={inputValue}
        onChangeText={onChangeText}
        keyboardType={'numeric'}
        returnKeyType='done'
      />
    </View>
  )
}