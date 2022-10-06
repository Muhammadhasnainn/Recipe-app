import {Link, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text, Pressable} from 'react-native';
import {useAuthContext} from '../Contexts/useAuthContext';
import firestore from '@react-native-firebase/firestore';

const SignUp = () => {
  const {Register} = useAuthContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Cpassword, setCPassword] = useState('');
  const navigation = useNavigation();

  const HandleRegister = async () => {
    try {
      if (Cpassword === password) {
        const credentials = await Register(email, password);
        await firestore().collection('users').doc(credentials.user.uid).set({
          name: name,
        });
        navigation.navigate('Home');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.heading}>Register</Text>
      <TextInput
        placeholder="Name"
        placeholderTextColor={'gray'}
        style={styles.input}
        onChangeText={value => setName(value)}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor={'gray'}
        style={styles.input}
        onChangeText={value => setEmail(value)}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={'gray'}
        style={styles.input}
        onChangeText={value => setPassword(value)}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={'gray'}
        style={styles.input}
        onChangeText={value => setCPassword(value)}
      />
      <Pressable style={styles.Btn} onPress={HandleRegister}>
        <Text style={styles.btnText}>Sign up</Text>
      </Pressable>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Text style={styles.line}>New here?</Text>
        <Link to={{screen: 'Login'}} style={styles.link}>
          Login now!
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '90%',
    marginHorizontal: '5%',
  },
  heading: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    color: 'black',
  },
  input: {
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gainsboro',
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 5,
  },
  Btn: {
    backgroundColor: 'black',
    paddingVertical: 8,
    borderRadius: 10,
    width: 70,
  },
  btnText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  line: {
    fontSize: 15,
  },
  link: {
    fontSize: 15,
    color: 'blue',
    marginLeft: 5,
  },
});

export default SignUp;
