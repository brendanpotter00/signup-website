"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Physics, usePlane, useBox, useSphere } from "@react-three/cannon";
import { OrbitControls, Environment } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";

// Rainbow gradient material
function RainbowMaterial() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = 0;
    }
  }, []);

  useThree(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={`
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform float time;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        vec3 hsv2rgb(vec3 c) {
          vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }
        
        vec3 rainbow(float t) {
          // Create a smooth gradient using HSV color space
          float hue = mod(t * 0.3 + vPosition.x * 0.2 + vPosition.y * 0.2 + vPosition.z * 0.2, 1.0);
          float saturation = 0.9; // High saturation for vibrant colors
          float value = 1.0; // Full brightness
          
          return hsv2rgb(vec3(hue, saturation, value));
        }
        
        void main() {
          vec3 color = rainbow(time);
          
          // Add some depth with normal-based lighting
          float light = dot(vNormal, vec3(0.0, 1.0, 0.5)) * 0.3 + 0.7;
          color *= light;
          
          // Add a subtle glow effect
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          color = mix(color, vec3(1.0), fresnel * 0.15);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `}
      uniforms={{
        time: { value: 0 },
      }}
    />
  );
}

// Ground component
function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0],
    type: "Static",
  }));

  return (
    <mesh ref={ref as any} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
}

// Sphere component
function Sphere({ position }: { position: [number, number, number] }) {
  const [ref] = useSphere(() => ({
    mass: 1,
    position,
    args: [0.5],
  }));

  return (
    <mesh ref={ref as any} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <RainbowMaterial />
    </mesh>
  );
}

// Cube component
function Cube({ position }: { position: [number, number, number] }) {
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    args: [1, 1, 1],
  }));

  return (
    <mesh ref={ref as any} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <RainbowMaterial />
    </mesh>
  );
}

// Scene component with camera access
function SceneContent() {
  const { camera } = useThree();
  const [objects, setObjects] = useState<
    Array<{
      id: number;
      type: "sphere" | "cube";
      position: [number, number, number];
    }>
  >([]);

  // Spawn initial objects when component mounts
  useEffect(() => {
    const initialObjects = [];

    for (let i = 0; i < 10; i++) {
      const randomX = (Math.random() - 0.5) * 10; // Random X position between -5 and 5
      const randomY = Math.random() * 10 + 5; // Random Y position between 5 and 15
      const randomZ = (Math.random() - 0.5) * 10; // Random Z position between -5 and 5

      const newObject = {
        id: Date.now() + i,
        type: Math.random() > 0.5 ? "sphere" : ("cube" as "sphere" | "cube"),
        position: [randomX, randomY, randomZ] as [number, number, number],
      };

      initialObjects.push(newObject);
    }

    setObjects(initialObjects);
  }, []);

  const handleCanvasClick = (event: any) => {
    event.stopPropagation();

    // Get mouse position in normalized device coordinates
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Create a raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Find intersection with a plane at y = 0
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersection);

    // Add random offset for variety
    const offsetX = (Math.random() - 0.5) * 2;
    const offsetZ = (Math.random() - 0.5) * 2;

    const newObject = {
      id: Date.now(),
      type: Math.random() > 0.5 ? "sphere" : ("cube" as "sphere" | "cube"),
      position: [intersection.x + offsetX, 5, intersection.z + offsetZ] as [
        number,
        number,
        number
      ],
    };

    setObjects((prev) => [...prev, newObject]);
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Physics gravity={[0, -9.81, 0]}>
        <Ground />

        {objects.map((obj) =>
          obj.type === "sphere" ? (
            <Sphere key={obj.id} position={obj.position} />
          ) : (
            <Cube key={obj.id} position={obj.position} />
          )
        )}
      </Physics>

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <Environment preset="city" />

      {/* Invisible click handler */}
      <mesh onClick={handleCanvasClick} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
}

// Main scene component
export default function PhysicsScene() {
  return (
    <div className="physics-scene">
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 50 }}
        style={{ cursor: "crosshair" }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
