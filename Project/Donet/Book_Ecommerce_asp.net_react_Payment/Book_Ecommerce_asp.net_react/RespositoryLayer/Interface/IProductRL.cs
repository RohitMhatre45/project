using Model;
using RespositoryLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RespositoryLayer.Interface
{
    public interface IProductRL 
    {
        public ProductEntity CreateProduct(ProductDTO model);
        public List<ProductEntity> GetAllProducts();

        public ProductEntity UpdateProduct(int id, ProductDTO model);

        public ProductEntity GetProductById(int id);
        public ProductEntity DeleteProduct(int id);
    }
}
