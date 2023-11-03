import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const BoxWrapper = styled(motion.div)`
  width: 50%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  position: relative;
`;

const Box = styled(motion.div)`
  place-self: center;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

  &:first-child {
  }
`;

const Circle = styled(motion.div)`
  place-self: center;
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Button = styled.button`
  cursor: pointer;
  margin-top: 20px;
  padding: 20px;
  border: none;
  border-radius: 20px;

  &:hover {
    opacity: 0.8;
  }
`;

const Modal = styled(motion.div)`
  position: absolute;
  top: 30%;
  left: 30%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 20px;
  background-color: white;
  cursor: pointer;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function Animations() {
  const xOffset = useMotionValue(0);

  // xOffset의 [-350,350] 사이의 값 비율로 [0.1, 2] 사이의 값으로 변환한다.
  // 기본값은 0, 변환하면 1이다.
  const xTransform = useTransform(xOffset, [-350, 0, 350], [0, 1, 2]);

  // 값이 변경되는 걸 감지하는 함수
  useMotionValueEvent(xTransform, "change", (val) => {});

  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [switchBtn, setSwitchBtn] = useState(false);

  const toggleModal1 = () => setModal1((prev) => !prev);
  const toggleModal2 = () => setModal2((prev) => !prev);
  const toggleSwitchBtn = () => setSwitchBtn((prev) => !prev);
  return (
    <Wrapper>
      <BoxWrapper>
        <AnimatePresence>
          {!modal1 ? (
            <Box
              layoutId="modal1"
              onClick={toggleModal1}
              whileHover={{ scaleX: 1.2, originX: 1, scaleY: 1.2, originY: 1 }}
            />
          ) : (
            <Box layoutId="modal1" style={{ opacity: 0 }} />
          )}
        </AnimatePresence>
        {modal1 ? <Modal layoutId="modal1" onClick={toggleModal1} /> : null}
        <Box>{switchBtn ? <Circle layoutId="circle" /> : null}</Box>
        <Box>{!switchBtn ? <Circle layoutId="circle" /> : null}</Box>
        <AnimatePresence>
          {!modal2 ? (
            <Box
              layoutId="modal2"
              onClick={toggleModal2}
              whileHover={{ scaleX: 1.2, originX: 0, scaleY: 1.2, originY: 0 }}
            />
          ) : (
            <Box layoutId="modal2" style={{ opacity: 0 }} />
          )}
        </AnimatePresence>
        {modal2 ? <Modal layoutId="modal2" onClick={toggleModal2} /> : null}
      </BoxWrapper>
      <Button onClick={toggleSwitchBtn}>SWITCH</Button>
    </Wrapper>
  );
}

export default Animations;
