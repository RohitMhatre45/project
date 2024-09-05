using Model;
using RespositoryLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RespositoryLayer.Interface
{
    public interface IUserRoleRL
    {
        public UserRoleEntity CreateUserRole(UserRoleDTO model);

        List<UserRoleEntity> GetAllUserRoles();
        UserRoleEntity UpdateUserRole(int id, UserRoleDTO model);
        UserRoleEntity DeleteUserRole(int id);
        UserRoleEntity GetUserRoleById(int id);

    }
}
