import { StyleSheet, SafeAreaView, Text } from 'react-native';
import Quadrado from './src/components/Layout/Quadrado';

export default function App() {

  return (
    <SafeAreaView style={styles.FlexV1}>
      <Quadrado />
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  FlexV1: {
    width: '100%',
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-beetween',
  },
});