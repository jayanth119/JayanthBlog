import React, { useRef, useState, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const GltfModel = ({ modelPath, scale = 40, position = [0, 0, 0],type }) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  const [hovered, hover] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.y += 0.003));

  const model =[3,3,3,3];
  const abc = [0.09,0.09,0.09,0.09];
  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        position={position}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
        scale={type?model:abc}
      />
    </>
  );
};

export default GltfModel;