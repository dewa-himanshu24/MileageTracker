import React, { useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Alert, Modal, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../styles/index.js';
import { icons } from '../../constants/index.js';

const MtImagePicker = ({ onChange, image }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePickerPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      onChange(result.assets[0].uri);
    }
  };

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const handleImageLongPress = () => {
    Alert.alert(
      "Remove Image",
      "Are you sure you want to remove this image?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove",
          onPress: () => setImage(null),
          style: "destructive",
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      {image ? (
        <TouchableOpacity
          style={styles.container}
          onPress={handleImagePress}
          onLongPress={handleImageLongPress}
        >
          <Image source={{ uri: image }} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.container} onPress={handleImagePickerPress}>
          <Image source={icons.cameraFilled} style={styles.cameraIcon} />
        </TouchableOpacity>
      )}

      {/* Preview */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Image source={{ uri: image }} style={styles.fullImage} />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    justifyContent: 'space-around',
    borderRadius: 60,
    marginBottom: 24,
    backgroundColor: Colors.tertiaryBackground
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  cameraIcon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  fullImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
    borderRadius: 10,
  },

  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },

  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MtImagePicker;
