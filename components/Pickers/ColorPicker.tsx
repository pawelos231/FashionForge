import React, { useState, useCallback } from "react";
import { SketchPicker, ColorResult } from "react-color";

type Props = {
  color: string;
  setColor: (color: string) => void;
};

const ColorPicker = ({ color, setColor }: Props) => {
  console.log(color);
  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={color}
        disableAlpha
        onChange={(color) => setColor(color.hex)}
      />
    </div>
  );
};

export default React.memo(ColorPicker);
