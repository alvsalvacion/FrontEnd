import { useStateContext } from "../Context/ContextProvider"
import { Navigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Contact = () => {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }
    return(
        <div>
          <Navbar />
            <h2 style={{color: "red"}}>Contact</h2>
        </div>
    )
}