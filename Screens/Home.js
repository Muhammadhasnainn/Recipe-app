import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import Banner from '../Components/Banner';
import Categories from '../Components/Categories';
import Navbar from '../Components/Navbar';
import RandomMeal from '../Components/RandomMeal';
import {useAuthContext} from '../Contexts/useAuthContext';
import firestore from '@react-native-firebase/firestore';

const Home = ({navigation}) => {
  const [data, setData] = useState();
  const {user} = useAuthContext();

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(user?.uid)
      .get()
      .then(elem => {
        setData(elem.data());
      });
  }, [user]);


  if(!user) return navigation.navigate("Login")
  
  return (
    <>
      <Navbar navigation={navigation} />
      <ScrollView>
        <Categories navigation={navigation} />
        <RandomMeal navigation={navigation}/>
      </ScrollView>
    </>
  );
};

export default Home;
