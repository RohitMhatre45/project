using Model;
using RespositoryLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RespositoryLayer.Interface
{
    public interface IUserRL
    {
        public UserEntity CreateUser(UserDTO model);

        List<UserEntity> GetAllUsers();
        UserEntity UpdateUser(int id, UserDTO model);
        UserEntity DeleteUser(int id);
        UserEntity GetUserById(int id);

    }
}
