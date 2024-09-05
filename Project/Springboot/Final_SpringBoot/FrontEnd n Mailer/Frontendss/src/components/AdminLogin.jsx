import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import loginOGvalidation from "../loginOGvalidation";
import swal from 'sweetalert';
import './LoginCommon.css'; 

function AdminLogin() {
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
    setErrors(loginOGvalidation(user));
    setSubmitted(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitted) {
      axios.post("http://localhost:8080/api/admins/validate", user)
        .then((resp) => {
          let result = resp.data.data;
          sessionStorage.setItem("userid", result.userid);
          sessionStorage.setItem("uname", result.name);
          sessionStorage.setItem("role", "admin");
          sessionStorage.setItem("id", result.id);
          dispatch({ type: 'IsLoggedIn' });
          history.push("/adashboard");
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
          <h4>Admin Login Form</h4>
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
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;


// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import loginOGvalidation from "../loginOGvalidation"
// import swal from 'sweetalert';

// function AdminLogin(){
//     const dispatch=useDispatch()
//     const [user,setUser]=useState({
//         "userid":"",
//         "pwd":""
//     })
//     const [submitted,setSubmitted]=useState(false)
//     const [errors,setErrors]=useState({})
//     const [errmsg,setErrmsg]=useState()
//     const history=useHistory()

//     const handleInput=(e)=>{
//         setUser({...user,[e.target.name]:e.target.value})
//     }

//     const handleSubmit=e=>{
//         e.preventDefault()
//         setErrors(loginOGvalidation(user))    
//         setSubmitted(true)
//     }

//     useEffect(()=>{
//         console.log(errors)
//         if(Object.keys(errors).length===0 && submitted){
//             console.log(user)
//             axios.post("http://localhost:8080/api/admin/validate",user)
//             .then(resp=>{
//                 let result=resp.data.data;
//                 console.log(resp.data.data)
//                 sessionStorage.setItem("userid",result.userid)
//                 sessionStorage.setItem("uname",result.uname)
//                 sessionStorage.setItem("role","admin")
//                 dispatch({type:'IsLoggedIn'})
//                 history.push("/aprofile")
//             })
//             .catch(error=>{
//                 console.log("Error",error);
//                 swal({
//                     title: "Error",
//                     text: "Invalid id or passward",
//                     icon: "error",
//                     button: "ok",
//                   });
//             })            
//         }
//     },[errors])


//     return (
//     <div className="container">
//             <div className="card shadow bg-dark mt-3 text-white">
//         <div className="card-body">
//         <div className="row">
//             <div className="col-sm-6 mx-auto">
//                 <h4 className="text-center p-2">
//                     Admin Login Form
//                 </h4>
//                 <form onSubmit={handleSubmit}>                 
//                 <div className="form-group form-row">
//                     <label className="col-sm-4 form-control-label">User Id</label>
//                     <div className="col-sm-8">
//                         <input type="text" name="userid" value={user.userid} onChange={handleInput} className="form-control" />
//                         {errors.userid && <small className="text-danger float-right">{errors.userid}</small>}
//                     </div>
                    
//                 </div>                    
//                 <div className="form-group form-row">
//                     <label className="col-sm-4 form-control-label">Password</label>
//                     <div className="col-sm-8">
//                         <input type="password" name="pwd" value={user.pwd} onChange={handleInput} className="form-control" />
//                         {errors.pwd && <small className="text-danger float-right">{errors.pwd}</small>}
//                     </div>
//                 </div>                    
//                 <button className="btn btn-warning float-right">Login Now</button>
                
//                 </form>
//                 <div className="clearfix"></div>
//                 {errmsg && <p className="alert alert-danger mt-4 text-center font-weight-bold">{errmsg}</p>}
//             </div>
//         </div>
//     </div>
//     </div>
//     </div>
//     );
// }

// export default AdminLogin;