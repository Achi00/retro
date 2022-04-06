import React from 'react'
import './More.css';
import * as THREE from 'three'
import { TextureLoader } from 'three'
import { useRef, Suspense, useState, useMemo } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import {
  Environment,
  Lightformer,
  PerspectiveCamera,
  MeshReflectorMaterial,
  ContactShadows,
  ScrollControls, useScroll, Scroll, OrbitControls, Sphere, useAspect
} from '@react-three/drei'
import { LayerMaterial, Base, Depth } from 'lamina'
import url from "./mirror.mp4";
import Geo from './Model'
import Geo1 from './Model1'
import Geo2 from './Model2'
import img from './hover1.jpg'
import img1 from './sectionImg2.png'

function MovingSpots({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
    const group = useRef()
    const groupScroll = useRef()
    
    useFrame((state, delta) => (group.current.position.z += delta * 40) > 10 && (group.current.position.z = -60))
    return (
      <group ref={groupScroll} rotation={[0, 0, 0]} position={[0,-4, 0]}>
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
    
function Sun() {
  const sunRef = useRef()
  return (
    <Sphere ref={sunRef} position={[0, 2, -260]} scale={20}>
      <meshBasicMaterial color="#DC2F02" />
    </Sphere>
  )
}



  const Ground = () => {
    const floorRef = useRef()
  
    return (
      <>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} ref={floorRef}>
          <planeGeometry args={[240, 300]} />
          <MeshReflectorMaterial
            resolution={2048}
            mixBlur={0}
            mixStrength={200}
            roughness={0}
            depthScale={0.8}
            minDepthThreshold={0.4}
            maxDepthThreshold={1}
            color="#292b2e"
            metalness={5}
          />
        </mesh>
      </>
    )
  }

  const WireFrame = () => {
    const floorRef = useRef()
    useFrame((state, delta) => (floorRef.current.position.z += delta * 40) > 10 && (floorRef.current.position.z = -100))
    return (
      <>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 5, 0]} ref={floorRef}>
          <planeGeometry args={[240, 300, 10, 10]} />
          <meshStandardMaterial color={'#0EB8B9'} wireframe wireframeLinewidth={3}/>
        </mesh>
      </>
    )
  }

  const Model = () => {
    const gltf = useLoader(GLTFLoader, '/cockpit.gltf')
    const carRef = useRef()
    useFrame((state) => {
      const t = state.clock.getElapsedTime()
      carRef.current.position.y = (-480 + Math.sin(t * 20)) / 400
    })
    return (
      <group ref={carRef} position={[0.5, -1.2, -0.1]} rotation={[0, 0, 0]}>
        <primitive object={gltf.scene} scale={0.3} />
      </group>
    )
  }

  const Dash = () => {
    const [video] = useState(() => {
      const vid = document.createElement("video");
      vid.src = url;
      vid.crossOrigin = "Anonymous";
      vid.loop = true;
      vid.muted = true;
      vid.play();
      return vid;
    });
    const mirrorRef = useRef()
    useFrame((state) => {
      const t = state.clock.getElapsedTime()
      mirrorRef.current.position.y = (-90 + Math.sin(t * 20)) / 400
    })
  
    return (
      <group>
  
        <mesh ref={mirrorRef} rotation={[0, 0, 0]} position={[0, 0, -1.1]}>
          <planeGeometry args={[0.76, 0.17]} />
          <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
            <videoTexture attach="map" args={[video]} />
            <videoTexture attach="emissiveMap" args={[video]} />
          </meshStandardMaterial>
        </mesh>
      </group>
    );
  };

  const Camera = (props) => {
    const cameraRef = useRef()
    useFrame((state) => {
      const t = state.clock.getElapsedTime()
    })
    return(
      <group ref={cameraRef}>
        <PerspectiveCamera makeDefault {...props}/>
      </group>
    )
  }

  function ScrollPage(){

    return(
      <Scroll html style={{ width: '100%' }}>
      <h1 style={{ position: 'absolute', color: "#550632", top: `55vh`, right: '25vw', fontSize: '2vw',letterSpacing: '3px', transform: `translate3d(0,-100%,0)` }}>
      WHAT WE CAN DO FOR YOU <br />
      TV COMMERCIALS<br />
       EXPERIMENTAL<br />
       STORYTELLING<br />
       STYLE FRAMES
      </h1>
      <h2 style={{ position: 'absolute', top: '110vh', left: '10vw', fontSize: '4vw',color: "#240046" }}>
      Our company works with agencies and direct clients:<br/> 
      furthermore our experienced team can manage any stage<br/>
       of production.</h2>
      <h2 style={{ position: 'absolute', top: '195vh', width:"25vw", fontSize: '1.5vw', left: '10vw', color: "#DC2F02" }}>100+ Clients</h2>
      <h2 style={{ position: 'absolute', top: '195vh', width:"25vw", fontSize: '1.5vw', right: '35vw', color: "#00B4D8"}}>20 Countries</h2>
      <h2 style={{ position: 'absolute', top: '195vh', width:"25vw", fontSize: '1.5vw', right: '23vw', color: "#240046" }}>Remote</h2>
      <h2 style={{ position: 'absolute', top: '195vh', width:"25vw", fontSize: '1.5vw', left: '80vw', color: "#DC2F02" }}>40 Projects</h2>
    </Scroll>
    )
  }

  function Images() {
    const ImgRef = useRef()
    const scroll = useScroll()
    const { viewport } = useThree()
    useFrame(() => (ImgRef.current.position.y = scroll.offset * 1.5))
    const texture = useLoader(THREE.TextureLoader, img)
    const texture1 = useLoader(THREE.TextureLoader, img1)
    return (
      <group ref={ImgRef}>
      <mesh position={[0.12,-1.5,-0.5]} scale={viewport.width / 20}>
        <planeBufferGeometry attach="geometry" args={[0.2, 0.1]} />
        <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
      </mesh>
      <mesh position={[-0.12,-1.5,-0.5]} scale={viewport.width / 20}>
        <planeBufferGeometry attach="geometry" args={[0.2, 0.1]} />
        <meshBasicMaterial attach="material" map={texture1} toneMapped={false} />
      </mesh>
      </group>
    )
  }

  function ScrollModel() {
    const ScrollRef = useRef()
    const ScrollRef1 = useRef()
    const ScrollRef2 = useRef()
    const scroll = useScroll()
    useFrame(() => (ScrollRef.current.position.y = scroll.offset * 3,ScrollRef1.current.position.y = scroll.offset * 2,ScrollRef2.current.position.y = scroll.offset * 2.1))
    const { viewport } = useThree()
    return(
      <>
      <group ref={ScrollRef}>
        <Geo position={[0.5,0,-1]} scale={0.1}/>
      </group>
      <group ref={ScrollRef1}>
        <Geo1 position={[-0.15,-1.7,-0.8]} scale={viewport.width / 150}/>
      </group>
      <group ref={ScrollRef2}>
        <Geo2 position={[0.15,-1.3,-0.8]} scale={viewport.width / 150}/>
      </group>
      </>
    )
  }

function More() {
  return (
    <div className="App" >
    <Canvas shadows dpr={[1, 2]}>
      <Camera />
    <ScrollControls damping={5} pages={3}>
      <ScrollPage />
    <Ground />
    <WireFrame />
    <Suspense fallback={null}>
      <Images />
      <ScrollModel /> 
      <Dash />
      <Model />
      <Sun />
    </Suspense>
    </ScrollControls>
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
      <Bloom luminanceThreshold={0} luminanceSmoothing={2} height={1000} opacity={2} />
      <Noise opacity={0.5} />
    </EffectComposer>
    {/* <OrbitControls /> */}
  </Canvas>
    </div>
  )
}

export default More