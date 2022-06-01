import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import Mega from './src/components/mega/Mega';
export default function App() {

  return (
    <SafeAreaView>
      <Mega numeros={7} />
    </SafeAreaView>
  );

}