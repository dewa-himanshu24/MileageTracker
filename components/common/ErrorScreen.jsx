import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../styles/index.js';

const ErrorScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Error</Text>
    </View>
  ) 
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Rubrik-Medium",
    lineHeight: 25,
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    height: "100%",
  },
  topContainer: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 149,
    height: 149,
    marginTop: 52,
    marginBottom: 8,
  },
  title: {
    fontFamily: "Rubrik-Medium",
    fontSize: 20,
    fontWeight: "500",
    color: "#FF4C4C",
  },
  subtitle: {
    fontFamily: "Rubrik-Regular",
    fontSize: 20,
    fontWeight: "400",
    color: Colors.textPrimary,
    marginBottom: 32,
    lineHeight: 25,
    justifyContent: "center",
  },
  buttonContainer: {
    marginBottom: 61,
  },
  noAccountContainer: {
    width: "100%",
    alignItems: "center",
  },
  illustrationContainer: {
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  footerText: {
  }
});

export default ErrorScreen