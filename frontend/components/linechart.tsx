import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import styles from '../styles/home-styles';

const screenWidth = Dimensions.get("window").width;

const LineChart1: React.FC = () => {
  return (
    <View style={styles.containers}>
      <Text style={styles.title}>Datos de la semana</Text>
      <LineChart
        data={{
          labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
          datasets: [{ data: [1, 0, 0, 1, 1, 0] }]
        }}
        width={screenWidth - 60}
        height={300}
        yAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: "#222",
          backgroundGradientTo: "#444",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: () => "#fff"
        }}
        bezier
        style={{ marginVertical: 10, borderRadius: 10 }}
      />
    </View>
  );
};

export default LineChart1;
