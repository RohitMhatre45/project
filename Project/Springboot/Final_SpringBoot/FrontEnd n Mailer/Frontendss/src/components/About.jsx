import React from 'react';
import image1 from "../images/bbanner1.jpg";
import image2 from "../images/bbanner2.jpg";
import image3 from "../images/bbanner3.jpg";
import aryan from "../images/Aryan.jpeg";
import shreyash from "../images/Shreyash.png";
import rohit from "../images/Rohit.jpeg";
import srishti from "../images/Srishti.jpg";
import yachana from "../images/Yachana.jpeg";
import Footer from '../components/Footer';
import '../AboutCSS.css'; // Ensure to import your CSS file

const About = () => {
  return (
    <div className="about-page-container"> {/* Updated className */}
      <div className='Row About_Row'>
        <div className='Row About_Banner'>
          <img
            className="img_About_Banner1"
            src={image1}
            alt="Books Banner"
            style={{ width: '100%', height: '500px', objectFit: 'cover' }}
          />
          <div className='About_banner_text1'>
            <h1 className='h1_About_banner_text'>Welcome To Our Store</h1>
            <h4 className='h4_About_banner_text'>Discover your next great read with Book-Shelf, where book enthusiasts find their perfect match.</h4>
            <p className='p_About_banner_text'> Dive into our extensive collection and enjoy a seamless shopping experience.</p>
          </div>
        </div>
      </div>
      <h1 className='headingAboutText'>About Our Project</h1>
      <h3 className='headingAboutText'>We Are Team 15</h3>

      <div className='Row AboutUs_photo_section1'>
        <div className='Row Photo_display'>
          <div className='Col-lg-2 card_photo'>
            <div className='img_Photo_Team'>
              <img className="img_admin_pic" src={aryan} alt="" />
              <p className='Photo_Name'>Aryan Garate</p>
            </div>
          </div>
          <div className='Col-lg-2 card_photo'>
            <div className='img_Photo_Team'>
              <img className="img_admin_pic" src={shreyash} alt="" />
              <p className='Photo_Name'>Shreyash Raut</p>
            </div>
          </div>
          <div className='Col-lg-2 card_photo'>
            <div className='img_Photo_Team'>
              <img className="img_admin_pic" src={rohit} alt="" />
              <p className='Photo_Name'>Rohit Mhatre</p>
            </div>
          </div>
          <div className='Col-lg-2 card_photo'>
            <div className='img_Photo_Team'>
              <img className="img_admin_pic" src={srishti} alt="" />
              <p className='Photo_Name'>Srishti Ravi</p>
            </div>
          </div>
          <div className='Col-lg-2 card_photo'>
            <div className='img_Photo_Team'>
              <img className="img_admin_pic" src={yachana} alt="" />
              <p className='Photo_Name'>Yachana Meshram</p>
            </div>
          </div>
        </div>
      </div>

      <div className='Row Poster_about'>
        <div className='left_Side col-lg-6'>
          <img
            className='img_Poster_banner'
            src={image2}
            alt=""
          />
        </div>
        <div className='right_Side col-lg-6'>
          <h2 className='h2right_SideAbout'>A Digital Haven for Book Lovers</h2>
          <p className='pright_SideAbout'>Book-Shelf is your ultimate online destination for discovering and purchasing books. 
            Our platform offers a rich collection of books, easy-to-use cart management, and personalized recommendations. 
            Book-Shelf brings the joy of reading right to your fingertips.
            <br/><br/>Book-Shelf goes beyond just offering a vast array of books; it’s designed to cater to both avid readers and casual book shoppers alike. 
            Whether you're searching for the latest bestsellers, timeless classics, our intuitive platform provides seamless navigation and tailored suggestions based on your preferences.</p>
        </div>
      </div>
      <br />

      <div className='Row About_Row_Design'>
        <div className='Row About_BannerDesign'>
          <img
            className="img_About_Banner1"
            src={image3}
            alt=""
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />
          <div className='About_banner_text2'>
            <h1 className='h1_About_banner_text1'>Crafting a Personalized Reading Experience</h1>
            <p className='p_About_banner_text1 col-lg-5'> At Book-Shelf, we believe every book tells a story. 
              Our platform is designed to make finding and purchasing your next read simple and enjoyable. Explore our curated collections, get personalized recommendations, and manage your orders effortlessly.</p>
          </div>
        </div>
      </div>
      <br />

      <Footer />
    </div>
  );
}

export default About;



