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
    public class UserRoleBL : IUserRoleBL  //IUserRoleBL
    {
        private readonly IUserRoleRL userRoleRL;

        public UserRoleBL(IUserRoleRL userRoleRL)
        {
            this.userRoleRL = userRoleRL;
        }

        public UserRoleEntity CreateUserRole(UserRoleDTO model)
        {
            try
            {
                return userRoleRL.CreateUserRole(model);
            }
            catch (CategoryException)
            {
                throw;
            }
        }

        public List<UserRoleEntity> GetAllUserRoles()
        {
            try
            {
                return userRoleRL.GetAllUserRoles();
            }
            catch (UserRoleException)
            {
                throw;
            }
        }

        public UserRoleEntity GetUserRoleById(int id)
        {
            try
            {
                return userRoleRL.GetUserRoleById(id);
            }
            catch (UserRoleException)
            {
                throw;
            }
        }

        public UserRoleEntity UpdateUserRole(int id, UserRoleDTO model)
        {
            try
            {
                return userRoleRL.UpdateUserRole(id, model);
            }
            catch (UserRoleException)
            {
                throw;
            }
        }

        public UserRoleEntity DeleteUserRole(int id)
        {
            try
            {
                return userRoleRL.DeleteUserRole(id);
            }
            catch (UserRoleException)
            {
                throw;
            }
        }

    }
}