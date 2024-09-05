// // PrivateRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { isAuthenticated } from './auth';
// import { jwtDecode } from 'jwt-decode'


// const PrivateRoute = ({ element: Element, ...rest }) => {
//   return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

const PrivateRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
