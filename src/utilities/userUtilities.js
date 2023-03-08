import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useQuery, useMutation } from '@apollo/react-hooks';



import { REGISTER_USER } from '../graphql/mutations'
import { } from '../graphql/queries'

export function Register(values) {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const  [registerUser, { loading, error, data }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData }}) {
            context.login(userData);
            navigate('/dashboard');
        },
        onError(err) {
            setErrors(err.graphQLErrors);
        },
        variables: { registerInput: values}
    });

    return null
}