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
    public class CategoryBL : ICategoryBL
    {
        private readonly ICategoryRL categoryRL;

        public CategoryBL(ICategoryRL categoryRL)
        {
            this.categoryRL = categoryRL;
        }   

        public Category CreateCategory(CategoryDTO model)
        {
            try
            {
                return categoryRL.CreateCategory(model);
            }
            catch (CategoryException)
            {
                throw;
            }
        }
        public List<Category> GetAllCategories()
        {
            try
            {
                return categoryRL.GetAllCategories();
            }
            catch (CategoryException)
            {
                throw;
            }
        }

        public Category GetCategoryId(int id)
        {
            try
            {
                return categoryRL.GetCategoryId(id);
            }
            catch (CategoryException)
            {
                throw;
            }
        }

        public Category UpdateCategory(int id, CategoryDTO model)
        {
            try
            {
                return categoryRL.UpdateCategory(id, model);
            }
            catch (CategoryException)
            {
                throw;
            }
        }

        public Category DeleteCategory(int id)
        {
            try
            {
                return categoryRL.DeleteCategory(id);
            }
            catch (CategoryException)
            {
                throw;
            }
        }

    }
}
