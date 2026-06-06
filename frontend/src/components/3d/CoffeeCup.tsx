'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

export function CoffeeCup() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Simplified coffee cup representation since I don't have a GLB file yet */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[1, 0.8, 2, 32]} />
          <meshStandardMaterial color="#3d2b1f" roughness={0.1} metalness={0.8} />
        </mesh>
        <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.5, 0.1, 16, 32]} />
          <meshStandardMaterial color="#3d2b1f" roughness={0.1} metalness={0.8} />
        </mesh>
        {/* Steam Particles effect can be added here */}
      </Float>
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2} 
        far={4.5} 
      />
    </group>
  );
}
