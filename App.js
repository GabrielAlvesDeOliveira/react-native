import { StyleSheet, SafeAreaView, Text } from 'react-native';
import Quadrado from './src/components/Layout/Quadrado';

export default function App() {

  return (
    <SafeAreaView style={styles.FlexV1}>
      <Quadrado />
    </SafeAreaView>
  );

}
d
const styles = StyleSheet.create({
  FlexV1: {
    height: 350,
    width: '100%',
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});