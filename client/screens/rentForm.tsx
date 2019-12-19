import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, TextInput, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'

export default function filterForm({ navigation }) {
  const [region, setRegion] = useState('');

  const regionOptions = [
    { name: 'City of LA', id: 'bcycle_lametro_region_1' },
    { name: 'Westside', id: 'bcycle_lametro_region_2' },
    { name: 'Port of LA', id: 'bcycle_lametro_region_3' },
    { name: 'Pasadena', id: 'bcycle_lametro_region_4' },
  ];

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ region: '', classic: 0, electric: 0, smart: 0 }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          return navigation.navigate('StationResults', values);
        }}
      >
        {props => (
          <>
            <View style={styles.section}>
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
            <View style={styles.section}>
              <Text>Select the type and number bike</Text>
              <View style={styles.optionItem}>
                <Text>Classic</Text>
                <TextInput
                  placeholder='1'
                  onChangeText={props.handleChange('classic')}
                  keyboardType={'numeric'}
                />
              </View>
              <View style={styles.optionItem}>
                <Text>Electric</Text>
                <TextInput
                  placeholder='1'
                  onChangeText={props.handleChange('electric')}
                  keyboardType={'numeric'}
                />
              </View>
              <View style={styles.optionItem}>
                <Text>Smart</Text>
                <TextInput
                  placeholder='1'
                  onChangeText={props.handleChange('smart')}
                  keyboardType={'numeric'}
                />
              </View>
            </View>
            <View style={styles.sectionBottom}>
              <TouchableOpacity onPress={props.handleSubmit}>
                <View style={styles.button} >
                  <Text style={styles.buttonText}>Done</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}

      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginTop: 16
  },
  sectionBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
  optionItem: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#f01d71',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  }
});
