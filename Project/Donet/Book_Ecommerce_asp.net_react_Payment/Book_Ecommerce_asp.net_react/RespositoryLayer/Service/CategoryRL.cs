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
   
    public class CategoryRL : ICategoryRL
    {
        public BookEcommerceContext _context;

        public CategoryRL(BookEcommerceContext context)
        {
            //_context = context;
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }



        public Category CreateCategory(CategoryDTO model)
        {

            Category categories = new Category()
            {
                CategoryName = model.CategoryName
            };
            _context.Add(categories);
            _context.SaveChanges();
            return categories;
        }

        public List<Category> GetAllCategories() {

            try
            {
                var CategoryList = _context.categories.ToList();
                if (CategoryList.Count == 0)
                {
                    throw new CategoryException("List not found");
                }
                return CategoryList;
            }
            catch (Exception)
            {
                throw;
            }

        }

        public Category UpdateCategory(int id, CategoryDTO model)
        {
            try
            {
                var category = _context.categories.FirstOrDefault(x => x.CategoryId == id);
                if (category == null)
                {
                    throw new CategoryException($"Category Id : {id} does not exist ");

                }

                category.CategoryName = model.CategoryName;

                _context.Update(category);
                _context.SaveChanges();

                return category;

            }
            catch (Exception)
            {

                throw;

            }

        }


        public Category DeleteCategory(int id)
        {
            try
            {
                var category = _context.categories.FirstOrDefault(x => x.CategoryId == id);
                if (category == null)
                {
                    throw new CategoryException($"Category Id : {id} does not exist ");

                }

               

                _context.Remove(category);
                _context.SaveChanges();

                return category;

            }
            catch (Exception)
            {

                throw;

            }

        }

        public Category GetCategoryId(int id)
        {
            try
            {
                var category = _context.categories.FirstOrDefault(x => x.CategoryId == id);
                if (category == null)
                {
                    throw new CategoryException($"Category Id : {id} does not exist ");

                }

                

                return category;

            }
            catch (Exception)
            {

                throw;

            }

        }

    }
}
