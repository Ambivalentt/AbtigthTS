import { useStateContext } from "../../context/user.jsx";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
    const { user } = useStateContext();
    useEffect(() => {
    },[ user ]);
    if (!user) {
        return <Navigate to='/' />
    }

    return children;
};

export default AuthRoute;