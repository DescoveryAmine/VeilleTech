import { useState, useCallback, useEffect } from 'react';


let logoutTimer;

export const useAuth = () => {

  
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [userName, setUserName] = useState(false);
  const [userRole, setUserRole] = useState(false);

  const login = useCallback((uid, name, role, token, expirationDate) => {
    setUserId(uid);
    setUserName(name);
    setUserRole(role);
    setToken(token);
    setTokenExpirationDate(expirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        userName: name,
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
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setUserName(null);
    setUserRole(null);
    localStorage.removeItem('userData');
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
      login(storedData.userId, storedData.userName, storedData.userRole, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return { token,tokenExpirationDate, login, logout, userId, userName, userRole };
};