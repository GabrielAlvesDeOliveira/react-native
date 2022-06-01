import { View, StyleSheet, SafeAreaView, Text } from 'react-native';

export default function App() {

  return (
    <SafeAreaView style={styles.FlexV2}>
      <View style={styles.V1} />
      <View style={styles.V2} />
    </SafeAreaView>
  );

}
d
const styles = StyleSheet.create({
  FlexV2: {
    width: 100,
    backgroundColor: '#000',
    flex: 1,
  },
  V1: {
    backgroundColor: '#ff801a',
    flexGrow: 3
  },
  V2: {
    backgroundColor: '#dd22c1',
    flexGrow: 1
  }
});