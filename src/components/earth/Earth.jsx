import React, { useRef } from "react";

import EarthNightMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthCloudMap from "../../assets/textures/8k_earth_clouds.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";

import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function Earth(props) {
    const [colorMap, normalMap, specularMap, cloudMap] = useLoader(
        TextureLoader,
        [EarthNightMap, EarthNormalMap, EarthSpecularMap, EarthCloudMap]
    );
    const earthRef = useRef();
    const cloundsRef = useRef();

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        earthRef.current.rotation.y = elapsedTime * 0.1;
        cloundsRef.current.rotation.y = elapsedTime * 0.1;
    });

    // We cannot render divs inside canvas
    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.5} />
            <Stars
                radius={300}
                depth={60}
                count={2000}
                factor={7}
                saturation={0}
                fade={true}
            />
            <mesh ref={cloundsRef} position={[0, 0, 2]}>
                <sphereGeometry args={[1.005, 32, 32]} />
                <meshPhongMaterial
                    map={cloudMap}
                    opacity={0.4}
                    depthWrite={true}
                    transparent={true}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh ref={earthRef} position={[0, 0, 2]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    metalness={0.4}
                    roughness={0.7}
                />
                {/* <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    zoomSpeed={0.6}
                    panSpeed={0.5}
                    rotateSpeed={0.4}
                /> */}
            </mesh>
        </>
    );
}

export default Earth;
