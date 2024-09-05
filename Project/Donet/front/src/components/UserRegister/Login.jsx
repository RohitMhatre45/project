// import React, { useState } from 'react';
// import { Button, Form, Container } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './All.css';
// import bcrypt from "bcryptjs";

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [generalError, setGeneralError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   const validateEmail = (email) => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
//   };

//   const validatePassword = (password) => {
//     return password.length >= 6;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Clear previous errors
//     setEmailError('');
//     setPasswordError('');
//     setGeneralError('');

//     // Validation
//     if (!email) {
//       setEmailError('Email is required');
//       setIsLoading(false);
//       return;
//     }

//     if (!password) {
//       setPasswordError('Password is required');
//       setIsLoading(false);
//       return;
//     }

//     if (!validateEmail(email)) {
//       setEmailError('Invalid email format');
//       setIsLoading(false);
//       return;
//     }

//     if (!validatePassword(password)) {
//       setPasswordError('Password must be at least 6 characters long');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // Fetch all users
//       const usersResponse = await fetch('http://localhost:5216/api/User/GetAllUsers', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (!usersResponse.ok) {
//         throw new Error('Failed to fetch users');
//       }

//       const usersData = await usersResponse.json();

//       // Find user by email
//       const user = usersData.data.find(user => user.email === email);

//       if (!user) {
//         throw new Error('User not found');
//       }

//       let match = false;

//       // Check if the password is hashed (bcrypt hashed passwords are typically 60 characters long)
//       if (user.password.length === 60) {
//         match = bcrypt.compareSync(password, user.password);
//       }

//       // If the password isn't hashed or bcrypt comparison fails, do a plain-text comparison
//       if (!match) {
//         match = password === user.password;
//       }

//       if (match) {
//         localStorage.setItem('user', JSON.stringify(user));
//         alert('Login successful');
//         navigate('/');
//         window.location.reload();
//       } else {
//         throw new Error('Invalid email or password');
//       }
//     } catch (error) {
//       setGeneralError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//       <div className="auth-box p-4">
//         <h2 className="text-center mb-3">Login</h2>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formBasicEmail" className="mb-3">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="input-field"
//               required
//             />
//             {emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
//           </Form.Group>

//           <Form.Group controlId="formBasicPassword" className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="input-field"
//               required
//             />
//             {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
//           </Form.Group>

//           {generalError && <p className="text-danger text-center">{generalError}</p>}
          
//           <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
//             {isLoading ? 'Logging In...' : 'Login'}
//           </Button>
//         </Form>
//       </div>
//     </Container>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import './All.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    // Validation
    if (!email) {
      setEmailError('Email is required');
      setIsLoading(false);
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5216/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log(response)

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      console.log(data);
      
      const token = data.token;

      console.log(token);

      if (typeof token === 'string') {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify({
          userId: decodedToken.sub,
          userRole: decodedToken.role,
        }));

        alert('Login successful');
        navigate('/');
        window.location.reload();
      } else {
        throw new Error('Failed to retrieve a valid token');
      }
    } catch (error) {
      setGeneralError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="auth-box p-4">
        <h2 className="text-center mb-3">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
            {emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
          </Form.Group>

          {generalError && <p className="text-danger text-center">{generalError}</p>}
          
          <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Login'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;

