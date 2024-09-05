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
    public class UserRL : IUserRL
    {
        private readonly BookEcommerceContext _context;

        public UserRL(BookEcommerceContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public UserEntity CreateUser(UserDTO model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                throw new ArgumentException("Passwords do not match.");
            }
            var UserRole = _context.userRoles.Find(model.UserRoleId);

            if (UserRole == null)
            {

                throw new UserRoleException($"Category id {model.UserRoleId} does not exist");

            }


            UserEntity user = new UserEntity()
            {
                UserRoleId = model.UserRoleId,
                FullName = model.FullName,
                Email = model.Email,
                Password = model.Password, // Ensure password is hashed before saving
                PhoneNumber = model.PhoneNumber
            };

            _context.Add(user);
            _context.SaveChanges();

            return user;
        }

        public List<UserEntity> GetAllUsers()
        {
            try
            {
                var userList = _context.users
                    .Include(u => u.userRole)// Fetch UserRole
                    .Include(u =>u.ShippingAddresses)
                    .ToList();

                if (userList.Count == 0)
                {
                    throw new UserException("List not found");
                }
                return userList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public UserEntity UpdateUser(int id, UserDTO model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                throw new ArgumentException("Passwords do not match.");
            }

            try
            {
                var user = _context.users.FirstOrDefault(x => x.UserRoleId == id);
                if (user == null)
                {
                    throw new UserException($"User Id : {id} does not exist");
                }

                user.FullName = model.FullName;
                user.Email = model.Email;
                // Ensure password is hashed before saving
                user.Password = model.Password;
                user.PhoneNumber = model.PhoneNumber;
               
                user.UpdatedAt = DateTime.UtcNow;

                _context.Update(user);
                _context.SaveChanges();

                return user;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public UserEntity DeleteUser(int id)
        {
            try
            {
                var user = _context.users.FirstOrDefault(x => x.UserRoleId == id);
                if (user == null)
                {
                    throw new UserException($"User Id : {id} does not exist");
                }

                _context.Remove(user);
                _context.SaveChanges();

                return user;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public UserEntity GetUserById(int id)
        {
            try
            {
                var user = _context.users
                    .Include(u => u.userRole) // Fetch UserRole
                    .FirstOrDefault(x => x.UserId == id);
                if (user == null)
                {
                    throw new UserException($"User Id : {id} does not exist");
                }

                return user;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
