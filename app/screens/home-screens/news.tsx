import { View, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { themeContext } from '../../themes';
import { Text } from 'react-native-paper';

const News = () => {
  const theme = useContext(themeContext);
  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text }}>News</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
export default News;
