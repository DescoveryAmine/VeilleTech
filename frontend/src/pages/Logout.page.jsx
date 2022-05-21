import {useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import { useHistory } from 'react-router'

const Logout = () => {

  const history = useHistory()
  
  const auth = useContext(AuthContext);
  auth.logout();
  history.push("/")
  history.go(0);
  
  
}




  export default Logout;