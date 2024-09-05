using BusinessLayer.Interface;
using Model;
using RespositoryLayer.CustomException;
using RespositoryLayer.Entity;
using RespositoryLayer.Interface;
using RespositoryLayer.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Service
{

    public class ProductBL : IProductBL
    {
        private readonly IProductRL productRL;

        public ProductBL(IProductRL productRL)
        {
            this.productRL = productRL;
        }

        public ProductEntity CreateProduct(ProductDTO model)
        {
            try
            {
                return productRL.CreateProduct(model);
            }
            catch (ProductException)
            {
                throw;
            }
        }

        public List<ProductEntity> GetAllProducts()
        {
            try
            {
                return productRL.GetAllProducts();
            }
            catch (ProductException)
            {
                throw;
            }
        }

        public ProductEntity UpdateProduct( int id  , ProductDTO model)
        {
            try
            {
                return productRL.UpdateProduct( id  , model);
            }
            catch (ProductException)
            {
                throw;
            }
        }


        public ProductEntity GetProductById(int id)
        {
            try
            {
                return productRL.GetProductById(id);
            }
            catch (ProductException)
            {
                throw;
            }
        }

      


        public ProductEntity DeleteProduct(int id)
        {
            try
            {
               return productRL.DeleteProduct(id);
            }
            catch (ProductException)
            {
                throw;
            }
        }
    }
}
