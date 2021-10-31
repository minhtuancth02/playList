import React, { useState ,useEffect } from 'react'
import {auth} from '../FIREBASE'


const AuthContext = React.createContext();

export function useAuth() {
    return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState();
    const [loadingUser, setLoadingUser] = useState(true);

    // create new Auth User 
    function Signup({ email, password }) {
        return auth.createUserWithEmailAndPassword(email, password);
    };
    function Login( email, password) {
        return auth.signInWithEmailAndPassword(email,password)
    };
    function Logout() {
        return auth.signOut();
    };
    function ResetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    };
    function UpdateEmail(email) {
        return currentUser.updateEmail(email);
    };
    function UpdatePassword(password) {
        return currentUser.updatePassword(password);
    };

    // sub user --> onAuthStateChanged() trình quan sát trạng thái xác thực/auth và lấy dữ liệu user
    // get current User at firebase & update state - currentUser
    useEffect(() => {
         // Loading Auth-User
        const unSub = auth.onAuthStateChanged(user => {
            setCurrentUser(user); // setCurrentUser first then turn-off loadingUser
            setLoadingUser(false);
        });
        return unSub
    }, []);
    
    // value of provider 😄
    const useAuthObj = {
        currentUser,
        Signup, Login, Logout, ResetPassword,
        UpdateEmail,UpdatePassword,
        loadingUser,
    };
    
    return (
        <AuthContext.Provider value={useAuthObj}>
            {/* {!loadingUser && children} */}
            { children }
        </AuthContext.Provider>
    )
}
