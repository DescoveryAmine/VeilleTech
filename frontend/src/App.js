import { Suspense, useState, useCallback  } from "react";
import { BrowserRouter as Router, Switch} from "react-router-dom";
import PostAuthroutes from "./routes/PostAuthRoutes";
import AfterAuthroutes from "./routes/AfterAuthRoutes";
import Loading from "./components/Loading/Loading";
import { AuthContext } from './context/auth-context';
import ThemeRoute from "./routes/ThemeRoute/ThemeRoute";
//ok



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const login = useCallback((uid,name) => {
    setIsLoggedIn(true);
    setUserId(uid);
    setUserName(name);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
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
      isLoggedIn: isLoggedIn,
      userId: userId,
      userName : userName,
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
