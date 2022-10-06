import React from 'react';
import { Image, StyleSheet, Text, View} from 'react-native';

const VerticalCard = props => {
  return (
    <>
      <Image style={styles.thumbnail} source={{uri: props.img}} />
      <Text style={styles.title}>{props.title}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    height: 100,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: {
    fontSize: 16,
    color: 'black',
    padding: 10,
    fontFamily: "Poppins-Medium"
  },
});

export default VerticalCard;
