import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import loginvalidation from "../loginvalidation";
import swal from 'sweetalert';
import { FaFacebook, FaTwitter, FaGoogle } from 'react-icons/fa';
import './LoginCommon.css'; 

function SellerLogin() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ userid: "", pwd: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(loginvalidation(user));
    setSubmitted(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitted) {
      axios.post("http://localhost:8080/api/sellers/validate", user)
        .then((resp) => {
          let result = resp.data.data;
          sessionStorage.setItem("userid", result.userid);
          sessionStorage.setItem("uname", result.name);
          sessionStorage.setItem("role", "seller");
          sessionStorage.setItem("id", result.id);
          dispatch({ type: 'IsLoggedIn' });
          history.push("/sprofile");
        })
        .catch(() => {
          swal({
            title: "Error",
            text: "Invalid username or password",
            icon: "error",
            button: "ok",
          });
        });
    }
  }, [errors]);

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="logo-container">
          <img src="logo_bookshelf.jpeg" alt="Book-Shelf Logo" className="logo" />
        </div>
        <div className="form-wrapper">
          <h4>Seller Login Form</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Id</label>
              <input
                type="text"
                name="userid"
                value={user.userid}
                onChange={handleInput}
                className={`form-control ${errors.userid ? 'is-invalid' : ''}`}
              />
              {errors.userid && <div className="invalid-feedback">{errors.userid}</div>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="pwd"
                value={user.pwd}
                onChange={handleInput}
                className={`form-control ${errors.pwd ? 'is-invalid' : ''}`}
              />
              {errors.pwd && <div className="invalid-feedback">{errors.pwd}</div>}
            </div>
            <button className="btn btn-warning btn-submit">Login Now</button>
            <div className="social-login-icons">
              <FaFacebook size={24} className="social-icon" />
              <FaTwitter size={24} className="social-icon" />
              <FaGoogle size={24} className="social-icon" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellerLogin;



// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import loginvalidation from "../loginvalidation";
// import swal from 'sweetalert';

// function SellerLogin() {
//     const dispatch = useDispatch();
//     const [user, setUser] = useState({
//         "userid": "",
//         "pwd": ""
//     });
//     const [errors, setErrors] = useState({});
//     const [submitted, setSubmitted] = useState(false);
//     const history = useHistory();

//     const handleInput = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value });
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setErrors(loginvalidation(user));
//         setSubmitted(true);

//         if (Object.keys(errors).length === 0 && submitted) {
//             axios.post("http://localhost:8080/api/sellers/validate", user)
//                 .then(resp => {
//                     let result = resp.data.data;
//                     sessionStorage.setItem("userid", result.userid);
//                     sessionStorage.setItem("uname", result.name);
//                     sessionStorage.setItem("role", "seller");
//                     sessionStorage.setItem("id", result.id);
//                     dispatch({ type: 'IsLoggedIn' });
//                     history.push("/sprofile");
//                 })
//                 .catch(error => {
//                     console.log("Error", error);
//                     swal({
//                         title: "Error",
//                         text: "Invalid username or password",
//                         icon: "error",
//                         button: "ok",
//                     });
//                 })
//         }
//     }

//     useEffect(() => {
//         console.log(errors);
//         if (Object.keys(errors).length === 0 && submitted) {
//             axios.post("http://localhost:8080/api/sellers/validate", user)
//                 .then(resp => {
//                     let result = resp.data.data;
//                     console.log(resp.data.data);
//                     sessionStorage.setItem("userid", result.userid);
//                     sessionStorage.setItem("uname", result.name);
//                     sessionStorage.setItem("role", "seller");
//                     sessionStorage.setItem("id", result.id);
//                     dispatch({ type: 'IsLoggedIn' });
//                     history.push("/sprofile");
//                 })
//                 .catch(error => {
//                     console.log("Error", error);
//                     swal({
//                         title: "Error",
//                         text: "Invalid username or password",
//                         icon: "error",
//                         button: "ok",
//                     });
//                 })
//         }
//     }, [errors]);

//     return (
//         <div className="container">
//             <div className="card shadow bg-dark mt-3 text-white">
//                 <div className="card-body">
//                     <div className="row">
//                         <div className="col-sm-6 mx-auto">
//                             <h4 className="text-center p-2">
//                                 Seller Login Form
//                             </h4>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="form-group form-row">
//                                     <label className="col-sm-4 form-control-label">Email Id</label>
//                                     <div className="col-sm-8">
//                                         <input
//                                             type="text"
//                                             name="userid"
//                                             value={user.userid}
//                                             onChange={handleInput}
//                                             className={`form-control ${errors.userid ? 'is-invalid' : ''}`}
//                                         />
//                                         {errors.userid && <div className="invalid-feedback">{errors.userid}</div>}
//                                     </div>
//                                 </div>
//                                 <div className="form-group form-row">
//                                     <label className="col-sm-4 form-control-label">Password</label>
//                                     <div className="col-sm-8">
//                                         <input
//                                             type="password"
//                                             name="pwd"
//                                             value={user.pwd}
//                                             onChange={handleInput}
//                                             className={`form-control ${errors.pwd ? 'is-invalid' : ''}`}
//                                         />
//                                         {errors.pwd && <div className="invalid-feedback">{errors.pwd}</div>}
//                                     </div>
//                                 </div>
//                                 <button className="btn btn-warning float-right">Login Now</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SellerLogin;
