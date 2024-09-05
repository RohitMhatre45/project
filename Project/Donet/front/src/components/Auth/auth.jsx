// import { jwtDecode } from 'jwt-decode'

// export const isAuthenticated = () => {
//   const token = localStorage.getItem('token');
//   if (!token) return false;

//   try {
//     const decodedToken = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     if (decodedToken.exp < currentTime) {
//       return false;
//     }
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

// export const getUserRoleId = () => {
//   const token = localStorage.getItem('token');
//   if (!token) return null;

//   try {
//     const decodedToken = jwtDecode(token);
//     return decodedToken.userRoleId;
//   } catch (error) {
//     return null;
//   }
// };

// import { jwtDecode } from 'jwt-decode'

// export const isAuthenticated = () => {
//   const token = localStorage.getItem('token');
//   if (!token) return false;

//   try {
//     const decodedToken = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decodedToken.exp > currentTime;
//   } catch (error) {
//     return false;
//   }
// };

// export const getUserRoleId = () => {
//   const token = localStorage.getItem('token');
//   if (!token) return null;

//   try {
//     const decodedToken = jwtDecode(token);
//     console.log('Decoded userRoleId:', decodedToken.userRoleId); // Print the decoded role ID
//     return decodedToken.userRoleId;
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// };

import { jwtDecode } from 'jwt-decode'

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const getUserRoleId = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    console.log('Decoded user role:', decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']); // Log the decoded role for debugging
    return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // Adjusted based on your JWT structure
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};


