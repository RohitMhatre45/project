import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Product from "./Product";
import swal from 'sweetalert';
import BannerVideo from "./VidCarousel";
import PageNextIcon from '@rsuite/icons/PageNext';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import Footer from "./Footer";

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const { pcat, subcat } = useParams();
  const state = useSelector((state) => state);
  const [item, setItem] = useState({});
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showDialog, setShowDialog] = useState("modal fade");
  const [display, setDisplay] = useState("none");

  const showModal = (prod) => {
    console.log("Child call parent");
    setShowDialog("modal fade show");
    setDisplay("block");
    setItem(prod);
  };

  const checkItem = (prodid) => {
    return state.cart.findIndex((x) => x.prodid === prodid) < 0;
  };

  const closeDialog = () => {
    setShowDialog("modal fade");
    setDisplay("none");
  };

  const loadDataFromServer = (page = 0, pagesize = 8) => {
    axios.get("http://localhost:8080/api/products/paginated?page=" + page + "&pagesize=" + pagesize)
      .then(resp => {
        console.log(resp.data.data.total);
        setProducts(resp.data.data.plist);
        setTotalPage(Math.ceil(resp.data.data.total / pagesize));
        console.log(products);
      });
  };

  useEffect(() => {
    console.log(pcat, subcat);
    if (pcat !== undefined) {
      axios.get("http://localhost:8080/api/products/cats?cat=" + pcat + "&subcat=" + subcat)
        .then(resp => {
          console.log(resp.data);
          setProducts(resp.data.data);
          console.log(products);
        });
    } else {
      loadDataFromServer();
    }
  }, [pcat, subcat]);

  const addToCart = (item) => {
    if (sessionStorage.getItem("userid") == null) {
      swal({
        title: "Warning",
        text: "Please login first to buy product",
        icon: "warning",
        button: "ok",
      });
      history.push("/clogin");
    } else if (sessionStorage.getItem("role") !== "customer") {
      swal({
        title: "Warning",
        text: "Only customers can buy products",
        icon: "warning",
        button: "ok",
      });
    } else {
      if (checkItem(item.prodid) && qty < 4) {
        showModal();
        setDisplay("none");
        setShowDialog("modal fade");
        item.qty = qty;
        dispatch({ type: 'AddItem', payload: item });
        swal({
          title: "Success",
          text: "Item added to the cart successfully",
          icon: "success",
          button: "ok",
        });
      } else {
        swal({
          title: "Warning",
          text: "Maximum quantity exceeded or item already in the cart",
          icon: "warning",
          button: "ok",
        });
      }
    }
  };

  const handlePageClick = ({ selected: selectedPage }) => {
    loadDataFromServer(selectedPage);
  };

  return (
    <div className="all-product-page">
      <div className="all-product-content">
        <div className="luxury-main-container">
          <div className="luxury-huge-text">Your Gateway</div>
          <div className="luxury-huge-text">to a World of Stories</div>
          <div className="luxury-space-block-mini"></div>
          <div className="luxury-normal-text">Explore, Read, Repeat</div>
          <a href="#" className="luxury-explore-link">For all the Bookworms!</a>
        </div>
        <div className="luxury-space-block"></div>

        <BannerVideo />
        <div className="luxury-space-block"></div>

        <div className="container-fluid" style={{ width: "95%" }}>
          <div className="card bg-transparent rounded">
            <div className="card-body">
              <ReactPaginate
                previousLabel={<PagePreviousIcon />}
                nextLabel={<PageNextIcon />}
                containerClassName={"pagination"}
                pageCount={totalPage}
                onPageChange={handlePageClick}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"} />
              <div className="luxury-space-block"></div>
              <div className="row">
                {products.map((x, index) => (
                  <React.Fragment key={x.prodid}>
                    <ProductCard product={x} showModal={showModal} />
                    {index !== products.length - 1 && <div className="empty-space"></div>}
                  </React.Fragment>
                ))}
              </div>
              <div className="luxury-space-block"></div>
              <div className="luxury-space-block"></div>
            </div>
          </div>
          {display == "block" ? (
            <div className={showDialog} style={{ zIndex: "1000", display: display }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5>Add to Cart</h5>
                    <button onClick={closeDialog} className="close">&times;</button>
                  </div>
                  <div className="modal-body">
                    <div className="d-flex">
                      <img src={"http://localhost:8080/" + item.photo} style={{ width: "200px" }} alt={item.pname} />
                      <div className="ml-3">
                        <h4 className="p-2 text-primary">{item.pname}</h4>
                        <h5 className="px-2">Author: {item.author}</h5>
                        <h5 className="px-2">Category: {item.pcat}</h5>
                        <h5 className="px-2">Seller: {item.sellerName}</h5>
                        <h5 className="px-2">Price: &#8377; {item.price}</h5>
                        <input type="number" min="1" value={qty} onChange={e => setQty(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button onClick={e => addToCart(item)} className="btn btn-warning btn-sm">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>) : ""}
        </div>
        <Footer />
      </div>
    </div>
  );
}

const ProductCard = ({ product, showModal }) => {
  return (
    <div className="col-md-3 mb-3">
      <div className="card product-card bg-white text-black">
        <img src={"http://localhost:8080/" + product.photo} className="card-img-top" alt={product.pname} />
        <div className="card-body">
          <h5 className="card-title">{product.pname}</h5>
          <p className="card-text"><span>Author:</span> {product.author}</p>
          <p className="card-text"><span>Category:</span> {product.pcat}</p>
          <p className="card-text"><span>Seller:</span> {product.sellerName}</p>
          <p className="card-text"><span>Price:</span> &#8377; {product.price}</p>
          <button className="btn btn-warning btn-sm" onClick={() => showModal(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
// import Product from "./Product";
// import swal from 'sweetalert';
// import BannerVideo from "./VidCarousel"
// import PageNextIcon from '@rsuite/icons/PageNext';
// import PagePreviousIcon from '@rsuite/icons/PagePrevious';
// import Footer from "./Footer";
// import React from "react";

// function AllProduct() {
//   const [products, setProducts] = useState([]);
//   const [totalPage, setTotalPage] = useState(0);
//   const { pcat, subcat } = useParams();
//   const state = useSelector((state) => state);
//   const [item, setItem] = useState({});
//   const [qty, setQty] = useState(1);
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const [showDialog, setShowDialog] = useState("modal fade");
//   const [display, setDisplay] = useState("none");

//   const showModal = (prod) => {
//     console.log("Child call parent");
//     setShowDialog("modal fade show");
//     setDisplay("block");
//     setItem(prod);
//   };

//   const checkItem = (prodid) => {
//     return state.cart.findIndex((x) => x.prodid === prodid) < 0;
//   };

//   const closeDialog = () => {
//     setShowDialog("modal fade");
//     setDisplay("none");
//   };

//   const loadDataFromServer = (page = 0, pagesize = 8) => {
//     axios.get("http://localhost:8080/api/products/paginated?page=" + page + "&pagesize=" + pagesize)
//       .then(resp => {
//         console.log(resp.data.data.total);
//         setProducts(resp.data.data.plist);
//         setTotalPage(Math.ceil(resp.data.data.total / pagesize));
//         console.log(products);
//       });
//   };

//   useEffect(() => {
//     console.log(pcat, subcat);
//     if (pcat !== undefined) {
//       axios.get("http://localhost:8080/api/products/cats?cat=" + pcat + "&subcat=" + subcat)
//         .then(resp => {
//           console.log(resp.data);
//           setProducts(resp.data.data);
//           console.log(products);
//         });
//     }
//     else {
//       loadDataFromServer();
//     }
//   }, [pcat, subcat]);

//   const addToCart = (item) => {
//     if (sessionStorage.getItem("userid") == null) {
//       swal({
//         title: "Warning",
//         text: "Please login first to buy product",
//         icon: "warning",
//         button: "ok",
//       });
//       history.push("/clogin");
//     }
//     else if (sessionStorage.getItem("role") !== "customer") {
//       swal({
//         title: "Warning",
//         text: "Only customers can buy products",
//         icon: "warning",
//         button: "ok",
//       });
//     }
//     else {
//       if (checkItem(item.prodid) && qty < 4) {
//         showModal();
//         setDisplay("none");
//         setShowDialog("modal fade");
//         item.qty = qty;
//         dispatch({ type: 'AddItem', payload: item });
//         swal({
//           title: "Success",
//           text: "Item added to the cart successfully",
//           icon: "success",
//           button: "ok",
//         });
//       }
//       else {
//         swal({
//           title: "Warning",
//           text: "Maximum quantity exceeded or item already in the cart",
//           icon: "warning",
//           button: "ok",
//         });
//       }
//     }
//   };

//   const handlePageClick = ({ selected: selectedPage }) => {
//     loadDataFromServer(selectedPage);
//   };

//   return (
//     <>
//       <div className="luxury-main-container">
//         <div className="luxury-huge-text">Your Gateway</div>
//         <div className="luxury-huge-text">to a World of Stories</div>
//         <div className="luxury-space-block-mini"></div>
//         <div className="luxury-normal-text">Explore, Read, Repeat</div>
//         <a href="#" className="luxury-explore-link">For all the Bookworms!</a>
//       </div>
//       <div className="luxury-space-block"></div>

//       <BannerVideo />
//       <div className="luxury-space-block"></div>

//       <div className="container-fluid" style={{ width: "95%" }}>
//         <div className="card bg-transparent rounded">
//           <div className="card-body">
//             <ReactPaginate
//               previousLabel={<PagePreviousIcon />}
//               nextLabel={<PageNextIcon />}
//               containerClassName={"pagination"}
//               pageCount={totalPage}
//               onPageChange={handlePageClick}
//               previousLinkClassName={"pagination__link"}
//               nextLinkClassName={"pagination__link"}
//               disabledClassName={"pagination__link--disabled"}
//               activeClassName={"pagination__link--active"} />
//               <div className="luxury-space-block"></div>
//             <div className="row">
            
//             {products.map((x, index) => (
//   <React.Fragment key={x.prodid}>
//     <ProductCard product={x} showModal={showModal} />
//     {index !== products.length - 1 && <div className="empty-space"></div>}
//   </React.Fragment>
// ))}
//             </div>
//             <div className="luxury-space-block"></div>
//             <div className="luxury-space-block"></div>
            
//           </div>
//         </div>
//         {display == "block" ? (
//           <div className={showDialog} style={{ zIndex: "1000", display: display }}>
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5>Add to Cart</h5>
//                   <button onClick={closeDialog} className="close">&times;</button>
//                 </div>
//                 <div className="modal-body">
//                   <div className="d-flex">
//                     <img src={"http://localhost:8080/" + item.photo} style={{ width: "200px" }} alt={item.pname} />
//                     <div className="ml-3">
//                       <h4 className="p-2 text-primary">{item.pname}</h4>
//                       {/* <h5 className="px-2">Brand: {item.brand}</h5> */}
//                       <h5 className="px-2">Author: {item.author}</h5>
//                       <h5 className="px-2">Category: {item.pcat}</h5>
//                       <h5 className="px-2">Seller: {item.sellerName}</h5>
//                       <h5 className="px-2">Price: &#8377; {item.price}</h5>
//                       <input type="number" min="1" value={qty} onChange={e => setQty(e.target.value)} />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button onClick={e => addToCart(item)} className="btn btn-warning btn-sm">Add to Cart</button>
//                 </div>
//               </div>
//             </div>
//           </div>) : ""}
//       </div>
//       <Footer />
//     </>
//   );
// }

// // const ProductCard = ({ product, showModal }) => {
// //   return (
// //     <div className="col-md-3 mb-3">
// //       <div className="card bg-white text-black">
// //         <img src={"http://localhost:8080/" + product.photo} className="card-img-top" alt={product.pname} />
// //         <div className="card-body">
// //           <h5 className="card-title text-warning">{product.pname}</h5>
// //           {/* <p className="card-text">Brand: {product.brand}</p> */}
// //           <p className="card-text">Author: {product.author}</p>
// //           <p className="card-text">Category: {product.pcat}</p>
// //           <p className="card-text">Seller: {product.sellerName}</p>
// //           <p className="card-text">Price: &#8377; {product.price}</p>
// //           <button className="btn btn-warning btn-sm" onClick={() => showModal(product)}>Add to Cart</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // const ProductCard = ({ product, showModal }) => {
// //   return (
// //     <div className="col-md-3 mb-3">
// //       <div className="card product-card bg-white text-black">
// //         <img src={"http://localhost:8080/" + product.photo} className="card-img-top" alt={product.pname} />
// //         <div className="card-body">
// //           <h5 className="card-title text-warning">{product.pname}</h5>
// //           <p className="card-text">Author: {product.author}</p>
// //           <p className="card-text">Category: {product.pcat}</p>
// //           <p className="card-text">Seller: {product.sellerName}</p>
// //           <p className="card-text">Price: &#8377; {product.price}</p>
// //           <button className="btn btn-warning btn-sm" onClick={() => showModal(product)}>Add to Cart</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// const ProductCard = ({ product, showModal }) => {
//   return (
//     <div className="col-md-3 mb-3">
//       <div className="card product-card bg-white text-black">
//         <img src={"http://localhost:8080/" + product.photo} className="card-img-top" alt={product.pname} />
//         <div className="card-body">
//           {/* <h5 className="card-title text-warning">{product.pname}</h5> */}
//           <h5 className="card-title">{product.pname}</h5>
//           <p className="card-text"><span>Author:</span> {product.author}</p>
//           <p className="card-text"><span>Category:</span> {product.pcat}</p>
//           <p className="card-text"><span>Seller:</span> {product.sellerName}</p>
//           <p className="card-text"><span>Price:</span> &#8377; {product.price}</p>
//           <button className="btn btn-warning btn-sm" onClick={() => showModal(product)}>Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllProduct;
