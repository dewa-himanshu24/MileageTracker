import React from "react";
import { View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import useStore from "../../store";
import { Colors } from "../../styles";

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

const getYAxisMaxValue = (max) => {
  if (max <= 1000) {
    return Math.ceil(max / 200) * 200; // If the max is under 1000, round to the nearest 200
  }
  return Math.ceil(max / 1000) * 1000; // If over 1000, round to the nearest 1000
};

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => Colors.textTertiary,
  labelColor: (opacity = 1) => Colors.textPrimary,
  barPercentage: 0.5,
  propsForBackgroundLines: {
    strokeDasharray: "",
    stroke: 'rgba(206, 216, 222, 1)',
    strokeWidth: 1,
  },
  style: {
    borderRadius: 16,
  },
};

const RefuelingPriceBarChart = () => {
  const { refuellings } = useStore();

  const { labels, data } = processRefuellingsData(refuellings);

  // Get max value of the data and calculate the y-axis max label dynamically
  const maxDataValue = Math.max(...data);
  const yAxisMaxValue = getYAxisMaxValue(maxDataValue);

  return (
    <View>
      <BarChart
        data={{
          labels,
          datasets: [
            {
              data,
            },
          ],
        }}
        width={screenWidth - 40}
        height={200}
        // yAxisLabel="₹"
        yAxisLabel="$"
        yAxisSuffix=""
        yAxisInterval={yAxisMaxValue / 7}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        fromZero
        style={{
          borderRadius: 8,
          paddingTop: 20,
        }}
        yAxisMax={yAxisMaxValue} 
      />
    </View>
  );
};

export default RefuelingPriceBarChart;
