import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'USERS';
const LOGGEDIN_USER_KEY = 'LOGGEDIN_USER';

class UserServices {
  async addUser(user) {
    try {
      let users = await AsyncStorage.getItem(USERS_KEY);
      users = users ? JSON.parse(users) : {};
      const userId = Object.keys(users).length + 1;
      const newUser = { user_id: userId, ...user };
      users = { ...users, [userId]: newUser }
      const loggedIdUser = {user_id: userId, passcode: user.passcode, usersCount: Object.values(users).length};
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      await AsyncStorage.setItem(LOGGEDIN_USER_KEY, JSON.stringify(loggedIdUser));

      console.log('User added successfully!');
      return newUser;
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  async getAllUsers() {
    try {
      const users = await AsyncStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : {};
    } catch (error) {
      console.error('Error getting all users:', error);
    }
  }

  async getLoggedInUser() {
    try {
      const user = await AsyncStorage.getItem(LOGGEDIN_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting logged in user:', error);
    }
  }

  async setLoggedInUser( user) {
      try {
        await AsyncStorage.setItem(LOGGEDIN_USER_KEY, JSON.stringify(user));
        console.log('User logged in successfully!');
      } catch (error) {
        console.error('Error logging in user:', error);
      }
  }

  async getUserById(userId) {
    try {
      const users = await AsyncStorage.getItem(USERS_KEY);
      let user = users ? JSON.parse(users)[userId] : null;
      return user || null;
    } catch (error) {
      console.error('Error getting user by ID:', error);
    }
  }

  async logout() {
    try {
      await AsyncStorage.removeItem(LOGGEDIN_USER_KEY);
      console.log('User logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  async deleteAccount(userId) {
    try {
      if (!userId) {
        console.error('No user logged in');
        return;
      }

      const users = await this.getAllUsers();
      delete users[userId];
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      await AsyncStorage.removeItem(LOGGEDIN_USER_KEY);
      console.log('Account deleted successfully!');

    } catch (error) {
      console.error('Error deleting account:', error);
    }
  }

  async saveUserToStorageUsers(user) {
    try {
      let users = await AsyncStorage.getItem(USERS_KEY);
      users = users ? JSON.parse(users) : {};
      users[user.user_id] = user;

      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      console.log('User saved to storage successfully!');
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }
}

export default new UserServices();