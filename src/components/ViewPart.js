import React, { useState } from 'react';
import Modal from 'react-modal'; // Ensure react-modal is installed
import './ProductCard.css'; // Import the product card CSS

const ViewPart = ({ viewArray }) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  const handleImageClick = (productIndex) => {
    setSelectedProductIndex(productIndex);
    setCurrentImageIndex(0); // Start with the first image (main image)
    setFullscreen(true);
  };

  const handleNextImage = () => {
    const totalImages = viewArray[selectedProductIndex].smallImages.length + 1;
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrevImage = () => {
    const totalImages = viewArray[selectedProductIndex].smallImages.length + 1;
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const handleCloseFullscreen = () => {
    setFullscreen(false);
  };

  return (
    <div className="view">
      <h3>View Part</h3>
      <div className="view-content">
        {viewArray.map((item, index) => (
          <div key={index} className="view-item">
            {item.type === 'heading' ? (
              <h1 style={{ textAlign: 'center' }}>{item.content}</h1>
            ) : item.type === 'product' ? (
              <div className="product-card" style={{ maxWidth: '320px' }}>
                <img
                  src={item.mainImage}
                  alt="Main Product"
                  className="main-image"
                  style={{ objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => handleImageClick(index)}
                />
                <div className="small-images-carousel">
                  {item.smallImages.map((img, idx) => (
                    <img key={idx} src={img} alt={`Small Product ${idx + 1}`} style={{ objectFit: 'cover' }} />
                  ))}
                </div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p><strong>Price:</strong> {item.price}</p>
              </div>
            ) : null}
          </div>
        ))}

        {fullscreen && selectedProductIndex !== null && (
          <Modal
            isOpen={fullscreen}
            onRequestClose={handleCloseFullscreen}
            className="fullscreen-modal"
            overlayClassName="fullscreen-overlay"
          >
            <div className="carousel-container">
              <button className="carousel-button prev-button" onClick={handlePrevImage}>
                &#10094;
              </button>
              <img
                src={
                  currentImageIndex === 0
                    ? viewArray[selectedProductIndex].mainImage
                    : viewArray[selectedProductIndex].smallImages[currentImageIndex - 1]
                }
                alt={`Full Screen Product ${currentImageIndex + 1}`}
                className="fullscreen-image"
              />
              <button className="carousel-button next-button" onClick={handleNextImage}>
                &#10095;
              </button>
            </div>
            <button onClick={handleCloseFullscreen} className="close-button">Close</button>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ViewPart;
