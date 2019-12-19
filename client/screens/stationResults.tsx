import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import StationItem from '../components/StationItem';

import GetBikeShareStationsQuery from '../query/GetBikeShareStationsQuery';

export default function stationResults({ navigation }) {
    const region = navigation.getParam('region');
    const classic = parseInt(navigation.getParam('classic', '0'));
    const electric = parseInt(navigation.getParam('electric', '0'));
    const smart = parseInt(navigation.getParam('smart', '0'));

    console.log(`${region}, ${classic}, ${electric}, ${smart}`)
    const { loading, error, data } = useQuery(GetBikeShareStationsQuery, {
        variables: { region, classic, electric, smart }
    });

    if (loading) return (
        <View>
            <Text>Loading....</Text>
        </View>
    )
    console.log(data)
    return (
        <View style={styles.container}>
            <FlatList
                data={data.filterAvailableStations}
                renderItem={({ item }) => (
                    <StationItem item={item} />
                )}
                keyExtractor={item => item.name}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
});
