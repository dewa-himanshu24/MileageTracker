import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '../../styles/index.js';

const MtButton = ({
  title,
  onPress,
  handlePress,
  backgroundColor = Colors.primary,
  disabledBackground = Colors.disabled,
  textColor = Colors.textPrimary,
  iconName = null,
  iconSize = 16,
  iconColor = Colors.textSecondary,
  disabled = false,
  width= 284,
  height= 48,
  marginBotton= 0,
  marginTop= 0,
  borderRadius= 8,
  iconMarginLeft= 9,
  borderColor= Colors.primary,
  borderWidth= 0,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      handlePress={handlePress}
      style={[
        styles.button,
        { backgroundColor: disabled ? disabledBackground : backgroundColor },
        disabled && styles.disabledButton,
        {width: width},
        {height: height},
        {marginBotton: marginBotton},
        {marginTop: marginTop},
        {borderRadius: borderRadius},
        {borderColor: borderColor},
        {borderWidth: borderWidth},
      ]}
      disabled={disabled}
    >
      <View style={styles.content}>
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        {iconName && (
          <AntDesign 
            name={iconName} 
            size={iconSize} 
            color={iconColor} 
            style={[styles.icon , { marginLeft: iconMarginLeft }]} 
          />    
          )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: '16px, 20px, 16px, 20px',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Rubrik-Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 16,
  },
  icon: {
    // color: 'transparent',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.disabled,
  },
});

export default MtButton;
