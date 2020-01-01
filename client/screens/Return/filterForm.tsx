import React from 'react';
import { View, Text, Picker, TextInput, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import { find } from 'lodash'
import * as yup from 'yup'

import globalStyles from '../../styles/global'

const formSchema = yup.object({
  region: yup.string()
    .required('Required'),
  total: yup.string()
    .required('Required')
})

export default function filterForm({ navigation }) {
  const regionOptions = [
    { name: 'City of LA', id: 'bcycle_lametro_region_1' },
    { name: 'Westside', id: 'bcycle_lametro_region_2' },
  ];

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ region: '', total: '1' }}
        validationSchema={formSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          const regionName = find(regionOptions, { id: values.region }).name
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
                <Text>Total number of bikes to return
                {
                    props.errors.total && props.touched.total
                      ? (<Text style={{ color: 'red' }}> ({props.errors.total})</Text>)
                      : null
                  }
                </Text>
                <TextInput
                  placeholder='1'
                  value={props.values.total}
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
