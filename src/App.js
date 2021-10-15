import "./App.css";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Earth from "./components/earth/Earth";

const CanvasContainer = styled.div`
    width: 100%;
    height: 100%;
`;

function App() {
    return (
        <CanvasContainer>
            {/* Anything related to THREE GOES HERE */}
            <Canvas>
                <React.Suspense fallback={null}>
                    <Earth />
                </React.Suspense>
            </Canvas>
        </CanvasContainer>
    );
}

export default App;
