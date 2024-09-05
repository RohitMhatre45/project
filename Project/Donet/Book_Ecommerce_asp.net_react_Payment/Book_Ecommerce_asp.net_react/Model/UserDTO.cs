using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class UserDTO
    {
        public int UserRoleId { get; set; }

        [Required(ErrorMessage = "Full Name is required")]
        [StringLength(255, ErrorMessage = "Full Name cannot exceed 255 characters")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [StringLength(255, ErrorMessage = "Email cannot exceed 255 characters")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(255, ErrorMessage = "Password cannot exceed 255 characters")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password is required")]
        [Compare("Password", ErrorMessage = "Password and Confirmation Password do not match.")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Phone Number is required")]
        [StringLength(50, ErrorMessage = "Phone Number cannot exceed 50 characters")]
        public string PhoneNumber { get; set; }

        //public CartDTO Cart { get; set; }
       

    }
}
