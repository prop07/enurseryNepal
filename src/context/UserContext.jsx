import { createContext, useState,useEffect ,useContext} from 'react';

// firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState();
  const updateUser = (newUserId)=>{
    setUserId(newUserId);
    window.location.reload("/");
    
  }
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        console.log(user.email);
      } else {
        console.log("User Not Found");
      }
    });
  }, []);

  useEffect(()=>{
console.log("here is your User id"+ userId);
  },[userId])

  return (
    <UserContext.Provider value={{ userId, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};