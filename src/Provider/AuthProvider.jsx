import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import useAxiosPublic from '../CustomHook/useAxiosPublic';
export const authContext = createContext()

const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()
    const [user,setUser] = useState([])
    const [loading,setLoading] = useState(true)
    const provider = new GoogleAuthProvider()

    const createUserSignUp = (email,password)=>{
        setLoading(false)

        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginWithEmail = (email,password)=>{
        setLoading(false)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const loginWithGoogle = ()=>{
        return signInWithPopup(auth,provider)
    }
    const logOut = ()=>{
        return signOut(auth)
    }

    useEffect(()=>{

        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            if(currentUser){
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                        setLoading(false)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
        })
        return () => {
            return unsubscribe();
        }
    },[])

    const userInfo = {
        createUserSignUp,
        loginWithEmail,
        loginWithGoogle,
        logOut,
        loading,
        setUser,
        user

    }

    return (
        <authContext.Provider value={userInfo}>
            {children}
        </authContext.Provider>
    )
};

export default AuthProvider;