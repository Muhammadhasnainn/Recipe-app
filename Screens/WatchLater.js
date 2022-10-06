import React, {memo, useEffect, useMemo, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useAuthContext} from '../Contexts/useAuthContext';
import axios from 'axios';
import HorizontalCard from '../Components/HorizontalCard';

const WatchLater = ({navigation}) => {
  const [List, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useAuthContext();

  useEffect(() => {
    const FetchData = async () => {
      setList([]);
      await firestore()
        .collection('watchlater')
        .doc(user?.uid)
        .collection('list')
        .get()
        .then(elem => {
          elem.docs.forEach(elem => {
            setLoading(true);
            setList(prev => [...prev, elem.data()]);
            setLoading(false);
          });
        });
    };
    FetchData();
  }, [user]);

  const handleDelete = elem => {
    firestore()
      .collection('watchlater')
      .doc(user?.uid)
      .collection('list')
      .doc(elem.docId)
      .delete();

    setList(prev =>
      prev.filter(el => {
        return el.idMeal !== elem.idMeal;
      }),
    );
  };

  return (
    <>
      <View style={styles.Container}>
        <Text style={styles.mainHeading}>Your SaveList</Text>
        {loading ? (
          <Text>loading</Text>
        ) : (
          <FlatList
            data={List}
            keyExtractor={elem => elem.docId}
            renderItem={elem => {
              return (
                <View style={styles.card}>
                  <HorizontalCard
                    title={elem.item.strMeal}
                    img={elem.item.strMealThumb}
                    delete={true}
                    deleteItem={() => handleDelete(elem.item)}
                    onView={() =>
                      navigation.navigate('Recipe', {
                        itemId: elem.item.idMeal,
                      })
                    }
                  />
                </View>
              );
            }}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: 40,
  },
  mainHeading: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: 'white',
  },
});

export default WatchLater;
