import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const Banner = props => {
  const logo = require('../assets/images/logo.jpg');

  return (
    <View style={styles.BannerContainer}>
      <View style={styles.Banner}>
        <Image
          source={logo}
          style={{height: 60, width:60, borderRadius: 50}}
        />
        <Text style={styles.text}>Hello {props.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  BannerContainer: {
    marginTop: 20,
    paddingVertical: 20,
  },
  Banner: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginHorizontal: '5%',
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    color: 'black',
    marginLeft: 15,
  },
});

export default Banner;
