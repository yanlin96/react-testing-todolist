import { useState } from "react";

function Header({ addUndoItem }) {
  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    const inputtedVal = e.currentTarget.value;
    setInputVal(inputtedVal);
  };

  const handleInputKeyUp = (e) => {
    if (e.keyCode === 13 && inputVal) {
      addUndoItem(inputVal);
    }
  };

  return (
    <div>
      <input
        data-testid="header-input"
        value={inputVal}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyUp}
      />
    </div>
  );
}

export default Header;
