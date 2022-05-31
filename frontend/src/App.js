import { Suspense, useState, useCallback  } from "react";
import { BrowserRouter as Router, Switch} from "react-router-dom";
import PostAuthroutes from "./routes/PostAuthRoutes";
import AfterAuthroutes from "./routes/AfterAuthRoutes";
import Loading from "./components/Loading/Loading";
import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';
import ThemeRoute from "./routes/ThemeRoute/ThemeRoute";

//ok



function App() {

  const { token, login, logout, userId, userName } = useAuth();


  let routes;

  if (!!token) {
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
      token: token,
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
