import { useRef } from "react";

export default function Model() {
  const modelRef = useRef();

  return (
    <model-viewer
      // className="model-viewer"
      src={`${process.env.PUBLIC_URL}/eye-glasses/EyeGlasses.glb`}
      alt="eyes"
      exposure="0.008"
      camera-controls
      ar
      ar-modes="webxr"
      ref={(ref) => {
        modelRef.current = ref;
      }}
    ></model-viewer>
  );
}
