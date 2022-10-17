import {Link} from '@react-navigation/native';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useAuthContext } from '../Contexts/useAuthContext';

const Recipe = ({route, navigation}) => {
  const [recipe, setRecipe] = useState([]);
  const {itemId} = route.params;
  const {user} = useAuthContext();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const {data} = await axios.get(
          `https://themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`,
        );
        setRecipe(data?.meals[0]);
      } catch (err) {
        console.log(err);
      }
    };
    FetchData();
  }, [itemId]);

  const openYoutute = link => {
    Linking.openURL(link).catch(err => console.log(err));
  };

  if(!user) return navigation.navigate("Login")

  return (
    <>
      <View style={styles.recipeContainer}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('WatchLater')}
            style={{
              backgroundColor: '#0972db',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 10,
            }}>
            <Fontisto name="favorite" color={'white'} size={22} />
          </Pressable>
        </View>
        <Image
          source={{uri: recipe.strMealThumb}}
          style={{
            height: "22%",
            width: '100%',
          }}
        />
        <View style={{width: '90%', marginHorizontal: '5%', marginTop: 20}}>
          <Text style={styles.title} numberOfLines={2}>{recipe.strMeal}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.tag}>
              <MaterialIcons name="food-bank" size={21} color="#1f62f3" />
              <Text style={styles.tagText}>{recipe.strCategory}</Text>
            </View>
            <View style={{...styles.tag, marginLeft: 10}}>
              <FontAwesome name="flag" size={20} color="#1f62f3" />
              <Text style={styles.tagText}>{recipe.strArea}</Text>
            </View>
          </View>
          <ScrollView style={styles.instructionsContainer}>
            <View>
              <Text style={styles.smallHeading}>Instructions</Text>
              <Text style={styles.instructions}>{recipe.strInstructions}</Text>
            </View>
          </ScrollView>
          <Pressable
            onPress={() => openYoutute(recipe.strYoutube)}
            style={styles.Btn}>
            <Text style={styles.BtnText}>Watch on Youtube</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  recipeContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Poppins-Bold'
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: '#eae5e5',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 20,
    marginTop: 2
  },
  tagText: {
    marginLeft: 8,
    color: 'black',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  smallHeading: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
  instructionsContainer: {
    marginTop: 20,
    height: '42%'
  },
  instructions: {
    fontFamily: 'Poppins-Medium',
  },
  Btn: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    backgroundColor: '#191919',
    paddingVertical: 15,
    borderRadius: 10,
  },
  BtnText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },
});

export default Recipe;
