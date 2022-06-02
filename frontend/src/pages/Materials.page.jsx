import {useContext } from 'react';
import { AuthContext } from '../context/auth-context';

const Materials = () => {

  const auth = useContext(AuthContext);
  auth.logout();
}




  export default Materials;