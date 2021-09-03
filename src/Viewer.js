import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three-stdlib";
import React,{useRef,useEffect,useThree} from "react";


const Model = ({url}) => {
  const geom = useLoader(STLLoader, url);

  const ref = useRef();
  const {camera} = useThree();
  useEffect(() => {
      camera.lookAt(ref.current.position);
  });

  return (
      <>
          <mesh ref={ref}>
              <primitive object={geom} attach="geometry"/>
              <meshStandardMaterial color={"orange"}/>
          </mesh>
          <ambientLight/>
          <pointLight position={[10, 10, 10]}/>
      </>
  );
};
export default Model