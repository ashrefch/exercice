import React,{useRef,useState} from "react";
import "./App.css";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import { Canvas,useLoader} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";


function View(props){
  const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  //const geom = useLoader(STLLoader,'./wheel.stl')
  // Rotate mesh every frame, this is outside of React without overhead
  
  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxGeometry args={[1,1,1]}  />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App(props) {
  return (
    <div className="App">
      <div id="canvas-container">
        <Canvas camera={{ position: [12, 12, 16] }}>
          <ambientLight intensity={0.4} />
          <meshStandardMaterial color="hotpink" transparent />
          
          <View />

          <meshPhongMaterial color="#eeeeee" />

          <gridHelper args={[100, 100]} />
          <axesHelper />
          <OrbitControls enableZoom="true" enableRotate="true" />
        </Canvas>
        
      </div>
    </div>
  );
}
