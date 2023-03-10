import React, { useReducer, createContext } from 'react';
import jwtDecode from "jwt-decode";

const initialState = {
    user: null
}

if (localStorage.getItem('userToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('userToken'));

    initialState.user = decodedToken;

    // if (decodedToken.exp * 1000 < Date.now()) {
    //     localStorage.removeItem('userToken');
    // } else {
    //     initialState.user = decodedToken;
    // }
};

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
});

// action.payload returns the fields from the graphql mutation
function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
              ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
              ...state,
                user: null
            }
        default:
            return state;
    }
}

function AuthProvider(props) {
    
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData) => {
        localStorage.setItem('userToken', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    };

    function logout() {
        localStorage.removeItem('userToken');
        dispatch({
            type: 'LOGOUT'
        });
    }

    return (
        <AuthContext.Provider value={{ user: state.user, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };