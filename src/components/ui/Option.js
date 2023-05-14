import React from "react";
import { useState } from "react";

const lineSizeOptions = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
];

function Option(props) {
  const [selectedLineSize, setSelectedLineSize] = useState(props.defaultLineSize);

  function handleLineSizeChange(event) {
    setSelectedLineSize(event.target.value);
    props.onLineSizeChange(event.target.value);
  }

  return (
    <div>
      <label style={{color:"black"}}>
        Size:
        <select value={selectedLineSize} onChange={handleLineSizeChange}
        style={{"width":"50%",}}>
          {lineSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Option;