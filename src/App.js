import React, { useState, useEffect } from 'react';
import Customizer from './components/Customizer';
import ViewPart from './components/ViewPart';
import AddSectionOptions from './components/AddSectionOptions';
import './App.css';

const App = () => {
  const [customizerArray, setCustomizerArray] = useState(() => {
    const saved = localStorage.getItem('customizerArray');
    return saved ? JSON.parse(saved) : [];
  });

  const [viewArray, setViewArray] = useState(() => {
    const saved = localStorage.getItem('viewArray');
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    localStorage.setItem('customizerArray', JSON.stringify(customizerArray));
  }, [customizerArray]);

  useEffect(() => {
    localStorage.setItem('viewArray', JSON.stringify(viewArray));
  }, [viewArray]);

  const handleAddSectionClick = () => {
    setShowOptions(true);
  };

  const handleAddHeading = () => {
    if (inputValue.trim() !== '') {
      const headingComponent = inputValue;

      setCustomizerArray([...customizerArray, headingComponent]);
      setViewArray([...viewArray, { type: 'heading', content: headingComponent }]);

      setInputValue('');
      resetUI();
    }
  };

  const handleAddProduct = (productComponent) => {
    const productTitle = productComponent.title || 'Product Section';
    setCustomizerArray([...customizerArray, productTitle]);
    setViewArray([...viewArray, productComponent]);

    resetUI();
  };

  const resetUI = () => {
    setShowOptions(false);
    setSelectedOption(null);
  };

  const handleDelete = (index) => {
    const newCustomizerArray = [...customizerArray];
    const newViewArray = [...viewArray];
    newCustomizerArray.splice(index, 1);
    newViewArray.splice(index, 1);

    setCustomizerArray(newCustomizerArray);
    setViewArray(newViewArray);

    if (selectedIndex === index) setSelectedIndex(null);
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      const newCustomizerArray = [...customizerArray];
      const newViewArray = [...viewArray];

      [newCustomizerArray[index], newCustomizerArray[index - 1]] = [newCustomizerArray[index - 1], newCustomizerArray[index]];
      [newViewArray[index], newViewArray[index - 1]] = [newViewArray[index - 1], newViewArray[index]];

      setCustomizerArray(newCustomizerArray);
      setViewArray(newViewArray);

      if (selectedIndex === index) setSelectedIndex(index - 1);
    }
  };

  const handleMoveDown = (index) => {
    if (index < customizerArray.length - 1) {
      const newCustomizerArray = [...customizerArray];
      const newViewArray = [...viewArray];

      [newCustomizerArray[index], newCustomizerArray[index + 1]] = [newCustomizerArray[index + 1], newCustomizerArray[index]];
      [newViewArray[index], newViewArray[index + 1]] = [newViewArray[index + 1], newViewArray[index]];

      setCustomizerArray(newCustomizerArray);
      setViewArray(newViewArray);

      if (selectedIndex === index) setSelectedIndex(index + 1);
    }
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="container">
      <div className="left-section">
        <AddSectionOptions
          showOptions={showOptions}
          selectedOption={selectedOption}
          onSelectOption={setSelectedOption}
          onAddHeading={handleAddHeading}
          onAddProduct={handleAddProduct}
          inputValue={inputValue}
          onInputChange={(e) => setInputValue(e.target.value)}
          onAddSectionClick={handleAddSectionClick}
        />
        <Customizer
          customizerArray={customizerArray}
          onSelect={handleSelect}
          onDelete={handleDelete}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          selectedIndex={selectedIndex}
        />
      </div>
      <ViewPart
        viewArray={viewArray}
        selectedIndex={selectedIndex}
      />
    </div>
  );
};

export default App;
