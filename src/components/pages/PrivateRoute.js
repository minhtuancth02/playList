import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from 'F:/React-Random/travel-web/src/contexts/AuthContexts.js'

// route protect
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={props => 
                currentUser
                    ? <Component {...props} />
                    : <Redirect to='/login/login-form' />
            }
        >  
        </Route>
    )
}

export default PrivateRoute
