using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Model;
using System.Collections.Generic;
using RespositoryLayer.Entity;

namespace BusinessLayer.Interface
{
    public interface IUserBL
    {
        UserEntity CreateUser(UserDTO model);
        List<UserEntity> GetAllUsers();
        UserEntity GetUserById(int id);
        UserEntity UpdateUser(int id, UserDTO model);
        UserEntity DeleteUser(int id);
    }
}
