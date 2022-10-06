import React from 'react';
import {Image, Pressable, StyleSheet, View, Text} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const HorizontalCard = props => {
  return (
    <>
      <Image source={{uri: props.img}} style={styles.Image} />
      <View style={styles.cardInfo}>
        <Text style={styles.title}>{props.title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable style={styles.Btn} onPress={props.onView}>
            <Text style={styles.BtnText}>View Recipe</Text>
          </Pressable>
          {props.delete ? (
            <Pressable onPress={props.deleteItem}>
              <MaterialCIcon
                name="delete"
                size={25}
                color={'red'}
                style={{marginLeft: 10, marginTop: 3}}
              />
            </Pressable>
          ) : (
            <Pressable onPress={props.SaveForLater} style={{marginTop: 5}}>
              <Fontisto
                name="favorite"
                size={25}
                color={'#1f62f3'}
                style={{marginLeft: 10, marginTop: 3}}
              />
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Image: {
    height: 100,
    width: '40%',
    borderRadius: 20,
  },
  cardInfo: {
    width: '55%',
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
  Btn: {
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 10,
    width: 110,
    textAlign: 'center',
  },
  BtnText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
});

export default HorizontalCard;
