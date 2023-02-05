import React, { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  useViewportScroll,
  Variants,
} from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 500vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const boxVariants: Variants = {
  hover: { rotateZ: '90deg', scale: '1.5' },
  click: { scale: '1', borderRadius: '100px' },
  drag: { backgroundColor: 'rgb(46, 204, 113)', transition: { duration: 1 } },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-450, 450], [-360, 360]);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
  // const gradient = useTransform(
  //   x,
  //   [-800, 800],
  //   [
  //     'linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))',
  //     'linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))',
  //   ]
  // );
  useEffect(() => {
    // x.onChange(() => console.log(x.get()));
    // scale.onChange(() => console.log(scale.get()));
    // scrollY.onChange(() => console.log(scrollY.get()));
    scrollYProgress.onChange(() => console.log(scrollYProgress.get()));
  }, [x]);

  return (
    <Wrapper style={{}}>
      <button onClick={() => x.set(200)}>Click me</button>
      <Box drag='x' style={{ x, rotateZ, scale }} dragSnapToOrigin></Box>
    </Wrapper>
  );
}

export default App;
