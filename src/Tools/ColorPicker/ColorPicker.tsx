import { SketchPicker } from "react-color";
import { useState, useEffect, useRef } from "react";
import './ColorPicker.scss';

function App() {
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });
  const { r, g, b, a } = sketchPickerColor;

  const [showSketchPicker, setShowSketchPicker] = useState(false);
  const sketchPickerRef = useRef<HTMLDivElement>(null);

  const handleSketchPickerClick = () => {
    setShowSketchPicker(true);
  };

  function rgbaToHex(rgba: { r: string; g: string; b: string; a: string }): string {
    const { r, g, b, a } = rgba;
  
    const red = parseInt(r, 10);
    const green = parseInt(g, 10);
    const blue = parseInt(b, 10);
    const alpha = parseFloat(a);
  
    const hexRed = red.toString(16).padStart(2, "0");
    const hexGreen = green.toString(16).padStart(2, "0");
    const hexBlue = blue.toString(16).padStart(2, "0");
    const hexAlpha = Math.round(alpha * 255).toString(16).padStart(2, "0");
  
    const hex = `#${hexRed}${hexGreen}${hexBlue}${hexAlpha}`;
  
    return hex;
  }
  
  
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sketchPickerRef.current &&
        !sketchPickerRef.current.contains(event.target as Node)
      ) {
        setShowSketchPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
      <div className="sketchpicker" onClick={handleSketchPickerClick}>
        <div className="inputFieldContainer">
        <div className="hexLabel">
            Hex
        </div>
        <div className="colorPickerContainer" onClick={handleSketchPickerClick}>
        <div
          style={{
            backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
            width: 30,
            height: 30,
            borderRadius: 5,
            marginRight: 5
          }}>
        </div>
        <div className="hexCodeLabel">
            {
            rgbaToHex({ r: r, g: g, b: b, a: a })
            }
        </div>

        </div>
        </div>
        {showSketchPicker && (
          <div ref={sketchPickerRef}>
            <SketchPicker
              color={`rgba(${r}, ${g}, ${b}, ${a})`}
              onChange={(color) => {
                const { r, g, b, a } = color.rgb;
                setSketchPickerColor({
                  r: String(r),
                  g: String(g),
                  b: String(b),
                  a: String(a),
                });
              }}
            />
          </div>
        )}
      </div>
  );
}

export default App;
