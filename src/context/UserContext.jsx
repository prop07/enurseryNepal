import { createContext, useState,useEffect ,useContext} from 'react';

// firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [userId, setUserId] = useState();
  const updateUser = (newUserId)=>{
    setUserId(newUserId);
  }
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        // console.log("User logged in:", user.email);
      } else {
        setUserId(null);
        // console.log("User logged out");
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);
//   useEffect(()=>{
// console.log("here is your User id"+ userId);
//   },[userId])
  return (
    <UserContext.Provider value={{ userId, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};