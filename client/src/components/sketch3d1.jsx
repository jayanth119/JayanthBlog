import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GltfModel from "./sketch3d";
const ModelViewer = ({ modelPath, scale = 40, position = [0, 0, 0] ,type}) => {

    return (
        <Canvas>
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <ambientLight intensity={0.8} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
                <GltfModel type={type} modelPath={modelPath} scale={scale} position={position} />
                <OrbitControls enableZoom={false} />
            </Suspense>
        </Canvas>
    );
};

export default ModelViewer;