// import React from 'react';
// import image1 from "../images/bbanner1.jpg";
// import image2 from "../images/bbanner2.jpg";
// import image3 from "../images/bbanner3.jpg";
// import aryan from "../images/Aryan.jpeg";
// import shreyash from "../images/Shreyash.png";
// import rohit from "../images/Rohit.jpeg";
// import srishti from "../images/Srishti.jpg";
// import yachana from "../images/Yachana.jpeg";
// import Footer from '../components/Footer';

// const About = () => {
//   return (
//     <>
//       <div className='Row About_Row'>
//         <div className='Row About_Banner'>
//           <img
//             className="img_About_Banner1"
//             src={image1}
//             alt="Books Banner"
//             style={{ width: '100%', height: '500px', objectFit: 'cover' }} // Inline style applied here
//           />
//           <div className='About_banner_text1'>
//             <h1 className='h1_About_banner_text'>Welcome To Our Store</h1>
//             <h4 className='h4_About_banner_text'>Discover your next great read with Book-Shelf, where book enthusiasts find their perfect match.</h4>
//             <p className='p_About_banner_text'> Dive into our extensive collection and enjoy a seamless shopping experience.</p>
//           </div>
//         </div>
//       </div>
//       <h1 className='headingAboutText'>About Our Project</h1>
//       <h3 className='headingAboutText'>We Are Team 15</h3>

//       <div className='Row AboutUs_photo_section1'>
//         <div className='Row Photo_display'>
//           <div className='Col-lg-2 card_photo'>
//             <div className='img_Photo_Team'>
//               <img className="img_admin_pic" src={aryan} alt="" />
//               <p className='Photo_Name'>Aryan Garate</p>
//             </div>
//           </div>
//           <div className='Col-lg-2 card_photo'>
//             <div className='img_Photo_Team'>
//               <img className="img_admin_pic" src={shreyash} alt="" />
//               <p className='Photo_Name'>Shreyash Raut</p>
//             </div>
//           </div>
//           <div className='Col-lg-2 card_photo'>
//             <div className='img_Photo_Team'>
//               <img className="img_admin_pic" src={rohit} alt="" />
//               <p className='Photo_Name'>Rohit Mhatre</p>
//             </div>
//           </div>
//           <div className='Col-lg-2 card_photo'>
//             <div className='img_Photo_Team'>
//               <img className="img_admin_pic" src={srishti} alt="" />
//               <p className='Photo_Name'>Srishti Ravi</p>
//             </div>
//           </div>
//           <div className='Col-lg-2 card_photo'>
//             <div className='img_Photo_Team'>
//               <img className="img_admin_pic" src={yachana} alt="" />
//               <p className='Photo_Name'>Yachana Meshram</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className='Row Poster_about'>
//         <div className='left_Side col-lg-6'>
//           <img
//             className='img_Poster_banner'
//             src={image2}
//             alt=""
//           />
//         </div>
//         <div className='right_Side col-lg-6'>
//           <h2 className='h2right_SideAbout'>A Digital Haven for Book Lovers</h2>
//           <p className='pright_SideAbout'>Book-Shelf is your ultimate online destination for discovering and purchasing books. 
//             Our platform offers a rich collection of books, easy-to-use cart management, and personalized recommendations. 
//             Book-Shelf brings the joy of reading right to your fingertips.
//             <br/><br/>Book-Shelf goes beyond just offering a vast array of books; it’s designed to cater to both avid readers and casual book shoppers alike. 
//             Whether you're searching for the latest bestsellers, timeless classics, our intuitive platform provides seamless navigation and tailored suggestions based on your preferences.</p>
//         </div>
//       </div>
//       <br />

//       <div className='Row About_Row_Design'>
//         <div className='Row About_BannerDesign'>
//           <img
//             className="img_About_Banner1"
//             src={image3}
//             alt=""
//             style={{ width: '100%', height: '400px', objectFit: 'cover' }} // Inline style applied here
//           />
//           <div className='About_banner_text2'>
//             <h1 className='h1_About_banner_text1'>Crafting a Personalized Reading Experience</h1>
//             <p className='p_About_banner_text1 col-lg-5'> At Book-Shelf, we believe every book tells a story. 
//               Our platform is designed to make finding and purchasing your next read simple and enjoyable. Explore our curated collections, get personalized recommendations, and manage your orders effortlessly.</p>
//           </div>
//         </div>
//       </div>
//       <br />

//       <Footer />
//     </>
//   );
// }

// export default About;



// // import React from 'react'
// // import image1 from "../images/bbanner1.jpg"
// // import image2 from "../images/bbanner2.jpg"
// // import image3 from "../images/bbanner3.jpg"
// // // import image4 from "../images/img-9.jpg"
// // import aryan from "../images/Aryan.jpeg"
// // import shreyash from "../images/Shreyash.png"
// // import rohit from "../images/Rohit.jpeg"
// // import srishti from "../images/Srishti.jpg"
// // import yachana from "../images/Yachana.jpeg"

