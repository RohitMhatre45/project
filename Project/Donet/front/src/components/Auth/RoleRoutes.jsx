// // RoleRoutes.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { isAuthenticated, getUserRoleId } from './auth';
// import { jwtDecode } from 'jwt-decode'


// const AdminRoute = ({ element: Element, ...rest }) => {
//   return isAuthenticated() && getUserRoleId() === 3 ? (
//     <Element {...rest} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// const SellerRoute = ({ element: Element, ...rest }) => {
//   return isAuthenticated() && getUserRoleId() === 1 ? (
//     <Element {...rest} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export { AdminRoute, SellerRoute };

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRoleId } from './auth';

const AdminRoute = ({ element: Element, ...rest }) => {
  const roleId = getUserRoleId();
  console.log('Current user role for AdminRoute:', roleId); // Debugging role check
  return isAuthenticated() && roleId === 'Admin' ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

const SellerRoute = ({ element: Element, ...rest }) => {
  const roleId = getUserRoleId();
  console.log('Current user role for SellerRoute:', roleId); // Debugging role check
  return isAuthenticated() && roleId === 'Seller' ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export { AdminRoute, SellerRoute };

