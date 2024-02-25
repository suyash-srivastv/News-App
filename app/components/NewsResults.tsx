import {
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { newsResult } from '../services/api/news-result';
import { Text } from 'react-native-paper';
import { themeContext } from '../themes';
import { translate } from '../i18n';

const NewsResult = () => {
  // useEffect(() => {
  console.log('ugg');
  const renderNews = async () => {
    const response = await newsResult('dog');
    console.log(response);
    setData(response.articles);
  };
  const theme = useContext(themeContext);
  // });
  const [data, setData] = useState([]);
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity style={{ paddingHorizontal: 22 }}>
        <Image
          source={{
            uri: item.urlToImage,
          }}
          style={styles.newsImage}
          resizeMode="contain"
        />
        <Text
          numberOfLines={1}
          style={[styles.newstitle, { color: theme.text }]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <TouchableOpacity onPress={renderNews}>
      <Text style={[styles.newsHead, { color: theme.text }]}>
        {translate('home.newsHighlight')}
      </Text>
      <FlatList
        data={data.slice(10)}
        renderItem={renderItem}
        initialNumToRender={10}
      />
    </TouchableOpacity>
  );
};
// const styles = StyleSheet.create({});
const styles = StyleSheet.create({
  newstitle: { marginBottom: 22, marginTop: 12 },
  newsImage: { height: 154, width: '100%' },
  newsHead: {
    marginBottom: 22,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default NewsResult;
