import {useContext } from 'react';
import { AuthContext } from '../context/auth-context';

const Current = () => {

  const auth = useContext(AuthContext);
  auth.logout();
}




  export default Current;