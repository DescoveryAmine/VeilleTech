import { Suspense, useState, useEffect  } from "react";
import { BrowserRouter as Router, Switch} from "react-router-dom";
import PostAuthroutes from "./routes/PostAuthRoutes";
import AfterAuthroutes from "./routes/AfterAuthRoutes";
import Loading from "./components/Loading/Loading";
import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';
import ThemeRoute from "./routes/ThemeRoute/ThemeRoute";


//ok



function App() {

  const { token,tokenExpirationDate, login, logout, userId, userName, userRole, Fint } = useAuth();
  const [sToken, setToken] = useState(null);


  useEffect(()=>{
      const storedData = window.localStorage.getItem('userData');
      if(!!storedData)
      {   
        const data = JSON.parse(storedData)
        if(new Date(data.expiration) > new Date())
          {
          setToken(data.token);
          }
        else
          {
            
            logout();
          }

      }
      else 
      {
        setToken(null);
      }
  },[])




  let routes;

  if (!!sToken) {
    routes = (
      <Switch>
      {
        AfterAuthroutes?.map((route, index) => {
          return (
            <ThemeRoute
              key={index}
              name={route.name}
              exact={route.exact}
              path={route.path}
              theme={route.theme}
              component={route.component}
            >{route.component}</ThemeRoute>
          )
        })
      }
    </Switch>
       );
      } else {
        routes = (
          <Switch>
          {
            PostAuthroutes?.map((route, index) => {
              return (
                <ThemeRoute
                  key={index}
                  name={route.name}
                  exact={route.exact}
                  path={route.path}
                  theme={route.theme}
                  component={route.component}
                >{route.component}</ThemeRoute>
              )
            })
          }
        </Switch>
        );
      }

  return (

    <AuthContext.Provider
    value={{
      isLoggedIn: !!token,
      userId: userId,
      userName : userName,
      userRole : userRole,
      token: token,
      Fint:Fint,
      tokenExpirationDate:tokenExpirationDate,
      login: login,
      logout: logout
    }}
  >
    <Suspense fallback={<Loading />}>
      <Router>
      {routes}
      </Router>
    </Suspense>
    </AuthContext.Provider>
  );
}

export default App;
