import React, { createContext, useEffect, useState } from 'react';
import app from './../firebase/firebase.config';
import {getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth'

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider()

    const createUser = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (name,imageURL) => {
        return updateProfile(auth.currentUser, {
            displayName:name,
            photoURL:imageURL
        });
    }

    const signIn = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        localStorage.removeItem('cookBook-token');
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currrentUser => {
            setUser(currrentUser);
            setLoading(false);
        })

        return ()=>{
            return unsubscribe();
        }
    },[])

    const authInfo = {user, loading, createUser, signIn, logOut, updateUser, googleSignIn};
    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;