using Model;
using RespositoryLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interface
{
    public interface ICategoryBL
    {
        public Category CreateCategory(CategoryDTO model);


        public List<Category> GetAllCategories();

        public Category GetCategoryId(int id);

        public Category UpdateCategory(int id , CategoryDTO model);

        public Category DeleteCategory(int id);


    }
}
