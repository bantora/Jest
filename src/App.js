import "./App.css";
import { useState } from "react";

function App() {
  const [buttonColor, setButtonColor] = useState("red");

  const newButtonColor = buttonColor === "red" ? "blue" : "red";

  const handleChange = () => {
    setButtonColor(newButtonColor);
  };

  return (
    <div>
      <button onClick={handleChange} style={{ backgroundColor: buttonColor }}>
        Change to {newButtonColor}
      </button>
    </div>
  );
}

export default App;
