import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../styles/index.js';

const CustomTextInput = ({ onChangeText, label, 
  width = 324,
  height = 52,
  placeholder = 'Enter vehicle name',
  keyboardType = 'default',
  borderColor = 'transparent',
}) => {
  const [vehicleName, setVehicleName] = useState('');

  const handleTextChange = (text) => {
    onChangeText(text);
    setVehicleName(text);
  };

  return (
    <View style={[styles.container, { width: width }, { borderColor: borderColor}]}>
      {label && (<Text style={styles.label}>{label}</Text>)}
      <TextInput
        style={[styles.input]}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
        value={vehicleName}
        onChangeText={handleTextChange}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 52,
    width: 324,
    padding: 9.5,
    borderRadius: 8,
    backgroundColor: Colors.white,
    borderColor: 'transparent',
    borderWidth: 0.5,
  },
  label: {
    fontFamily: 'Rubrik-Regular',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
    color: Colors.inactive,
    letterSpacing: 0.2,
  },
  input: {
    fontFamily: 'Rubrik-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    color: Colors.textPrimary,
    letterSpacing: 0.2,
  },
});

export default CustomTextInput;
