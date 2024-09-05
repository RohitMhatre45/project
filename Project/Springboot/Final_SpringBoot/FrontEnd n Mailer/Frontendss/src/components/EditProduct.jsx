import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import productvalidation from "./productvalidation";
import swal from "sweetalert";

function EditProduct() {
  const sellerid = sessionStorage.getItem("id");
  const { prodid } = useParams();
  const [product, setProduct] = useState({
    prodid: prodid,
    pname: "",
    pcat: "",
    price: "",
    subcat: "",
    author: "", // Updated to author
    sellerId: sellerid,
  });

  const [errors, setErrors] = useState({});
  const [subcategories, setSubcategories] = useState([]); // State to hold subcategories
  const history = useHistory();

  const categories = {
    Fiction: ["Mystery-Thriller", "Science-Fiction", "Fantasy"],
    "Non-Fiction": ["Biography-Autobiography", "Self-Help"],
    "Childrens-Books": ["Picture-Books", "Early-Readers"],
  };

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProduct({ ...product, pcat: selectedCategory, subcat: "" });
    setSubcategories(categories[selectedCategory] || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = productvalidation(product);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .put("http://localhost:8080/api/products/" + prodid, product)
        .then((resp) => {
          swal({
            title: "Success",
            text: "Product updated successfully!",
            icon: "success",
            button: "OK",
          });
          history.push("/myproducts");
        })
        .catch((error) => {
          console.log("Error", error);
          swal({
            title: "Error",
            text: "Error while updating product",
            icon: "error",
            button: "OK",
          });
        });
    }
  };

  useEffect(() => {
    // Fetch product data for editing
    axios.get("http://localhost:8080/api/products/" + prodid)
      .then((resp) => {
        console.log(resp.data.data);
        setProduct(resp.data.data);
        setSubcategories(categories[resp.data.data.pcat] || []);
      });
  }, [prodid]);

  return (
    <div className="container">
      <div className="card shadow bg-dark text-white">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6 mx-auto">
              <h4 className="text-center p-2">Edit Product Form</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Product Name</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="pname"
                      value={product.pname}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.pname && (
                      <small className="text-danger float-right">{errors.pname}</small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Category</label>
                  <div className="col-sm-8">
                    <select
                      name="pcat"
                      value={product.pcat}
                      onChange={handleCategoryChange}
                      className="form-control"
                    >
                      <option value="">Select Category</option>
                      {Object.keys(categories).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.pcat && (
                      <small className="text-danger float-right">{errors.pcat}</small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Sub Category</label>
                  <div className="col-sm-8">
                    <select
                      name="subcat"
                      value={product.subcat}
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option value="">Select Sub Category</option>
                      {subcategories.map((subcat) => (
                        <option key={subcat} value={subcat}>
                          {subcat}
                        </option>
                      ))}
                    </select>
                    {errors.subcat && (
                      <small className="text-danger float-right">{errors.subcat}</small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Price</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.price && (
                      <small className="text-danger float-right">{errors.price}</small>
                    )}
                  </div>
                </div>
                <div className="form-group form-row">
                  <label className="col-sm-4 form-control-label">Author</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      name="author"
                      value={product.author}
                      onChange={handleInput}
                      className="form-control"
                    />
                    {errors.author && (
                      <small className="text-danger float-right">{errors.author}</small>
                    )}
                  </div>
                </div>
                <button type="submit" className="btn btn-warning float-right">
                  Update Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;



// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import productvalidation from "./productvalidation";
// import swal from "sweetalert";

// function EditProduct() {
//   const sellerid = sessionStorage.getItem("id");
//   const { prodid } = useParams();
//   const [product, setProduct] = useState({
//     prodid: prodid,
//     pname: "",
//     pcat: "",
//     price: "",
//     subcat: "",
//     author: "", // Updated to author
//     sellerId: sellerid,
//   });

//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [subcategories, setSubcategories] = useState([]); // State to hold subcategories

//   const history = useHistory();

//   const categories = {
//     Fiction: ["Mystery & Thriller", "Science Fiction", "Fantasy"],
//     "Non-Fiction": ["Biography & Autobiography", "Self-Help"],
//     "Children's Books": ["Picture Books", "Early Readers"],
//   };

//   const handleInput = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleCategoryChange = (e) => {
//     const selectedCategory = e.target.value;
//     setProduct({ ...product, pcat: selectedCategory, subcat: "" });
//     setSubcategories(categories[selectedCategory] || []);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors(productvalidation(product));
//     setSubmitted(true);
//   };

//   useEffect(() => {
//     // Fetch product data for editing
//     axios.get("http://localhost:8080/api/products/" + prodid).then((resp) => {
//       console.log(resp.data.data);
//       setProduct(resp.data.data);
//       setSubcategories(categories[resp.data.data.pcat] || []);
//     });

//     if (Object.keys(errors).length === 0 && submitted) {
//       axios
//         .put("http://localhost:8080/api/products/" + prodid, product)
//         .then((resp) => {
//           let result = resp.data.data;
//           console.log(result);
//           swal({
//             title: "Success",
//             text: "Product Updated successfully!",
//             icon: "success",
//             button: "ok",
//           });
//           history.push("/myproducts");
//         })
//         .catch((error) => {
//           console.log("Error", error);
//           swal({
//             title: "Error",
//             text: "Error while updating product",
//             icon: "error",
//             button: "ok",
//           });
//         });
//     }
//   // }, [errors, prodid, product, history]);
// }, [prodid]);

//   return (
//     <div className="container">
//       <div className="card shadow bg-dark text-white">
//         <div className="card-body">
//           <div className="row">
//             <div className="col-sm-6 mx-auto">
//               <h4 className="text-center p-2">Edit Product Form</h4>
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group form-row">
//                   <label className="col-sm-4 form-control-label">Product Name</label>
//                   <div className="col-sm-8">
//                     <input
//                       type="text"
//                       name="pname"
//                       value={product.pname}
//                       onChange={handleInput}
//                       className="form-control"
//                     />
//                     {errors.pname && (
//                       <small className="text-danger float-right">{errors.pname}</small>
//                     )}
//                   </div>
//                 </div>
//                 <div className="form-group form-row">
//                   <label className="col-sm-4 form-control-label">Category</label>
//                   <div className="col-sm-8">
//                     <select
//                       name="pcat"
//                       value={product.pcat}
//                       onChange={handleCategoryChange}
//                       className="form-control"
//                     >
//                       <option value="">Select Category</option>
//                       {Object.keys(categories).map((category) => (
//                         <option key={category} value={category}>
//                           {category}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.pcat && (
//                       <small className="text-danger float-right">{errors.pcat}</small>
//                     )}
//                   </div>
//                 </div>
//                 <div className="form-group form-row">
//                   <label className="col-sm-4 form-control-label">Sub Category</label>
//                   <div className="col-sm-8">
//                     <select
//                       name="subcat"
//                       value={product.subcat}
//                       onChange={handleInput}
//                       className="form-control"
//                     >
//                       <option value="">Select Sub Category</option>
//                       {subcategories.map((subcat) => (
//                         <option key={subcat} value={subcat}>
//                           {subcat}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.subcat && (
//                       <small className="text-danger float-right">{errors.subcat}</small>
//                     )}
//                   </div>
//                 </div>
//                 <div className="form-group form-row">
//                   <label className="col-sm-4 form-control-label">Price</label>
//                   <div className="col-sm-8">
//                     <input
//                       type="number"
//                       name="price"
//                       value={product.price}
//                       onChange={handleInput}
//                       className="form-control"
//                     />
//                     {errors.price && (
//                       <small className="text-danger float-right">{errors.price}</small>
//                     )}
//                   </div>
//                 </div>
//                 <div className="form-group form-row">
//                   <label className="col-sm-4 form-control-label">Author</label>
//                   <div className="col-sm-8">
//                     <input
//                       type="text"
//                       name="author"
//                       value={product.author}
//                       onChange={handleInput}
//                       className="form-control"
//                     />
//                     {errors.author && (
//                       <small className="text-danger float-right">{errors.author}</small>
//                     )}
//                   </div>
//                 </div>

//                 <button className="btn btn-warning float-right">
//                   Update Product
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditProduct;


// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { useHistory, useParams } from "react-router-dom";
// // import productvalidation from "./productvalidation";
// // import swal from "sweetalert";

// // function EditProduct() {
// //   console.log("Edit product page");
// //   const sellerid = sessionStorage.getItem("id");
// //   const { prodid } = useParams();
// //   const [product, setProduct] = useState({
// //     prodid: prodid,
// //     pname: "",
// //     pcat: "",
// //     subcat: "",
// //     price: "",
// //     // brand: "",
// //     author: "",
// //     sellerId: sellerid,
// //   });

// //   const [errors, setErrors] = useState({});
// //   const [submitted, setSubmitted] = useState(false);
// //   const history = useHistory();

// //   const handleInput = (e) => {
// //     setProduct({ ...product, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setErrors(productvalidation(product));
// //     setSubmitted(true);
// //   };

// //   useEffect(() => {
// //     console.log(errors);

// //     axios.get("http://localhost:8080/api/products/" + prodid).then((resp) => {
// //       console.log(resp.data.data);
// //       setProduct(resp.data.data);
// //     });

// //     if (Object.keys(errors).length === 0 && submitted) {
// //       console.log(product);
// //       axios
// //         .put("http://localhost:8080/api/products/" + prodid, product)
// //         .then((resp) => {
// //           let result = resp.data.data;
// //           console.log(result);
// //           swal({
// //             title: "Success",
// //             text: "Product Updated successfully!",
// //             icon: "success",
// //             button: "ok",
// //           });
// //           history.push("/myproducts");
// //         })
// //         .catch((error) => {
// //           console.log("Error", error);
// //           swal({
// //             title: "Error",
// //             text: "Error while updating product",
// //             icon: "error",
// //             button: "ok",
// //           });
// //         });
// //     }
// //   }, [errors]);
// //   return (
// //     <div className="container-fluid text-white">
// //       <div className="row">
// //         {/* <div class="col-sm-3">
// //                             <img width="300" src={product.photo} />
// //                         </div>  */}
// //         <div className="col-sm-9">
// //           <h4 className="text-center p-2">
// //             Edit Product Form (Product ID : {prodid})
// //           </h4>
// //           <form onSubmit={handleSubmit}>
// //             <div className="form-group form-row">
// //               <label className="col-sm-4 form-control-label">
// //                 Product Name
// //               </label>
// //               <div className="col-sm-8">
// //                 <input
// //                   type="text"
// //                   name="pname"
// //                   value={product.pname}
// //                   onChange={handleInput}
// //                   className="form-control"
// //                 />
// //                 {errors.pname && (
// //                   <small className="text-danger float-right">
// //                     {errors.pname}
// //                   </small>
// //                 )}
// //               </div>
// //             </div>
// //             <div className="form-group form-row">
// //               <label className="col-sm-4 form-control-label">Category</label>
// //               <div className="col-sm-8">
// //                 <select
// //                   name="pcat"
// //                   value={product.pcat}
// //                   onChange={handleInput}
// //                   className="form-control"
// //                 >
// //                   <option value="">Select Category</option>
// //                   <option>Men</option>
// //                   <option>Women</option>
// //                 </select>
// //                 {errors.pcat && (
// //                   <small className="text-danger float-right">
// //                     {errors.pcat}
// //                   </small>
// //                 )}
// //               </div>
// //             </div>
// //             <div className="form-group form-row">
// //               <label className="col-sm-4 form-control-label">
// //                 Sub Category
// //               </label>
// //               <div className="col-sm-8">
// //                 <select
// //                   name="subcat"
// //                   value={product.subcat}
// //                   onChange={handleInput}
// //                   className="form-control"
// //                 >
// //                   <option value="">Select Sub Category</option>
// //                   <option>Upper Wear</option>
// //                   <option>Bottom Wear</option>
// //                 </select>
// //                 {errors.subcat && (
// //                   <small className="text-danger float-right">
// //                     {errors.subcat}
// //                   </small>
// //                 )}
// //               </div>
// //             </div>
// //             <div className="form-group form-row">
// //               <label className="col-sm-4 form-control-label">Price</label>
// //               <div className="col-sm-8">
// //                 <input
// //                   type="number"
// //                   name="price"
// //                   value={product.price}
// //                   onChange={handleInput}
// //                   className="form-control"
// //                 />
// //                 {errors.price && (
// //                   <small className="text-danger float-right">
// //                     {errors.price}
// //                   </small>
// //                 )}
// //               </div>
// //             </div>
// //             <div className="form-group form-row">
// //               <label className="col-sm-4 form-control-label">Brand</label>
// //               <div className="col-sm-8">
// //                 <input
// //                   type="text"
// //                   name="brand"
// //                   value={product.brand}
// //                   onChange={handleInput}
// //                   className="form-control"
// //                 />
// //                 {errors.brand && (
// //                   <small className="text-danger float-right">
// //                     {errors.brand}
// //                   </small>
// //                 )}
// //               </div>
// //             </div>

// //             <button className="btn btn-warning float-right">
// //               Update Product
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default EditProduct;
