// import { useStateContext } from "../Context/ContextProvider"
// import { Navigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Home = () => {
    // const { token } = useStateContext();

    // if (!token) {
    //     return <Navigate to="/login" />;
    // }
    return(
        <div>
          <Navbar />
            <h2 style={{color: "red"}}>Home</h2>
            {/* <p>Token:{token}</p> */}
        </div>
    )
}