// // import  Footer  from '../components/Footer'
// // const About = () => {
// //   return (
// //     <>
// //       <div className='Row About_Row'>
// //         <div className='Row About_Banner'>
// //           <img className="img_About_Banner1" src={image1} alt="Books Banner" />
// //           <div className='About_banner_text1'>
// //             <h1 className='h1_About_banner_text'>Welcome To Our Store</h1>
// //             <h4 className='h4_About_banner_text'>Discover your next great read with Book-Shelf, where book enthusiasts find their perfect match. </h4>
// //             <p className='p_About_banner_text'> Dive into our extensive collection and enjoy a seamless shopping experience.</p>

// //           </div>

// //         </div>
// //       </div>
// //       <h1 className='headingAboutText'>
// //           About Our Project
// //       </h1>
// //       <h3 className='headingAboutText'>
// //         We Are Team 15
// //       </h3>

// //       <div className='Row AboutUs_photo_section1'>
// //         <div className='Row Photo_display'>
// //           <div className='Col-lg-2 card_photo'>
// //             <div className='img_Photo_Team'>
// //             <img className="img_admin_pic" src={aryan} alt=""/>
// //               <p className='Photo_Name'>Aryan Garate</p>
// //             </div>
// //           </div>

// //           <div className='Col-lg-2 card_photo'>
// //             <div className='img_Photo_Team'>
// //             <img className="img_admin_pic" src={shreyash} alt=""/>
// //               <p className='Photo_Name'>Shreyash Raut</p>
// //             </div>
// //           </div>

// //           <div className='Col-lg-2 card_photo'>
// //             <div className='img_Photo_Team'>
// //             <img className="img_admin_pic" src={rohit} alt=""/>
// //               <p className='Photo_Name'>Rohit Mhatre</p>
// //             </div>
// //           </div>

// //           <div className='Col-lg-2 card_photo'>
// //             <div className='img_Photo_Team'>
// //             <img className="img_admin_pic" src={srishti} alt=""/>
// //               <p className='Photo_Name'>Srishti Ravi</p>
// //             </div>
// //           </div>

// //           <div className='Col-lg-2 card_photo'>
// //             <div className='img_Photo_Team'>
// //             <img className="img_admin_pic" src={yachana} alt=""/>
// //               <p className='Photo_Name'>Yachana Meshram</p>
// //             </div>
// //           </div>
// //         </div>

// //       </div>

// //       <div className=' Row Poster_about'>
// //           <div  className='left_Side col-lg-6'>
// //             <img className='img_Poster_banner' src={image2} alt=""/>
// //           </div>
// //           <div  className='right_Side col-lg-6'>
// //           <h2  className='h2right_SideAbout '>A Digital Haven for Book Lovers</h2>
// //           <p  className='pright_SideAbout '>Book-Shelf is your ultimate online destination for discovering and purchasing books. 
// //             Our platform offers a rich collection of books, easy-to-use cart management, and personalized recommendations. 
// //             With features like JWT authentication for secure access, real-time chat support, and an engaging UI, Book-Shelf brings the joy of reading right to your fingertips.</p>

// //           </div>
// //       </div>
// //       <br/>

// //       <div className='Row About_Row_Design'>
// //         <div className='Row About_BannerDesign'>
// //           <img className="img_About_Banner1" src={image3} alt="" />
// //           <div className='About_banner_text2'>
// //             <h1 className='h1_About_banner_text1'>Crafting a Personalized Reading Experience</h1>
// //             <p className='p_About_banner_text1 col-lg-5'> At Book-Shelf, we believe every book tells a story. 
// //               Our platform is designed to make finding and purchasing your next read simple and enjoyable. Explore our curated collections, get personalized recommendations, and manage your orders effortlessly.</p>

// //           </div>

// //         </div>
// //       </div>


// //       <br/>
      
      

// //       {/* <div className='container_image'>
// //         <div className='box_photo'>
// //           <img  src={image4} alt=""/>
// //         </div>
// //         <div className='box_photo'>
// //           <img  src={image4} alt=""/>
// //         </div>
// //         <div className='box_photo'>
// //           <img  src={image4} alt=""/>
// //         </div>
// //         <div className='box_photo'>
// //           <img  src={image4} alt=""/>
// //         </div>
// //         <div className='box_photo'>
// //           <img  src={image4} alt=""/>
// //         </div>
// //       </div> */}
// //       <Footer/>

// //     </>

// //   )
// // }

// // export default About;