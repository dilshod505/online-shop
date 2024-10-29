import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function UseAuth() {
    const { pathname } = useLocation();
    const [isAuth, setIsAuthState] = useState<boolean>(
        !!localStorage.getItem('token')
    );

    useEffect(() => {
        setIsAuthState(!!localStorage.getItem('token'));
        [isAuth, pathname].forEach((item) => {
            console.log(item);
        })
    }, [pathname]);

    const setIsAuth = (value: boolean) => {
        setIsAuthState(value);
        localStorage.setItem('token', value ? 'true' : 'false');
    }

    return { isAuth, setIsAuth }
}

export default UseAuth;