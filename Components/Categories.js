import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useGlobalContext} from '../Contexts/GlobalContext';

const Categories = ({navigation}) => {
  const {setFoods} = useGlobalContext();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FetchCategories = async () => {
      try {
        setLoading(true);
        const {data} = await axios.get(
          `https://themealdb.com/api/json/v1/1/categories.php`,
        );
        const DataArray = data.categories;
        const FilteredData = DataArray.filter(elem => {
          return elem.strCategory !== 'Miscellaneous';
        });
        setCategories(FilteredData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    FetchCategories();
  }, []);

  const FetchCategory = async query => {
    const {data} = await axios.get(
      `https://themealdb.com/api/json/v1/1/filter.php?c=${query}`,
    );
    setFoods(data.meals);
    navigation.navigate('Results');
  };

  return (
    <View style={styles.utilityWidth}>
      <Text style={styles.categoryHeading}>Categories</Text>
      <View style={styles.categoryContainer}>
        {categories?.map(elem => {
          return (
            <Pressable
              style={styles.category}
              key={elem.idCategory}
              onPress={() => FetchCategory(elem.strCategory)}>
              <Image
                source={{uri: elem.strCategoryThumb}}
                style={styles.categoryImg}
              />
              <Text style={styles.categoryText}>{elem.strCategory}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  utilityWidth: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  categoryHeading: {
    fontSize: 20,
    color: 'black',
    width: '100%',
    fontFamily: 'Poppins-Bold',
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  categoryImg: {
    height: 25,
    width: 25,
  },
  categoryText: {
    fontSize: 15,
    color: 'black',
    marginLeft: 5,
    fontFamily: 'Poppins-Medium',
  },
});

export default Categories;
