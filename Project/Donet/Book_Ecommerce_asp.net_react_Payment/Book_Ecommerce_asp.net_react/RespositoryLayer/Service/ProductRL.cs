using Microsoft.EntityFrameworkCore;
using Model;
using RespositoryLayer.ContextDB;
using RespositoryLayer.CustomException;
using RespositoryLayer.Entity;
using RespositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RespositoryLayer.Service
{
    public class ProductRL : IProductRL
    {
        private readonly BookEcommerceContext _context;

        public ProductRL(BookEcommerceContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public ProductEntity CreateProduct(ProductDTO model)
        {
            var category = _context.categories.Find(model.CategoryId);
            if (category == null)
            {
                throw new ProductException($"Category id {model.CategoryId} does not exist");
            }

            var user = _context.users.Find(model.UserId);
            if (user == null)
            {
                throw new ProductException($"User id {model.UserId} does not exist");
            }

            var product = new ProductEntity
            {
                ProductName = model.ProductName,
                ProductDescription = model.ProductDescription,
                ProductPrice = model.ProductPrice,
                DiscountPrice = model.DiscountPrice,
                StockQuantity = model.StockQuantity,
                ImageUrl = model.ImageUrl,
                CategoryId = model.CategoryId,
                UserId = model.UserId, // Set the UserId from the model
                CreatedAt = DateTime.Now,
            };

            _context.products.Add(product);
            _context.SaveChanges();

            return product;
        }

        public List<ProductEntity> GetAllProducts()
        {
            var productList = _context.products
                                       .Include(p => p.Category)
                                       .Include(p => p.User) // Include the User entity
                                       .ToList();
            if (productList.Count == 0)
            {
                throw new ProductException("No products found");
            }
            return productList;
        }

        public ProductEntity UpdateProduct(int id, ProductDTO model)
        {
            var product = _context.products.Find(id);
            if (product == null)
            {
                throw new ProductException($"Product with ID {id} does not exist");
            }

            var category = _context.categories.Find(model.CategoryId);
            if (category == null)
            {
                throw new ProductException($"Category with ID {model.CategoryId} does not exist");
            }

            var user = _context.users.Find(model.UserId);
            if (user == null)
            {
                throw new ProductException($"User id {model.UserId} does not exist");
            }

            product.ProductName = model.ProductName;
            product.ProductDescription = model.ProductDescription;
            product.ProductPrice = model.ProductPrice;
            product.DiscountPrice = model.DiscountPrice;
            product.StockQuantity = model.StockQuantity;
            product.ImageUrl = model.ImageUrl;
            product.CategoryId = model.CategoryId;
            product.UserId = model.UserId; // Update the UserId
            product.UpdatedAt = DateTime.Now;

            _context.products.Update(product);
            _context.SaveChanges();

            return product;
        }

        public ProductEntity GetProductById(int id)
        {
            var product = _context.products
                                  .Include(p => p.Category)
                                  .Include(p => p.User) // Include the User entity
                                  .FirstOrDefault(p => p.ProductId == id);
            if (product == null)
            {
                throw new ProductException($"Product with ID {id} does not exist");
            }
            return product;
        }

        public ProductEntity DeleteProduct(int id)
        {
            var product = _context.products.Find(id);
            if (product == null)
            {
                throw new ProductException($"Product with ID {id} does not exist");
            }

            _context.products.Remove(product);
            _context.SaveChanges();

            return product;
        }
    }

}
