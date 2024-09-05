import React, { useState, useEffect } from 'react';
import './UserRolesManagement.css'; // Import custom CSS for styling

const UserRolesManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState({});
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    userRoleId: '',
  });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = () => {
    // Fetch all users
    fetch('http://localhost:5216/api/User/GetAllUsers')
      .then(response => response.json())
      .then(data => {
        console.log('Users API response:', data);
        if (data && Array.isArray(data.data)) {
          setUsers(data.data); // Adjust based on actual API structure
        } else {
          console.error('Unexpected response format for users:', data);
        }
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  const fetchRoles = () => {
    // Fetch all roles
    fetch('http://localhost:5216/api/UserRole/Get-All-UserRoles')
      .then(response => response.json())
      .then(data => {
        console.log('Roles API response:', data);

        if (data && Array.isArray(data.data)) {
          const rolesMap = {};
          data.data.forEach(role => {
            rolesMap[role.userRoleId] = role.userRole;
          });
          console.log('Roles Map:', rolesMap); // Log the rolesMap to check its content
          setRoles(rolesMap);
        } else {
          console.error('Roles data is not an array:', data.data);
        }
      })
      .catch(error => console.error('Error fetching roles:', error));
  };

  const handleAddUser = () => {
    fetch('http://localhost:5216/api/User/CreateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => response.json())
      .then(data => {
        console.log('User added:', data);
        fetchUsers(); // Refresh the user list
        setNewUser({
          fullName: '',
          email: '',
          phoneNumber: '',
          userRoleId: '',
        });
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:5216/api/User/DeleteUser/${userId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          fetchUsers(); // Refresh the user list
          alert('User deleted successfully');
        } else {
          alert('Failed to delete user');
        }
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div className="container">
      <h2>User Management</h2>
      {/* <div className="add-user-form">
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={newUser.fullName}
          onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newUser.phoneNumber}
          onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
        />
        <select
          value={newUser.userRoleId}
          onChange={(e) => setNewUser({ ...newUser, userRoleId: e.target.value })}
        >
          <option value="">Select Role</option>
          {Object.entries(roles).map(([roleId, roleName]) => (
            <option key={roleId} value={roleId}>
              {roleName}
            </option>
          ))}
        </select>
        <button onClick={handleAddUser}>Add User</button>
      </div> */}
      <div className="table-container">
        <div className="grid-header">
          <div>User ID</div>
          <div>User Name</div>
          <div>User Email</div>
          <div>User Phone</div>
          <div>Actions</div>
        </div>
        <div className="grid-body">
          {users.length > 0 ? (
            users.map(user => (
              <div className="grid-row" key={user.userId}>
                <div>{user.userId}</div>
                <div>{user.fullName}</div>
                <div>{user.email}</div>
                <div>{user.phoneNumber}</div>
                <div>
                  <button onClick={() => handleDeleteUser(user.userId)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="grid-row">
              <div>No users found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRolesManagement;
