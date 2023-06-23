import "./App.css";
import { useState } from "react";

export const stringManipulation = (color) =>
  color.replace(/\B([A-Z])\B/g, " $1");

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const [checkBox, setCheckBox] = useState(false);

  const newButtonColor =
    buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

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
        style={{ backgroundColor: checkBox ? "gray" : buttonColor }}
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
