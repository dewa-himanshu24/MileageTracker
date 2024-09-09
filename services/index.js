import AsyncStorage from '@react-native-async-storage/async-storage';
import UserServices from './userServices.js';
import VehicleServices from './vehicleServices.js';
import RefuellingServices from './refuellingServices.js';

const validateExistingEmail = async (email) => {
  let isValidEmail = true;

  let users = await AsyncStorage.getItem('USERS');
      users = users ? JSON.parse(users) : {};

  const emailIdToUserIdMap = Object.keys(users).reduce((map, key) => {
    const user = users[key];
    map[user.email] = user.user_id;
    return map;
  }, {});


  
  if (emailIdToUserIdMap.hasOwnProperty(email)) {
    isValidEmail = false;
  }

  return { isValidEmail };
}


const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared!');
  } catch (error) {
    console.error('Failed to clear AsyncStorage:', error);
  }
};

export {
  UserServices,
  VehicleServices,
  RefuellingServices,
  clearAsyncStorage,
  validateExistingEmail,
}