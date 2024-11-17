import { useEffect, useState } from "react";
import {useLocationParams} from "./useLocationParams.tsx";

const useAuth = () => {
    const {pathname} = useLocationParams()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!localStorage.getItem("token")
    );
    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem("token"))
    }, [isAuthenticated, pathname]);

    const setAuthenticated = (value: boolean) => {
        setIsAuthenticated(value);
        localStorage.setItem("token", JSON.stringify(value));
    };

    return { isAuthenticated, setAuthenticated };
};

export default useAuth;
