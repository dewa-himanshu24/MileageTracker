import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import useStore from "../../store";
import { Colors } from "../../styles";

// Process the refuellings data to map it to months and calculate average mileage
const processRefuellingsData = (refuellings) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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

  const mileageByMonth = {};

  refuellings.forEach((refuel) => {
    const refuelDate = new Date(refuel.refuellingDate);
    const refuelMonth = refuelDate.getMonth();
    const refuelYear = refuelDate.getFullYear();
    const mileage = (parseFloat(refuel.endReading) - parseFloat(refuel.startReading)) / parseFloat(refuel.consumed);

    // Check if the refueling is within the last 4 months
    const matchMonth = lastFiveMonths.find(
      (m) => m.month === refuelMonth && m.year === refuelYear
    );

    if (matchMonth) {
      if (mileageByMonth[refuelMonth]) {
        mileageByMonth[refuelMonth].totalMileage += mileage; // Sum mileage
        mileageByMonth[refuelMonth].count += 1; // Increment count for averaging
      } else {
        mileageByMonth[refuelMonth] = { totalMileage: mileage, count: 1 };
      }
    }
  });

  // Prepare data for the chart
  const labels = [];
  const data = [];

  lastFiveMonths.forEach(({ month }) => {
    labels.push(monthNames[month]); // Add month names to labels
    const averageMileage = mileageByMonth[month]
      ? mileageByMonth[month].totalMileage / mileageByMonth[month].count
      : 0;
    data.push(averageMileage); // Add average mileage data for each month
  });

  return { labels, data };
};

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => Colors.textTertiary,
  labelColor: (opacity = 1) => Colors.textPrimary,
  strokeWidth: 2,
  style: {
    borderRadius: 8,
  },
  propsForDots: {
    r: "4",
    strokeWidth: "0",
    stroke: "#ffa726",
  },
  propsForBackgroundLines: {
    strokeDasharray: "",
    stroke: 'rgba(206, 216, 222, 1)',
    strokeWidth: 1,
  },
};

const MileageLineChart = () => {
  const { refuellings } = useStore();

  const { labels, data } = processRefuellingsData(refuellings);

  return (
    <View>
      <LineChart
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
        yAxisLabel=""
        yAxisSuffix=" km/l"
        chartConfig={chartConfig}
        bezier
        style={{
          borderRadius: 8,
          paddingTop: 20,
        }}
      />
    </View>
  );
};

export default MileageLineChart;
