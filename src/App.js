import './App.css';
import * as THREE from 'three'
import { useRef, Suspense, useState } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import {
  Environment,
  Lightformer,
  CameraShake,
  MeshReflectorMaterial,
  ContactShadows,
  ScrollControls, useScroll, Scroll, OrbitControls
} from '@react-three/drei'
import { LayerMaterial, Base, Depth } from 'lamina'
import "./ImageFadeMaterial"
import disp from "./Image.jpg"
import dist from "./dist.jpg"
import img from "./img1.jpg"
import img1 from "./img2.png"
import image1 from "./img/1.jpg"
import image2 from "./img/2.jpg"
import image3 from "./img/3.jpg"
import image4 from "./img/4.jpg"
import image5 from "./img/5.jpg"
import image6 from "./img/6.jpg"
import image7 from "./img/7.jpg"
import image8 from "./img/8.jpg"
import image9 from "./img/9.jpg"
import image10 from "./img/10.jpg"

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/scene.gltf')
  const carRef = useRef()
  const carRefScroll = useRef()
  const scroll = useScroll()
  const { viewport } = useThree()
  useFrame(() => (carRefScroll.current.position.x = scroll.offset * 1.5,carRefScroll.current.rotation.y = scroll.offset * 1.5))
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    carRef.current.position.y = (1 + Math.sin(t * 20)) / 50
  })
  return (
    <group ref={carRefScroll} rotation={[0, 0, 0]}>
    <group ref={carRef} position={[-29, -1.6, -15]} rotation={[0, 0, 0]}>
      <primitive object={gltf.scene} scale={0.3} />
    </group>
    </group>
  )
}



function FadingImage() {
  const ref = useRef()
  const ScrollRef = useRef()
  const scroll = useScroll()
  useFrame(() => (ScrollRef.current.position.y = scroll.offset * 12))
  const { viewport } = useThree()
  const [texture1, texture2, dispTexture] = useLoader(THREE.TextureLoader, [img, img1, disp])
  const [hovered, setHover] = useState(false)
  useFrame(() => (ref.current.dispFactor = THREE.MathUtils.lerp(ref.current.dispFactor, !!hovered, 0.1)))
  return (
    <mesh ref={ScrollRef} scale={viewport.width / 40} position={[3,0,-7]} rotation={[0.2, Math.PI / -1, 0]} onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
      <planeGeometry args={[4, 2]} position={[3,0,-7]}/>
      <imageFadeMaterial ref={ref} tex={texture1} tex2={texture2} disp={dispTexture} />
    </mesh>
  )
}

