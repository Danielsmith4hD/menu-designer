import React, { useState } from 'react';

const AddSectionOptions = ({ showOptions, selectedOption, onSelectOption, onAddHeading, onAddProduct, inputValue, onInputChange, onAddSectionClick }) => {
  const [images, setImages] = useState([]);
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => convertToBase64(file)))
      .then(base64Images => {
        setImages(base64Images);
      })
      .catch(error => {
        console.error("Error converting images to base64:", error);
      });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAddProduct = () => {
    const productComponent = {
      type: 'product',
      mainImage: images[0],
      smallImages: images.slice(1),
      title: productTitle,
      price: productPrice,
      description: productDescription,
    };
    onAddProduct(productComponent);
    resetForm();
  };

  const resetForm = () => {
    setImages([]);
    setProductTitle('');
    setProductPrice('');
    setProductDescription('');
  };

  return (
    <div className="add-section">
      {!showOptions && (
        <button onClick={onAddSectionClick}>Add Section</button>
      )}

      {showOptions && !selectedOption && (
        <div className="options">
          <button onClick={() => onSelectOption('heading')}>Add Heading</button>
          <button onClick={() => onSelectOption('product')}>Add Product</button>
        </div>
      )}

      {showOptions && selectedOption === 'heading' && (
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            placeholder="Enter heading text"
          />
          <button onClick={onAddHeading}>Submit Heading</button>
        </div>
      )}

      {showOptions && selectedOption === 'product' && (
        <div>
          <label>Upload Images (First one will be the main image)</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
          />
          <label>Title</label>
          <input
            type="text"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            placeholder="Enter product title"
          />
          <label>Pricing</label>
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Enter product price"
          />
          <label>Description</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            rows="4"
          />
          <button onClick={handleAddProduct}>Add Product to Customizer & View</button>
        </div>
      )}
    </div>
  );
};

export default AddSectionOptions;
