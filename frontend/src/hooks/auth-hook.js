import { useState, useCallback, useEffect } from 'react';
import { useHttpClient } from '../hooks/http-hook';

let logoutTimer;

export const useAuth = () => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [userName, setUserName] = useState(false);
  const [userRole, setUserRole] = useState(false);
  const [Fint, setFint] = useState(false);

  const handleSessionLogout = async event => {

      const storedData = window.localStorage.getItem('userData');

      if(!!storedData)
      {   
        const data = JSON.parse(storedData);
        const{userId,info,electro,meca} = data;

      try {
          await sendRequest(
          'http://localhost:5000/api/users/logout/',
          'POST',
          JSON.stringify({
            userID: userId,
            Info: info,
            Electro: electro,
            Meca: meca
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        setUserName(null);
        setUserRole(null);
        setFint(null);
        window.localStorage.removeItem('userData');
        window.localStorage.removeItem('userFinterrest');
        window.location.reload(); 
      } catch (err) {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        setUserName(null);
        setUserRole(null);
        setFint(null);
        window.localStorage.removeItem('userData');
        window.localStorage.removeItem('userFinterrest');
        window.location.reload(); 
      }
    }
      };

  const login = useCallback((uid, name, role, token, expirationDate,fint) => {
    setUserId(uid);
    setUserName(name);
    setUserRole(role);
    setToken(token);
    setFint(fint);
    setTokenExpirationDate(expirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        userName: name,
        userFint:fint,
        userRole: role,
        token: token,
        expiration: expirationDate,
        info:0,
        electro:0,
        meca:0
      })
    );
  }, []);

  const logout = useCallback(() => {
      handleSessionLogout();
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate - new Date().getTime() ;
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.userName, storedData.userRole, storedData.token, new Date(storedData.expiration),storedData.userFint);
    }
  }, [login]);

  return { token,tokenExpirationDate, login, logout, userId, userName, userRole, Fint };
};