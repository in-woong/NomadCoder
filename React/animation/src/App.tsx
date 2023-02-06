import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28;

  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const boxVariants = {
  entry: (isBack: boolean) => ({
    x: isBack ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: () => ({
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  }),
  exit: (isBack: boolean) => ({
    x: isBack ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: { duration: 0.3 },
  }),
};
function App() {
  const [showing, setShowing] = useState(false);
  const [visible, setVisible] = useState(1);
  const [isBack, setBack] = useState(false);

  const nextBox = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 1 : prev + 1));
  };
  const prevBox = () => {
    setBack(true);
    setVisible((prev) => (prev === 0 ? 10 : prev - 1));
  };
  return (
    <Wrapper>
      <AnimatePresence mode='wait' custom={isBack}>
        <Box
          drag
          dragSnapToOrigin
          variants={boxVariants}
          custom={isBack}
          initial='entry'
          animate='center'
          exit='exit'
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={nextBox}>next</button>
      <button onClick={prevBox}>prev</button>
    </Wrapper>
  );
}

export default App;
