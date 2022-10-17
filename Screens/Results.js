import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import HorizontalCard from '../Components/HorizontalCard';
import Navbar from '../Components/Navbar';
import {useGlobalContext} from '../Contexts/GlobalContext';
import firestore from '@react-native-firebase/firestore';
import {useAuthContext} from '../Contexts/useAuthContext';

const Results = ({navigation}) => {
  const {Foods} = useGlobalContext();
  const {user} = useAuthContext();

  const handleWatchLater = async elem => {
    firestore()
      .collection('watchlater')
      .doc(user.uid)
      .collection('list')
      .add({
        ...elem,
      })
      .then(ref => {
        firestore()
          .collection('watchlater')
          .doc(user.uid)
          .collection('list')
          .doc(ref.id)
          .update({
            docId: ref.id,
          });
      });
  };

  if(!user) return navigation.navigate("Login")

  return (
    <>
      <Navbar />
      <ScrollView>
        <View style={styles.recipesContainer}>
          <Text style={styles.length}>Total Recipes : {Foods.length}</Text>
          {Foods?.map(elem => {
            return (
              <View key={elem.idMeal} style={styles.card}>
                <HorizontalCard
                  title={elem.strMeal}
                  img={elem.strMealThumb}
                  SaveForLater={() => handleWatchLater(elem)}
                  onView={() =>
                    navigation.navigate('Recipe', {
                      itemId: elem.idMeal,
                    })
                  }
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  recipesContainer: {
    width: '90%',
    marginHorizontal: '5%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: 'white',
  },
  length: {
    marginVertical: 20,
    fontSize: 15,
    color: 'gray',
    fontFamily: 'Poppins-Medium',
  },
});

export default Results;
