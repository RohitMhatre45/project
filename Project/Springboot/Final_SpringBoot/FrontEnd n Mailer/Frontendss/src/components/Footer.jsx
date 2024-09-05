import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left">
          {/* Column 1: Online Shopping */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Online Shopping</h5>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Fiction
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Non-Fiction
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Kids
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Gift Card
              </a>
            </p>
          </div>

          {/* Column 2: Useful Links */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Useful Links</h5>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Blog
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Career
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Site Map
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Corporate Info
              </a>
            </p>
          </div>

          {/* Column 3: Customer Policy */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Customer Policy</h5>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Contact Us
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                FAQ
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Terms & Conditions
              </a>
            </p>
            <p>
              <a href="/" className="text-white" style={{ textDecoration: 'none' }}>
                Terms of Use
              </a>
            </p>
          </div>

          {/* Column 4: Social Media */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Follow Us</h5>
            <div className="social-icons">
              <a href="#" className="text-white me-4" style={{ fontSize: '30px' }}>
                <FaFacebookF />
              </a>
              <a href="#" className="text-white me-4" style={{ fontSize: '30px' }}>
                <FaTwitter />
              </a>
              <a href="#" className="text-white me-4" style={{ fontSize: '30px' }}>
                <FaInstagram />
              </a>
              <a href="#" className="text-white me-4" style={{ fontSize: '30px' }}>
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Footer Bottom */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-left mb-0">
              © {new Date().getFullYear()} Book-Shelf. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


// import React from 'react'

// function Footer () {
//   return (
//     <>
//          {/* <h1 className='Footer_Name'>Footer</h1> */}
//          <div className='footer_bottom'>F
//         <div className='row ContentFooter '>
       
//             <div className='col-lg-4'>
//                 <ul>
//                     <th>ONLINE SHOPPING</th>
//                     <li>Fiction</li>
//                     <li>Non-Fiction</li>
//                     <li>Kids</li>   
//                     <li>Gift Card</li>
//                 </ul>
//             </div>
//             <div className='col-lg-4'>
//             <ul>
//                     <th>USEFUL LINKS</th>
//                     <li>Blog</li>
//                     <li>Carrer</li>
//                     <li>Site Map</li>
//                     <li>Corporate info.</li>
//                 </ul>
//             </div>
//             <div className='col-lg-4'>
//             <ul>
//                     <th>CUSTOMER POLICY</th>
//                     <li>Contact Us</li>
//                     <li>FAQ</li>
//                     <li>T&C</li>
//                     <li>Term Of Use</li>
//                 </ul>
//             </div>

//         </div>
//     </div>
//     </>
   
//   )
// }

// export default Footer