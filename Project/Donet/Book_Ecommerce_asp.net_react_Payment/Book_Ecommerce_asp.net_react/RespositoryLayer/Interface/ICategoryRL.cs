using Model;
using RespositoryLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RespositoryLayer.Interface
{
    public interface ICategoryRL
    {
        public Category CreateCategory(CategoryDTO model);

        public Category UpdateCategory( int id ,CategoryDTO model);
        public Category GetCategoryId(int id);
        public Category DeleteCategory(int id);

        public List<Category> GetAllCategories();


    }
}
