// Category.tsx
import React, { useState } from 'react';

interface CategoryProps {
  categories: string[];
  onAddCategory: (category: string) => void;
}

export const Category: React.FC<CategoryProps> = ({ categories, onAddCategory }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      onAddCategory(newCategory);
      setNewCategory(''); // Očisti input nakon dodavanja
    }
  };

  return (
    <div className="category-container">
      <h3>Kategorije zadataka</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Dodaj novu kategoriju"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAddCategory}>Dodaj kategoriju</button>
    </div>
  );
};