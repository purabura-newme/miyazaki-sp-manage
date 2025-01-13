import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import Cookies from 'js-cookie';
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
                // クッキーにユーザー情報を保存
                Cookies.set('user', JSON.stringify(user), { expires: 7 }); // 7日間有効
                return Promise.resolve();
            }
        } catch {
            return Promise.reject('Invalid login');
        }
    }
    if (type === AUTH_LOGOUT) {
        // クッキーからユーザー情報と役割を削除
        Cookies.remove('user');
        Cookies.remove('role');
        await signOut(auth);
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        // 必要に応じてエラーハンドリングを実装
    }
    if (type === AUTH_CHECK) {
        // クッキーからユーザー情報を取得して存在を確認
        const user = Cookies.get('user');
        const auth = getAuth();
        const firebaseUser = auth.currentUser;
        console.log("check user");
        console.log(user);
        return user ? Promise.resolve() : Promise.reject('Unauthorized');
    }
    if (type === AUTH_GET_PERMISSIONS) {
        // クッキーから役割情報を取得
        // const role = Cookies.get('role');
        // console.log("check role");
        // console.log(role);
        // return role ? Promise.resolve(role) : Promise.reject();
    }
};

export default authProvider;
