import {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

const AuthContext = createContext();

export default function AuthContextProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const Login = (email, password) => {
    return auth().signInWithEmailAndPassword(email, password);
  };

  const Register = (email, password) => {
    return auth().createUserWithEmailAndPassword(email, password);
  };

  const Logout = () => {
    return auth().signOut();
  };

  function onAuthStateChanged(user) {
    setUser(user);
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider value={{user, Login, Register, Logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
