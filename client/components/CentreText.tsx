import React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../styles/global';

export default function CentreText({ text }) {
    return (
        <View style={globalStyles.centreText}>
            <Text style={globalStyles.centreTextContent}>{text}</Text>
        </View>
    )
}
