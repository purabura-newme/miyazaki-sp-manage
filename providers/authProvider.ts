import {
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT } from 'react-admin';
import { auth } from '../firebaseConfig';

type AuthProviderType = typeof AUTH_LOGIN | typeof AUTH_LOGOUT | typeof AUTH_ERROR | typeof AUTH_CHECK | typeof AUTH_GET_PERMISSIONS;

interface AuthProviderParams {
    username?: string;
    password?: string;
}

const authProvider = async (type: AuthProviderType, params: AuthProviderParams) => {
    if (type === AUTH_LOGIN) {
        try {
            const { username, password } = params;
            await signInWithEmailAndPassword(auth, username!, password!);
            const user = auth.currentUser;
            if (user) {
                console.log(user);
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem("user", JSON.stringify(user));
                }
                return Promise.resolve();
            }
        } catch {
            return Promise.reject();
        }
    }
    if (type === AUTH_LOGOUT) {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('user');
            window.localStorage.removeItem('role');
        }
        await signOut(auth);
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        // ...
    }
    if (type === AUTH_CHECK) {
        return window.localStorage.getItem('user') ? Promise.resolve() : Promise.reject();
    }
    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve(role) : Promise.reject();
        return Promise.resolve();
    }
    return Promise.reject('Unknown method');
};

export default authProvider;
