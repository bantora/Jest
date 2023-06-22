import "./App.css";
import { useState } from "react";

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [checkBox, setCheckBox] = useState(false);

  const newButtonColor = buttonColor === "red" ? "blue" : "red";

  const handleChange = () => {
    setButtonColor(newButtonColor);
  };

  const handleChangeCB = () => {
    setCheckBox(!checkBox);
  };

  return (
    <div>
      <button
        disabled={checkBox}
        onClick={handleChange}
        style={{ backgroundColor: buttonColor }}
      >
        Change to {newButtonColor}
      </button>
      <input
        type='checkbox'
        defaultChecked={checkBox}
        onClick={handleChangeCB}
      />
    </div>
  );
}

export default App;
