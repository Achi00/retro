import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, MeshDistortMaterial, Shadow } from '@react-three/drei'
import Text from './Text'

export default function Model(props) {
  const group = useRef()
  const shadow = useRef()
  const { nodes } = useGLTF('/geo.min.glb', true)
  useFrame(({ clock }) => {
    const t = (1 + Math.sin(clock.getElapsedTime() * 1.5)) / 2
    group.current.position.y = t / 3
    shadow.current.scale.y = shadow.current.scale.z = 1 + t
    shadow.current.scale.x = (1 + t) * 1.25
    group.current.rotation.x = group.current.rotation.z += 0.005
  })
  return (
    <group {...props} dispose={null}>
      <group ref={group}>
        <mesh geometry={nodes.geo.geometry} castShadow receiveShadow>
          <MeshDistortMaterial color="#B782CB" flatShading roughness={1} metalness={0.5} factor={15} speed={5} />
        </mesh>
        <mesh geometry={nodes.geo.geometry}>
          <meshBasicMaterial wireframe color="#EF0105" />
        </mesh>
      </group>
      <group position={[1.25, -0.5, 0]}>
        <Text position={[0, 0.2, 0]} fontSize={0.2} lineHeight={1} letterSpacing={-0.05}>
          01
          <meshBasicMaterial color="#D00000" toneMapped={false} />
        </Text>
        <Text bold position={[-0.01, -0.1, 0]} fontSize={0.4} lineHeight={1} letterSpacing={-0.05} color="#EF0105">
          {`Creative\nAgency`}
        </Text>
      </group>
      <Shadow ref={shadow} opacity={0.3} rotation-x={-Math.PI / 2} position={[0, -1.51, 0]} />
    </group>
  )
}
