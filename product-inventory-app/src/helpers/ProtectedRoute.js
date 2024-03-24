// import React, { useContext } from "react";
// import { Route, useNavigate } from "react-router-dom";
// import { AuthContext } from "../provider/AuthProvider";

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const { isAuthenticated } = useContext(AuthContext);
//     const navigate = useNavigate();

//     return (
//         <>
//             <Route
//                 {...rest}
//                 render={(props) =>
//                     isAuthenticated ? (
//                         <Component key={props.location.key} {...props} />
//                     ) : (
//                         navigate("/login")
//                     )
//                 }
//             />
//         </>
//     );
// };

// export default ProtectedRoute;
