using BusinessLayer.Interface;
using Model;
using RespositoryLayer.CustomException;
using RespositoryLayer.Entity;
using RespositoryLayer.Interface;
using System;
using System.Collections.Generic;

namespace BusinessLayer.Service
{
    public class UserBL : IUserBL
    {
        private readonly IUserRL userRL;

        public UserBL(IUserRL userRL)
        {
            this.userRL = userRL;
        }

        public UserEntity CreateUser(UserDTO model)
        {
            try
            {
                // Check if passwords match before passing to repository layer
                if (model.Password != model.ConfirmPassword)
                {
                    throw new ArgumentException("Passwords do not match.");
                }

                return userRL.CreateUser(model);
            }
            catch (UserException)
            {
                throw;
            }
        }

        public List<UserEntity> GetAllUsers()
        {
            try
            {
                return userRL.GetAllUsers();
            }
            catch (UserException)
            {
                throw;
            }
        }

        public UserEntity GetUserById(int id)
        {
            try
            {
                return userRL.GetUserById(id);
            }
            catch (UserException)
            {
                throw;
            }
        }

        public UserEntity UpdateUser(int id, UserDTO model)
        {
            try
            {
                // Check if passwords match before passing to repository layer
                if (model.Password != model.ConfirmPassword)
                {
                    throw new ArgumentException("Passwords do not match.");
                }

                return userRL.UpdateUser(id, model);
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
                return userRL.DeleteUser(id);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
