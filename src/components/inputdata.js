import {text} from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';

const inputdata = ({
  label,
  placeholder,
  isTextArea,
  onChangeText,
  namaState,
  value,
}) => {
  if (isTextArea) {
    return (
      <>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.textInputArea}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => onChangeText(namaState, text)}
        />
      </>
    );
  }
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChangeText(namaState, text)}
      />
    </>
  );
};

export default inputdata;

const styles = StyleSheet.create({
  label: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: 'normal',
  },
  textInput: {
    fontSize: 17,
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: '#e9ecef',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#6c757d',
  },
  textInputArea: {
    textAlignVertical: 'top',
    fontSize: 17,
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: '#e9ecef',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#6c757d',
  },
});
