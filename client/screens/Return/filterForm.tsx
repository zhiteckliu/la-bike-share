import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import { find } from 'lodash'
import * as yup from 'yup'
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

import globalStyles from '../../styles/global'
import FormNumericInput from '../../components/FormNumericInput';

const formSchema = yup.object({
  region: yup.string()
    .required('Required'),
  numBikesReturn: yup.string()
    .required('Required')
})

export default function filterForm({ navigation }) {
  const regionOptions = [
    { label: 'City of LA', value: 'bcycle_lametro_region_1' },
    { label: 'Westside', value: 'bcycle_lametro_region_2' },
  ];

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ region: '', numBikesReturn: '1' }}
        validationSchema={formSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          const regionName = find(regionOptions, { value: values.region }).label
          return navigation.navigate('ReturnResults', { ...values, regionName });
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
              <FormNumericInput
                title="Total number of bikes to return"
                placeholder='1'
                inputValue={props.values.numBikesReturn}
                onChangeText={props.handleChange('numBikesReturn')}
                errorText={props.errors.numBikesReturn}
              />
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