function MovingSpots({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef()
  const groupScroll = useRef()
  const scroll = useScroll()
  useFrame(() => (groupScroll.current.rotation.y = scroll.offset * 1.5,groupScroll.current.position.z = scroll.offset * 10))
  
  useFrame((state, delta) => (group.current.position.z += delta * 40) > 10 && (group.current.position.z = -60))
  return (
    <group ref={groupScroll} rotation={[0, 0, 0]}>
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

const ImgSection = () => {
  const ref = useRef()
  const ScrollRef = useRef()
  const scroll = useScroll()
  useFrame(() => (ScrollRef.current.position.y = scroll.offset * 12))
  const { viewport } = useThree()
  const [texture1, texture2,texture10,texture11,texture12,texture13,texture14,texture15,texture16,texture17, texture18, dispTexture] = useLoader(THREE.TextureLoader, [img, img1,image1,image2,image3,image4,image5,image6,image7,image8, dist])
  const [hovered, setHover] = useState(false)
  useFrame(() => (ref.current.dispFactor = THREE.MathUtils.lerp(ref.current.dispFactor, !!hovered, 0.1)))
  return (
    <>

    <mesh ref={ScrollRef} scale={viewport.width / 40} position={[-3,-10,-7]} rotation={[0.2, Math.PI / -1, 0]} onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
      <planeGeometry args={[4, 2]}/>
      <imageFadeMaterial ref={ref} tex={texture11} tex2={texture12} disp={dispTexture} />
    </mesh>
    </>
  )
}
const ImgSection2 = () => {
  const ref = useRef()
  const ref1 = useRef()
  const ref2 = useRef()
  const ScrollRef = useRef()
  const ScrollRef1 = useRef()
  const ScrollRef2 = useRef()
  const scroll = useScroll()
  useFrame(() => (ScrollRef.current.position.y = scroll.offset * 12,ScrollRef1.current.position.y = scroll.offset * 12,ScrollRef2.current.position.y = scroll.offset * 10))
  const { viewport } = useThree()
  const [texture1, texture2,texture10,texture11,texture12,texture13,texture14,texture15,texture16,texture17, texture18, dispTexture] = useLoader(THREE.TextureLoader, [img, img1,image1,image2,image3,image4,image5,image6,image7,image8, dist])
  const [hovered, setHover, setHover1] = useState(false)
  useFrame(() => (ref.current.dispFactor = THREE.MathUtils.lerp(ref.current.dispFactor, !!hovered, 0.1)))
  useFrame(() => (ref1.current.dispFactor = THREE.MathUtils.lerp(ref1.current.dispFactor, !!hovered, 0.1)))
  useFrame(() => (ref2.current.dispFactor = THREE.MathUtils.lerp(ref2.current.dispFactor, !!hovered, 0.1)))
  return (
    <>
    <group position={[-2, -9, 3]} >
    {/* image section */}
    <mesh ref={ScrollRef} scale={viewport.width / 40} position={[-3,-10,-7]} rotation={[0.2, Math.PI / -1, 0]} onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
      <planeGeometry args={[4, 2]}/>
      <imageFadeMaterial ref={ref} tex={texture13} tex2={texture14} disp={dispTexture} />
    </mesh>
    </group>
    <group position={[2, -9, 3]}>

    <mesh ref={ScrollRef1} scale={viewport.width / 40} position={[3,-10,-7]} rotation={[0.2, Math.PI / -1, 0]} onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
      <planeGeometry args={[4, 2]}/>
      <imageFadeMaterial ref={ref1} tex={texture15} tex2={texture16} disp={dispTexture} />
    </mesh>
    </group>
    <group position={[-3, -6, 9]}>

    <mesh ref={ScrollRef2} scale={viewport.width / 40} position={[3,-10,-7]} rotation={[0.2, Math.PI / -1, 0]} onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
      <planeGeometry args={[6, 3]}/>
      <imageFadeMaterial ref={ref2} tex={texture17} tex2={texture18} disp={dispTexture} />
    </mesh>
    </group>
    </>
  )
}

function ScrollPage(){

  return(
    <Scroll html style={{ width: '100%' }}>
    <h1 style={{ position: 'absolute', color: "#550632", top: `55vh`, right: '1vw', fontSize: '2vw',letterSpacing: '3px', transform: `translate3d(0,-100%,0)` }}>
    Team of designers and developers   <br />
    with focus in motion graphics,<br />
    3D animation<br />
    and art direction
    </h1>
    <h2 style={{ position: 'absolute', top: '110vh', left: '10vw', fontSize: '4vw',color: "#240046" }}>
We design experiences that enable
people to feel engaged, awakened in
postprint era.</h2>
    <h2 style={{ position: 'absolute', top: '195vh', width:"25vw", fontSize: '3vw', right: '30vw', color: "#001233"}}>Design</h2>
    <h2 style={{ position: 'absolute', top: '195vh', width:"25vw", fontSize: '3vw', left: '10vw', color: "#DC2F02" }}>Development</h2>
    <h2 style={{ position: 'absolute', top: '195vh', width:"25vw", fontSize: '3vw', left: '68vw', color: "#DC2F02" }}>Productivity</h2>
  </Scroll>
  )
}



function App() {
  return (
    <div className="App" >
    <Canvas shadows dpr={[1, 2]} camera={{ fov: 75, position: [0, 4, -10]}}>
    <ScrollControls damping={6} pages={3}>
    <Ground />
    <ScrollPage />
    <Suspense fallback={null}>
      <Model />
      <FadingImage />
      <ImgSection /> 
      <ImgSection2 /> 
    </Suspense>
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
  
    </ScrollControls>
    <EffectComposer multisampling={0} disableNormalPass={true}>
      <DepthOfField focusDistance={0} focalLength={1} bokehScale={0.5} height={480} />
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.8} height={300} opacity={2} />
      <Noise opacity={0.5} />
    </EffectComposer>
    <CameraShake yawFrequency={0.5} rollFrequency={0.5} pitchFrequency={0.2} />
    {/* <OrbitControls /> */}
    
  </Canvas>
    </div>
  );
}

export default App;
