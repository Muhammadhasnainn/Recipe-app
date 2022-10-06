import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  SafeAreaView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useGlobalContext} from '../Contexts/GlobalContext';
import {useAuthContext} from '../Contexts/useAuthContext';

const Navbar = (props) => {
  const {query, setQuery, setFoods} = useGlobalContext();
  const {user, Logout} = useAuthContext();
  const navigation = useNavigation();

  const FetchFoods = async () => {
    const {data} = await axios.get(
      `https://themealdb.com/api/json/v1/1/search.php?s=${query}`,
    );
    setFoods(data.meals);
    navigation.navigate('Results');
  };

  const HandleLogOut = async () => {
    try {
      await Logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.TopBar}>
      <View style={styles.utilityWidth}>
        {user ? (
          <SafeAreaView style={styles.logOut}>
            <Pressable
              onPress={() => navigation.navigate('WatchLater')}
              style={{...styles.authBtn, backgroundColor: '#0972db'}}>
              <Fontisto name="favorite" color={'white'} size={22} />
            </Pressable>
            <Pressable onPress={HandleLogOut} style={styles.authBtn}>
              <MaterialIcon name="logout" size={22} color="white" />
            </Pressable>
          </SafeAreaView>
        ) : (
          <SafeAreaView style={styles.logIn}>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.logOutText}>Log in</Text>
            </Pressable>
          </SafeAreaView>
        )}
        <Text style={styles.Logo}>Recipe App</Text>
        <View style={styles.searchBar}>
          <Pressable onPress={FetchFoods}>
            <FontAwesome
              name="search"
              size={18}
              color="gainsboro"
              style={{paddingHorizontal: 10}}
            />
          </Pressable>
          <TextInput
            placeholder="Search Recipes Here!"
            placeholderTextColor={'gainsboro'}
            onChangeText={value => setQuery(value)}
            defaultValue={query}
            style={styles.searchInput}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TopBar: {
    backgroundColor: '#191919',
    paddingVertical: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    height: 150
  },
  utilityWidth: {
    width: '90%',
    marginHorizontal: '5%',
  },
  logOut: {
    position: 'absolute',
    top: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    right: '3%',
    zIndex: 200,
  },
  authBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: 'red',
    marginLeft: 10,
  },
  logIn: {
    position: 'absolute',
    top: '2%',
    right: '3%',
    backgroundColor: '#4735fd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    zIndex: 200,
  },
  logOutText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  Logo: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#2f2f2f',
    borderRadius: 12,
    height: 45,
  },
  searchInput: {
    color: 'white',
    fontSize: 15,
    marginLeft: 5,
  },
});

export default Navbar;
