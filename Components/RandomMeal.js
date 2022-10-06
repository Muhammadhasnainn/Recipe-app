import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import VerticalCard from './VerticalCard';

const RandomMeal = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const FetchCategories = async () => {
      try {
        const {data} = await axios.get(
          `https://themealdb.com/api/json/v1/1/filter.php?c=Miscellaneous`,
        );
        setData(data.meals);
      } catch (err) {
        console.log(err);
      }
    };
    FetchCategories();
  }, []);

  return (
    <View style={styles.MealsContainer}>
      <Text style={styles.heading}>Random Meals</Text>
      <ScrollView>
        <View style={styles.cardsContainer}>
          {data.map(elem => {
            return (
              <Pressable
                key={elem.idMeal}
                style={styles.card}
                onPress={() =>
                  navigation.navigate('Recipe', {
                    itemId: elem.idMeal,
                  })
                }>
                <VerticalCard title={elem.strMeal} img={elem.strMealThumb} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    marginBottom: 5,
    color: 'black',
    width: '100%',
    fontFamily: 'Poppins-Bold',
  },
  MealsContainer: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 20,
  },
  card: {
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 15,
    width: '47%',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingBottom: 10,
  },
});

export default RandomMeal;
