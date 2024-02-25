import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { Accordion } from '../../components/Accordion';
import Screen from '../../components/Screen';

export interface ContactUsScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const dummyData = {
  title:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam commodo risus elit, ac tempor orci pretium at. Nullam nec feugiat ante, quis malesuada est. Aenean quam nunc, scelerisque vitae hendrerit venenatis, ultrices sit amet purus.',
  description:
    'Aenean ac quam eget libero fringilla tincidunt. Maecenas tellus justo, convallis non nibh et, tempus malesuada diam. Ut elementum enim in arcu dapibus, vel blandit eros tristique. Etiam at magna vel metus ullamcorper sollicitudin. Phasellus sem tortor, viverra quis tortor tincidunt, ullamcorper tempus ex. Nulla mi augue, facilisis eget posuere quis, condimentum sed metus. Morbi convallis sapien quis blandit suscipit. Vivamus aliquam, sapien vitae vestibulum laoreet, odio elit varius erat, vitae pretium ligula magna a leo. Proin sit amet dictum tortor.Aenean ac quam eget libero fringilla tincidunt. Maecenas tellus justo, convallis non nibh et, tempus malesuada diam. Ut elementum enim in arcu dapibus, vel blandit eros tristique. Etiam at magna vel metus ullamcorper sollicitudin. Phasellus sem tortor, viverra quis tortor tincidunt, ullamcorper tempus ex. Nulla mi augue, facilisis eget posuere quis, condimentum sed metus. Morbi convallis sapien quis blandit suscipit. Vivamus aliquam, sapien vitae vestibulum laoreet, odio elit varius erat, vitae pretium ligula magna a leo. Proin sit amet dictum tortor.',
};

export const ContactUsScreen: React.FunctionComponent<ContactUsScreenProps> = () => {
  return (
    <Screen style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={(item) => 'key' + item}
        renderItem={() => {
          return (
            <Accordion
              headerHeight={100}
              renderHeader={() => { return (<Text style={styles.title}>{dummyData.title}</Text>); }}
              renderBody={() => { return (<Text>{dummyData.description}</Text>); }}
            />
          );
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
});

