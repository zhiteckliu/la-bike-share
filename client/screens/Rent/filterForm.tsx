import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import { find } from 'lodash'
import * as yup from 'yup'
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

import globalStyles from '../../styles/global'

const formSchema = yup.object({
  region: yup.string()
    .required('Required'),
})

export default function filterForm({ navigation }) {
  const regionOptions = [
    { label: 'City of LA', value: 'bcycle_lametro_region_1' },
    { label: 'Westside', value: 'bcycle_lametro_region_2' },
  ];

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ region: '', classic: 0, electric: 0, smart: 0 }}
        validationSchema={formSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          const regionName = find(regionOptions, { value: values.region }).label
          return navigation.navigate('RentResults', { ...values, regionName });
        }}
      >
        {props => (
          <>
            <View style={globalStyles.section}>
              <Text>Region
                {
                  props.errors.region && props.touched.region
                    ? (<Text style={{ color: 'red' }}> ({props.errors.region})</Text>)
                    : null
                }
              </Text>
              <RNPickerSelect
                onValueChange={(itemValue) => {
                  if (itemValue != 0) {
                    props.setFieldValue('region', itemValue)
                  }
                }}
                items={regionOptions}
                Icon={() => (<Ionicons name="ios-arrow-down" size={24} color="gray" />)}
                style={{
                  inputIOS: {
                    color: 'black',
                    paddingTop: 13,
                    paddingHorizontal: 10,
                    paddingBottom: 12,
                  },
                  inputIOSContainer: {
                    borderBottom: 1
                  }
                }}
              />
            </View>
            <View style={globalStyles.section}>
              <Text>Select the type and number bike
                <Text style={{ color: '#333', fontStyle: 'italic' }}> (optional)</Text>
              </Text>
              <View style={globalStyles.optionItem}>
                <Text>Classic</Text>
                <TextInput
                  placeholder='1'
                  onChangeText={props.handleChange('classic')}
                  keyboardType={'numeric'}
                  returnKeyType='done'
                />
              </View>
              <View style={globalStyles.optionItem}>
                <Text>Electric</Text>
                <TextInput
                  placeholder='1'
                  onChangeText={props.handleChange('electric')}
                  keyboardType={'numeric'}
                  returnKeyType='done'
                />
              </View>
              <View style={globalStyles.optionItem}>
                <Text>Smart</Text>
                <TextInput
                  placeholder='1'
                  onChangeText={props.handleChange('smart')}
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