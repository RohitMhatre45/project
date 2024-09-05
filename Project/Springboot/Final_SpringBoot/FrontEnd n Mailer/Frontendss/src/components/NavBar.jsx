import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RoleNavbar from "./RoleNavbar";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";
import MenuIcon from "@rsuite/icons/Menu";

const { Fragment } = require("react");

function NavBar() {
  const state = useSelector((state) => state);
  console.log("LoggedIn ", state.loggedin);
  console.log("Cart ", state.cart);
  return (
    <Fragment>
      <div className="clearfix"></div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark position-sticky mb-0"
        style={{ top: 0, zIndex: "1000" }}
      >
        <a href="/">
          <img
            src={"logo_bookshelf.jpeg"}
            style={{ width: "48px", marginRight: "10px" }}
            className="float-left"
            alt="Logo"
          />
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                <i className="fa fa-fw fa-home" style={{ margin: "5px" }}></i>Home
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            
            <li className="nav-item active">
              <Dropdown
                title="Category"
                icon={<MenuIcon />}
                appearance="subtle"
              >
                <Dropdown.Menu title="Fiction">
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/cat/fiction/mystery-thriller">
                      Mystery & Thriller
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/cat/fiction/science-fiction">
                      Science Fiction
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/cat/fiction/fantasy">
                      Fantasy
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Menu title="Non-Fiction">
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/cat/non-fiction/biography-autobiography">
                      Biography & Autobiography
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/cat/non-fiction/self-help">
                      Self-Help
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Menu title="Children's Books">
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/cat/childrens-books/picture-books">
                      Picture Books
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="dropdown-item" to="/cat/childrens-books/early-readers">
                      Early Readers
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>

          <RoleNavbar isLoggedIn={state.loggedin.IsLoggedIn} />
        </div>
      </nav>
    </Fragment>
  );
}

export default NavBar;


// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import RoleNavbar from "./RoleNavbar";
// import Dropdown from "rsuite/Dropdown";
// import "rsuite/dist/rsuite.min.css";
// import MenuIcon from "@rsuite/icons/Menu";

// const { Fragment } = require("react");

// function NavBar() {
//   const state = useSelector((state) => state);
//   console.log("LoggedIn ", state.loggedin);
//   console.log("Cart ", state.cart);
//   return (
//     <Fragment>
//       <div className="clearfix"></div>
//       <nav
//         className="navbar navbar-expand-lg navbar-light bg-light position-sticky mb-0 "
//         style={{ top: 0, zIndex: "1000" }}
//       >
//         <a href="/">
//           <img
//             src={"favi.png"}
//             style={{ width: "36px", marginRight: "22px" }}
//             className="float-left"
//           />
//         </a>
//         <div className="collapse navbar-collapse" id="navbarNavDropdown">
//           <ul className="navbar-nav">
//             <li className="nav-item active">
//               <a className="nav-link" href="/">
//                 <i class="fa fa-fw fa-home" style={{ margin: "5px" }}></i>Home
//               </a>
//             </li>
//             <li className="nav-item active">
//               <a className="nav-link" href="/about">
//                About
//               </a>
//             </li>
            
//             <li className="nav-item active ">
//               <Dropdown
//                 title="Category"
//                 icon={<MenuIcon />}
//                 appearance="subtle"
//               >
//                 <Dropdown.Menu title="Fiction">
//                   <Dropdown.Item>
//                     <Link className="dropdown-item" to="/cat/Men/Upper Wear">
//                     Mystery & Thriller
//                     </Link>
//                   </Dropdown.Item>
//                   <Dropdown.Item>
//                     <Link className="dropdown-item" to="/cat/Men/Bottom Wear">
//                     Science Fiction
//                     </Link>
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//                 <Dropdown.Menu title="Non-Fiction">
//                   <Dropdown.Item>
//                     {" "}
//                     <Link className="dropdown-item" to="/cat/Women/Upper Wear">
//                     Biography & Autobiography
//                     </Link>
//                   </Dropdown.Item>
//                   <Dropdown.Item>
//                     <Link className="dropdown-item" to="/cat/Women/Bottom Wear">
//                     Self-Help
//                     </Link>
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//                 <Dropdown.Menu title="Children's Books">
//                   <Dropdown.Item>
//                     {" "}
//                     <Link className="dropdown-item" to="/cat/Women/Upper Wear">
//                     Picture Books
//                     </Link>
//                   </Dropdown.Item>
//                   <Dropdown.Item>
//                     <Link className="dropdown-item" to="/cat/Women/Bottom Wear">
//                     Early Readers
//                     </Link>
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             </li>
//           </ul>

//           <RoleNavbar isLoggedIn={state.loggedin.IsLoggedIn} />
//         </div>
//       </nav>
//     </Fragment>
//   );
// }

// export default NavBar;
