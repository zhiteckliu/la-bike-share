import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/global';

export default function LoadMoreButton(
  {
    buttonText,
    summaryText,
    handleSubmit,
    disabled,
    isButtonVisible
  }) {
  return (
    <View style={{ margin: 20 }}>
      <Text style={globalStyles.loadMoreSummaryText}>{summaryText}</Text>
      {isButtonVisible &&
        <TouchableOpacity onPress={handleSubmit} disabled={disabled} >
          <View style={globalStyles.button} >
            <Text
              style={disabled ? globalStyles.buttonTextLoading : globalStyles.buttonText}>
              {buttonText}
            </Text>
          </View>
        </TouchableOpacity>}
    </View>
  )
}