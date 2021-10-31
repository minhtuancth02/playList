import { useState } from 'react';
import { useAuth } from 'F:/React-Random/travel-web/src/contexts/AuthContexts.js';

const defaultValues = {
    username: '',
    password: '',
    error: null,
    loading: false,
};

export default function useLogin() {
    const [values, setValues] = useState(defaultValues);

    const { Login } = useAuth();

    async function login() {
        try {
            setLoading();
            await Login(values.username,values.password);
            loginSuccess();
        }
        catch {
            loginFailed();
        }
    }

    function loginSuccess() {
        setValues({
            ...defaultValues,
            loggedIn: true,
            loading: false,
        });
    }

    function loginFailed() {
        setValues((prev) => ({
            ...prev,
            loggedIn: false,
            loading: false,
            error: 'Invalid username or password',
        }));
    }

    function setLoading() {
        setValues((prev) => ({ ...prev, loading: true }));
    }

    function logout() {
        setValues(defaultValues);
    }

    function setUsername(username) {
        setValues((prev) => ({ ...prev, username }));
    }

    function setPassword(password) {
        setValues((prev) => ({ ...prev, password }));
    }

    return { values, setUsername, setPassword, login, logout };

}