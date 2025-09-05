import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function RotatingPlanet() {
  const meshRef = useRef<THREE.Mesh>(null);

  // 每一幀讓星球自轉
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* 球體 */}
      <sphereGeometry args={[2, 64, 64]} />
      {/* 材質貼圖：可替換成地球貼圖 */}
      <meshStandardMaterial
        map={new THREE.TextureLoader().load("https://threejsfundamentals.org/threejs/resources/images/earth-day.jpg")}
      />
    </mesh>
  );
}

export default function PlanetScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      {/* 環境光 */}
      <ambientLight intensity={0.4} />
      {/* 定向光 (模擬太陽) */}
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* 星球 */}
      <RotatingPlanet />
      {/* 星空背景 */}
      <Stars radius={50} depth={60} count={5000} factor={4} />
      {/* 滑鼠控制視角 */}
      <OrbitControls />
    </Canvas>
  );
}