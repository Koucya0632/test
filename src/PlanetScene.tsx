import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

// 星雲效果組件
function Nebula() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0003;
      groupRef.current.rotation.x += 0.0001;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 20 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
          ]}
        >
          <sphereGeometry args={[2 + Math.random() * 3, 16, 16]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(0.6 + Math.random() * 0.3, 0.8, 0.3)}
            transparent
            opacity={0.1 + Math.random() * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// 流星效果組件
function ShootingStars() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 30 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60,
          ]}
        >
          <sphereGeometry args={[0.05, 4, 4]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.8 + Math.random() * 0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// 能量環效果
function EnergyRings() {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <torusGeometry args={[8, 0.1, 8, 100]} />
      <meshBasicMaterial
        color="#00ffff"
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

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
      <ambientLight intensity={0.3} />
      {/* 定向光 (模擬太陽) */}
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* 彩色點光源 */}
      <pointLight position={[15, 15, 15]} intensity={0.8} color="#00ffff" />
      <pointLight position={[-15, -15, 15]} intensity={0.6} color="#ff00ff" />
      <pointLight position={[0, 20, -10]} intensity={0.4} color="#ffff00" />
      
      {/* 星球 */}
      <RotatingPlanet />
      
      {/* 能量環 */}
      <EnergyRings />
      
      {/* 星雲效果 */}
      <Nebula />
      
      {/* 流星效果 */}
      <ShootingStars />
      
      {/* 星空背景 */}
      <Stars radius={150} depth={150} count={10000} factor={8} />
      
      {/* 滑鼠控制視角 */}
      <OrbitControls />
    </Canvas>
  );
}