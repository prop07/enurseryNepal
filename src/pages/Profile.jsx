
import { useUser } from "../context/UserContext";



const Profile = () => {
  const { userId } = useUser();


  return (
    <div>Profile</div>
  )
}

export default Profile