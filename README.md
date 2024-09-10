# Mileage Tracker
Mileage Tracker is a React Native mobile application that helps users track their vehicle performance, fuel expenses, and overall vehicle efficiency. The app allows users to log refueling data and visualize each vehicle's performance over time, providing insights into fuel consumption and spending.

**Key Features**

## 🚗 **User Signup & Login**

- Users can sign up with their username, nickname, and email.
- Password is optional: Users can either create a password or skip this step during signup.

## 🛠️ **Vehicle Management**

- Add multiple vehicles with the following details:

  - I**mage**: Upload a photo of the vehicle.
  - **Vehicle Name**: Provide a unique name for each vehicle.
  - **Engine Capacity**: Record the vehicle's engine capacity.
  - **Vehicle Type**: Choose between:

    - 2-Wheeler
    - 3-Wheeler
    - 4-Wheeler

## **⛽ Refueling Records**

  - Track refueling events by logging:

    - **Odometer Readings**: Start and end readings.
    - **Fuel Consumed**: Amount of fuel in liters.
    - **Price**: Total cost of refueling.
  - Use this data to calculate vehicle mileage and performance.

## **📊 Performance Tracking**

  - **Mileage Charts**: Display each vehicle's fuel efficiency over time.
  - **Fuel Expenses**: Monitor the total money spent on fuel.
  - **Overall Stats**: View vehicle performance stats directly on the homepage.

## **Visual Insights**

The app provides intuitive charts to visualize:

  - **Mileage Performance**: Shows fuel efficiency for each vehicle.
  - **Fuel Expenses**: Visualizes the amount spent on fuel.
  - **Overall Vehicle Stats**: A comprehensive overview of each vehicle's performance on the homepage.

This app is perfect for users who want to keep an organized record of their vehicle's fuel consumption and optimize vehicle performance over time.

## **🔧 Technologies Used**

  - React Native with Expo
  - Zustand for state management
  - Async Storage for persistent data
  - react-native-chart-kit for dynamic charting
  - React Router for managing the app's flow

## **📂 Project Structure**
<img width="570" alt="Screenshot 2024-09-10 at 8 21 03 PM" src="https://github.com/user-attachments/assets/dcae9eeb-5264-4978-afad-a33b3fc0faff">

## **🛠️ Installation**
1. Clone the repository:
``` 
git clone git@github.com:dewa-himanshu24/MileageTracker.git
cd MileageTracker
```
2. Install the dependencies:
```
npm install
# Or, if you're using yarn:
yarn install
```
3. Run the app using Expo:
```
expo start
```

