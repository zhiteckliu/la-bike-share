import React, { useState } from 'react';
import { View, Text } from 'react-native'
import { useQuery } from '@apollo/react-hooks'

import GetBikeShareStationsQuery from '../query/GetBikeShareStationsQuery';

export default function stationResults({ navigation }) {
    const region = navigation.getParam('region');
    const classic = parseInt(navigation.getParam('classic', '0'));
    const electric = parseInt(navigation.getParam('electric', '0'));
    const smart = parseInt(navigation.getParam('smart', '0'));


    const { loading, error, data } = useQuery(GetBikeShareStationsQuery, {
        variables: { region, classic, electric, smart }
    });


    if (loading) return (
        <View>
            <Text>Loading.....</Text>
        </View>
    )
    else {
        console.log(data.filterAvailableStations)
        return (
            <View>
                <Text>Data returned.....</Text>
            </View>
        )
    }
}