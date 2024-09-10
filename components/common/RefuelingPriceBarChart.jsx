import React from "react";
import { View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import useStore from "../../store";

const processRefuellingsData = (refuellings) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentDate = new Date();
  const lastFiveMonths = [];

  // Get the last 5 months including the current month
  for (let i = 4; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    lastFiveMonths.push({
      month: date.getMonth(),
      year: date.getFullYear(),
      label: monthNames[date.getMonth()],
    });
  }

  const refuellingsByMonth = {};

  refuellings.forEach((refuel) => {
    const refuelDate = new Date(refuel.refuellingDate);
    const refuelMonth = refuelDate.getMonth();
    const refuelYear = refuelDate.getFullYear();
    const price = parseFloat(refuel.price);

    // Check if the refueling is within the last 4 months
    const matchMonth = lastFiveMonths.find(
      (m) => m.month === refuelMonth && m.year === refuelYear
    );

    if (matchMonth) {
      if (refuellingsByMonth[refuelMonth]) {
        refuellingsByMonth[refuelMonth] += price; // Sum prices by month
      } else {
        refuellingsByMonth[refuelMonth] = price;
      }
    }
  });

  // Prepare data for the chart
  const labels = [];
  const data = [];

  lastFiveMonths.forEach(({ month }) => {
    labels.push(monthNames[month]); // Add month names to labels
    data.push(refuellingsByMonth[month] || 0); // Add refueling price data for each month
  });

  return { labels, data };
};

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0, // Optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Bar color (red in this case)
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Label color (black)
  barPercentage: 0.5,
  style: {
    borderRadius: 16,
  },
};

const RefuelingPriceBarChart = () => {
  const { refuellings } =
    useStore();

    const { labels, data } = processRefuellingsData(refuellings);

  return (
    <View>
      <BarChart
        data={{
          labels, // Month names
          datasets: [
            {
              data, // Refueling prices
            },
          ],
        }}
        width={screenWidth - 16} // Adjust width based on screen size
        height={220}
        yAxisLabel="₹"
        yAxisSuffix="k"
        chartConfig={chartConfig}
        verticalLabelRotation={30} // Rotate labels for better readability
        fromZero // Ensure the y-axis starts from zero
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default RefuelingPriceBarChart;
