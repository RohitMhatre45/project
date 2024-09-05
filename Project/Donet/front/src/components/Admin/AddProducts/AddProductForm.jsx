import React, { useState, useEffect } from 'react';
import './AddProductForm.css'; // Import custom CSS for styling

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch('http://localhost:5216/api/Category/Get-All-Categorys')
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          console.error('Unexpected response format for categories:', data);
        }
      })
      .catch((error) => console.error('Error fetching categories:', error));
  };

  const handleAddCategory = (event) => {
    event.preventDefault();

    fetch('http://localhost:5216/api/Category/Adding-Category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoryName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          // Reset form fields
          setCategoryName('');
          fetchCategories(); // Refresh the categories list
        } else {
          alert(`Failed to add category: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error('Error adding category:', error);
        alert('Error adding category');
      });
  };

  const handleDeleteCategory = () => {
    fetch(`http://localhost:5216/api/Category/delete_Category_by_Id/${selectedCategoryId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          setSelectedCategoryId(''); // Reset selected category
          fetchCategories(); // Refresh the categories list
        } else {
          alert(`Failed to delete category: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
        alert('Error deleting category');
      });
  };

  return (
    <div className="add-category-form">
      <h2>Add or Delete a Category</h2>
      <hr className="form-separator" />
      <form onSubmit={handleAddCategory}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-add">Add Category</button>
      </form>

      <h2>Delete a Category</h2>
      <hr className="form-separator" />
      <div className="form-group">
        <label htmlFor="deleteCategory">Select Category to Delete</label>
        <select
          id="deleteCategory"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          required
        >
          <option value="">--Select Category--</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
      <button type="button" className="btn-delete" onClick={handleDeleteCategory}>
        Delete Category
      </button>
    </div>
  );
};

export default AddCategoryForm;
