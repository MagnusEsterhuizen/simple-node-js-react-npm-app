//react
import React, { createContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

//database
import { doListen, doLogin, doLogout } from "./../../database/firebase/firebase";

//state
/**
 * (Authorize Group) Returns user group for Firebase authentication
 * @return authGroup
 */
export const useAuthorizeState = () => {
    const [group, setGroup] = useState(null);

    //firebase eventlistener for user login
    useEffect(() => {
        doListen(setGroup);
    }, []);

    let authGroup;
    if (group) {
        authGroup = group;
    }

    return { authGroup }
}

//route
/**
 * (Authorie Route) Returns Signin when not authorized user
 * @return route | signin
 */
export const AuthorizeRoute = ({ authGroup, component: Component, exact, path, location, ...props }) => {
    return <>
        <Route
            exact={exact}
            path={path}
            render={() => (authGroup === "admin" || authGroup === "viewer")
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: "/signin",
                        state: {
                            from: location.pathname
                        }
                    }}
                />
            }
        />
    </>
}

//provider
/**
 * (Context Provider) Provides context to components for the UserGroup
 * @param children - wrapped elements
 * @return JSX component
 */
export const AuthorizeContextProvider = ({ children }) => {
    const { authGroup } = useAuthorizeState();

    return <>
        <AuthorizeContext.Provider
            value={{ authGroup, doLogin, doLogout }}
        >
            {children}
        </AuthorizeContext.Provider>
    </>
}

//context
const AuthorizeContext = createContext([]);
export default AuthorizeContext;
