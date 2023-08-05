import React, { useState, useCallback } from "react";
import { SketchPicker, ColorResult } from "react-color";

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState<string>("#fff");

  const handleColorChange = useCallback((selectedColor: ColorResult) => {
    setColor(selectedColor.hex);
  }, []);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker color={color} disableAlpha onChange={handleColorChange} />
    </div>
  );
};

export default React.memo(ColorPicker);
