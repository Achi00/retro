import './App.css';
import * as THREE from 'three'
import { useRef, Suspense, useEffect } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import {
  Environment,
  Lightformer,
  PerspectiveCamera,
  CameraShake,
  BakeShadows,
  MeshReflectorMaterial,
  ContactShadows,
  OrbitControls
} from '@react-three/drei'
import { LayerMaterial, Base, Depth } from 'lamina'

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/scene.gltf')
  const carRef = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // carRef.current.rotation.set(0.1 + Math.cos(t * 4.5) / 10, Math.sin(t / 4) / 4, 0.3 - (1 + Math.sin(t / 4)) / 8)
    carRef.current.position.y = (1 + Math.sin(t * 20)) / 50
  })
  return (
    <group ref={carRef} position={[-32.7, -1.5, 1.4]} rotation={[0, 0.5, 0]}>
      <primitive object={gltf.scene} scale={0.3} />
    </group>
  )
}

function MovingSpots({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef()
  useFrame((state, delta) => (group.current.position.z += delta * 40) > 10 && (group.current.position.z = -60))
  return (
    <group rotation={[0, 0.5, 0]}>
      <group ref={group}>
        {positions.map((x, i) => (
          <Lightformer
            form="rect"
            intensity={10}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0.7, 4, i * 4]}
            scale={[0.1, 5, 1]}
            color="red"
          />
        ))}
        {positions.map((x, i) => (
          <Lightformer
            form="rect"
            intensity={10}
            rotation={[Math.PI / 2, 0, 0]}
            position={[x, 4, i * 10]}
            scale={[0.2, 5, 1]}
            color="red"
          />
        ))}
        {positions.map((x, i) => (
          <Lightformer form="rect" intensity={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 4, i * 7]} scale={[0.1, 5, 1]} color="red" />
        ))}
        {positions.map((x, i) => (
          <Lightformer
            form="rect"
            intensity={10}
            rotation={[Math.PI / 2, 0, 0]}
            position={[1, 10, i * 70]}
            scale={[0.1, 5, 1]}
            color="red"
          />
        ))}
        {positions.map((x, i) => (
          <Lightformer
            form="rect"
            intensity={10}
            rotation={[Math.PI / 2, 0, 0]}
            position={[-15, 10, i * 70]}
            scale={[0.1, 5, 1]}
            color="red"
          />
        ))}
        {/* grid */}
        {positions.map((x, i) => (
          <Lightformer
            form="rect"
            intensity={5}
            rotation={[Math.PI / 2, 0, 5]}
            position={[1, 2, i * 10]}
            scale={[0.1, 50, 1]}
            color="#5A189A"
          />
        ))}
        {positions.map((x, i) => (
          <Lightformer
            form="rect"
            intensity={5}
            rotation={[Math.PI / 2, 0, 5]}
            position={[1, 2.5, i * 1]}
            scale={[0.1, 50, 1]}
            color="#5A189A"
          />
        ))}
        {positions.map((x, i) => (
          <Lightformer
            form="rect"
            intensity={5}
            rotation={[Math.PI / 2, 0, 5]}
            position={[1, 3, i * 10]}
            scale={[0.1, 50, 1]}
            color="#5A189A"
          />
        ))}
        {/* vertical */}
        {positions.map((x, i) => (
          <Lightformer
            form="rect"
            intensity={5}
            rotation={[Math.PI / 2, 0, 0]}
            position={[1, 5, i * 10]}
            scale={[0.1, 2, 1]}
            color="#5A189A"
          />
        ))}
        {positions.map((x, i) => (
          <Lightformer
            form="rect"
            intensity={3}
            rotation={[Math.PI / 2, 0, 0]}
            position={[1, 7, i * 10]}
            scale={[0.1, 6, 1]}
            color="#5A189A"
          />
        ))}
      </group>
    </group>
  )
}


const Ground = () => {
  const floorRef = useRef()

  // useFrame(() => (floorRef.current.position.z = scroll.offset * 1.5,floorRef.current.rotation.z = scroll.offset * 1.5))

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} ref={floorRef}>
        <planeGeometry args={[240, 300]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={0}
          mixStrength={20}
          roughness={0}
          depthScale={0.8}
          minDepthThreshold={0.4}
          maxDepthThreshold={1}
          color="#292b2e"
          metalness={2}
        />
      </mesh>
    </>
  )
}

function Dolly() {
  // This one makes the camera move in and out
  useFrame(({ clock, camera }) => {
    camera.position.z = -10
  })
  return null
}


function App() {
  return (
    <div className="App" >
    <Canvas shadows dpr={[1, 2]} camera={{ fov: 75, position: [0, 4, -10]}}>
    {/* <PerspectiveCamera rotation={[-Math.PI / 2, 0, 0]}/> */}
    <Ground />
    <Suspense fallback={null}>
      <Model position={[0, 1, 0]} />
    </Suspense>
    {/* <Porsche scale={1.6} position={[-0.5, -0.18, 0]} rotation={[0, Math.PI / -1.2, 0]} /> */}
    <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={20} shadow-bias={-0.0001} color={'#03045E'} />
    <ambientLight intensity={0.2} />
    <ContactShadows resolution={1024} frames={1} position={[0, -1.16, 0]} scale={10} blur={3} opacity={1} far={10} />

    {/* Renders contents "live" into a HDRI environment (scene.environment). */}
    <Environment frames={Infinity} resolution={256}>
      {/* Ceiling */}
      <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} color="red" />
      <MovingSpots />
      {/* Sides */}
      <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} color="red" /> 
      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Base color="#444" alpha={1} mode="normal" />
          <Depth colorA="blue" colorB="black" alpha={0.5} mode="normal" near={0} far={300} origin={[100, 100, 100]} />
        </LayerMaterial>
      </mesh>
    </Environment>
    <EffectComposer multisampling={0} disableNormalPass={true}>
      <DepthOfField focusDistance={0} focalLength={1} bokehScale={0.5} height={480} />
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.8} height={300} opacity={2} />
      <Noise opacity={0.5} />
    </EffectComposer>
    <CameraShake yawFrequency={0.2} rollFrequency={0.2} pitchFrequency={0.2} />
    {/* <OrbitControls /> */}
    {/* <Dolly /> */}

  </Canvas>
    </div>
  );
}

export default App;
