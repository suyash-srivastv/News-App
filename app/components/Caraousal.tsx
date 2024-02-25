import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import React, { useContext, useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useTheme } from 'react-native-paper';
import { themeContext } from '../themes';

const Caraousal = () => {
  const [activeDot, setActiveDot] = useState(0);
  const carouselItems = [
    {
      title: 'Hokkaido',
      source: require('../assets/images/logo1.jpeg'),
    },
    {
      title: 'Tokyo',
      source: require('../assets/images/logo.png'),
    },
    {
      title: 'Osaka',
      source: require('../assets/images/logo2.jpeg'),
    },
  ];
  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.renderItem}>
        <Image
          source={item.source}
          style={{ height: 234, width: 434, marginEnd: 12 }}
          resizeMode={'stretch'}
        />
        <Text style={{ fontSize: 30, color: 'white', height: 12 }}>
          {item.title}
        </Text>
      </View>
    );
  };

  const pagination = () => {
    const theme = useContext(themeContext);

    return (
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeDot}
        // containerStyle={{ backgroundColor: 'white' }}
        dotStyle={[styles.dotStyle, { backgroundColor: theme.text }]}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  return (
    <View>
      <Carousel
        layout={'default'}
        // ref={c => {
        //   this._carousel = c;
        // }}
        data={carouselItems}
        renderItem={_renderItem}
        sliderWidth={500}
        itemWidth={500}
        onSnapToItem={index => setActiveDot(index)}
      />
      {pagination()}
    </View>
  );
};
const styles = StyleSheet.create({
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'black',
  },
  renderItem: {
    // backgroundColor: 'black',
    borderRadius: 5,
    height: '20%',
    // padding: 50,
    // marginLeft: 35,
    marginRight: 135,
  },
});

export default Caraousal;
