import React from 'react';
import { View, Text, StyleSheet, Picker, TextInput, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import { find } from 'lodash'
import globalStyles from '../styles/global'

export default function filterForm({ navigation }) {
    const regionOptions = [
        { name: 'City of LA', id: 'bcycle_lametro_region_1' },
        { name: 'Westside', id: 'bcycle_lametro_region_2' },
        { name: 'Port of LA', id: 'bcycle_lametro_region_3' },
        { name: 'Pasadena', id: 'bcycle_lametro_region_4' },
    ];

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ region: '', total: 0 }}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    const regionName = find(regionOptions, { id: values.region }).name
                    return navigation.navigate('ReturnResults', { ...values, regionName });
                }}
            >
                {props => (
                    <>
                        <View style={globalStyles.section}>
                            <Text>Region</Text>
                            <Picker
                                selectedValue={props.values.region}
                                onValueChange={(itemValue, itemIndex) => {
                                    if (itemValue != 0) {
                                        props.setFieldValue('region', itemValue)
                                    }
                                }}
                            >
                                <Picker.Item label='Please select a region' value='0' />
                                {regionOptions.map((option) => (
                                    <Picker.Item label={option.name} value={option.id} key={option.id} />
                                ))}
                            </Picker>
                        </View>
                        <View style={globalStyles.section}>
                            <View style={globalStyles.optionItem}>
                                <Text>Total number of bikes to return</Text>
                                <TextInput
                                    placeholder='1'
                                    onChangeText={props.handleChange('total')}
                                    keyboardType={'numeric'}
                                />
                            </View>
                        </View>
                        <View style={globalStyles.sectionBottom}>
                            <TouchableOpacity onPress={props.handleSubmit}>
                                <View style={globalStyles.button} >
                                    <Text style={globalStyles.buttonText}>Done</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

            </Formik>
        </View>
    )
}
