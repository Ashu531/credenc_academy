import React, { useState } from "react";
import checkIcon from "../../assets/images/icons/check-icon-black.svg";
import Image from "next/image";

export default function CheckBox({ size = "1.6rem", setChecked, isChecked=false, disabled=false, label='',theme }) {

  const handleClick = (e) => {
    e.stopPropagation();
    setChecked(!isChecked);
  };
  return (
    <div className="checkbox-component" onClick={(e) => handleClick(e)}>
      <div
        className="checkBox"
        style={{
          width: `${size}`,
          height: `${size}`,
          background: `${isChecked ? "#FFFFFF" : "none"}`,
          border: `${isChecked ? "#FFFFFF" : ""}`,
          pointerEvents: `${disabled ? 'none': ''}`
        }}
      >
        {isChecked && (
          <Image
            style={{ height: '1.4rem', width: '1.4rem'}}
            src={checkIcon}
            alt="check icon"
            objectFit="cover"
          />
        )}
      </div>
      <div className="label">{label}</div>
    </div>
  );
}
