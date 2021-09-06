import React,{useRef,useEffect,useState} from "react";
import "./App.css";
import {STLLoader} from "three/examples/jsm/loaders/STLLoader";
import { Canvas,useLoader} from "@react-three/fiber";
import { GizmoHelper,GizmoViewport, OrbitControls } from "@react-three/drei";


function View(props){
  const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
 
const [geom,setGeom] = useState(null)
  useEffect(() => {
    const stlLoader = new STLLoader()
    stlLoader.load('/assets/wheel.stl', geo => {
      setGeom(geo)
    
    })
  }, [])

  //const geom = useLoader(STLLoader,'./wheel.stl')
  // Rotate mesh every frame, this is outside of React without overhead
  
  return (
    <mesh
      {...props}
      ref={ref}
      geometry={geom}
      scale={1/10}
      position={[0,0,-2]}
      visible
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
       <sphereGeometry/>
      
      <meshStandardMaterial color={hovered ? 'hotpink' : 'whitesmoke'} />
    </mesh>
  )
}

export default function App(props) {
  return (
    <div className="App">
      <div id="canvas-container">
        <Canvas camera={{ position: [9, 9, 12] }} >
          <ambientLight intensity={0.4} />
          <meshStandardMaterial color="hotpink" transparent />
          
          <View />

          <meshPhongMaterial color="#eeeeee" />

          <gridHelper args={[100, 100]} />
          <axesHelper />
          <GizmoHelper style={{ width: 100 }}
           alignment="bottom-right" 
           margin={[60, 110]} >
       <GizmoViewport font="20px Helvetica Neue, Arial, sans-serif" axisColors={['#fc7e98', '#c0ec00', '#73c5ff']} labelColor="black" />
       </GizmoHelper>
          <OrbitControls enableZoom="true" enableRotate="true" />
        </Canvas>
        
      </div>
    </div>
  );
}
