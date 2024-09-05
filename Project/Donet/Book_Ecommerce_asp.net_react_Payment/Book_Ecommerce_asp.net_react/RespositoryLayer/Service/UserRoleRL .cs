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
   
    public class UserRoleRL : IUserRoleRL
    {
        public BookEcommerceContext _context;

        public UserRoleRL(BookEcommerceContext context)
        {
            //_context = context;
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }



        public UserRoleEntity CreateUserRole(UserRoleDTO model)
        {
            UserRoleEntity userRoles = new UserRoleEntity()
            {
                userRole = model.userRole,   //userRole
                // Add any other properties here
            };

            _context.userRoles.Add(userRoles);
            _context.SaveChanges();

            return userRoles;
        }
        public List<UserRoleEntity> GetAllUserRoles()
        {
            try
            {
                var userRoleList = _context.userRoles.ToList();
                if (userRoleList.Count == 0)
                {
                    throw new UserRoleException("List not found");
                }
                return userRoleList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public UserRoleEntity UpdateUserRole(int id, UserRoleDTO model)
        {
            try
            {
                var userRole = _context.userRoles.FirstOrDefault(x => x.UserRoleId == id);
                if (userRole == null)
                {
                    throw new UserRoleException($"UserRole Id : {id} does not exist");
                }

                userRole.userRole = model.userRole;
                userRole.UpdatedAt = DateTime.UtcNow;

                _context.Update(userRole);
                _context.SaveChanges();

                return userRole;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public UserRoleEntity DeleteUserRole(int id)
        {
            try
            {
                var userRole = _context.userRoles.FirstOrDefault(x => x.UserRoleId == id);
                if (userRole == null)
                {
                    throw new UserRoleException($"UserRole Id : {id} does not exist");
                }

                _context.Remove(userRole);
                _context.SaveChanges();

                return userRole;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public UserRoleEntity GetUserRoleById(int id)
        {
            try
            {
                var userRole = _context.userRoles.FirstOrDefault(x => x.UserRoleId == id);
                if (userRole == null)
                {
                    throw new UserRoleException($"UserRole Id : {id} does not exist");
                }

                return userRole;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
