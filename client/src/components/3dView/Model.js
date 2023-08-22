import { useRef } from "react";
import PropTypes from 'prop-types';

export default function Model({category, productName}) {
  const modelRef = useRef();
  console.log(category, productName)
  // const cameraOrbit = "0deg 90deg 3m";
  return (
    <model-viewer
      // className="model-viewer"
      src={`${process.env.PUBLIC_URL}/3dmodels/${category}/eye2.glb`}
      alt="eyes"
      exposure="0.008"
      camera-controls
      ar
      ar-modes="webxr"
      // camera-orbit={cameraOrbit}
      ref={(ref) => {
        modelRef.current = ref;
      }}
    ></model-viewer>
  );
}

Model.prototype = {
  category: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired
}
