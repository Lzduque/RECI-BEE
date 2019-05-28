import React from "react";

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div>
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
      />
      {label}
    </label>
  </div>
);

export default Checkbox;
