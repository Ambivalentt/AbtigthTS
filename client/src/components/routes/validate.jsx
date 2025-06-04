import { useStateContext } from "../../context/user.jsx";
import { useContext } from "react";


const AuthRoute = ({ children }) => {
    const { user } = useStateContext();

    if (!user) {
        return <Navigate to='/' />
    }

    return children;
};

export default AuthRoute;