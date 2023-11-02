import styled from "styled-components";
import {
  motion,
  Variants,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useScroll,
} from "framer-motion";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  place-self: center;
  width: 70px;
  height: 70px;
  background-color: white;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

// 1
const firstVars: Variants = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    rotateZ: 360,

    transition: {
      damping: 5,
      type: "spring",
    },
  },
};

// 2
const boxVars: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 5,
      delayChildren: 0.5,
      staggerChildren: 0.15,
    },
  },
};
const circleVars: Variants = {
  initial: {
    opacity: 0,
  },
  animate: { opacity: 1 },
};

function Animations() {
  const xOffset = useMotionValue(0);

  // xOffset의 [-350,350] 사이의 값 비율로 [0.1, 2] 사이의 값으로 변환한다.
  // 기본값은 0, 변환하면 1이다.
  const xTransform = useTransform(xOffset, [-350, 0, 350], [0, 1, 2]);

  const colorTransform = useTransform(
    xOffset,
    [-350, 0, 350],
    [
      "linear-gradient(135deg, rgb(0, 186, 238), rgb(0, 12, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(206, 238, 0), rgb(238, 8, 0))",
    ]
  );

  // y 스크롤 값 변수 (0,1 사이값)
  const { scrollYProgress } = useScroll();

  // 값이 변경되는 걸 감지하는 함수
  useMotionValueEvent(xTransform, "change", (val) => {});

  return (
    <Wrapper style={{ background: colorTransform }}>
      <Box
        style={{
          x: xOffset,
          scale: scrollYProgress,
        }}
        drag="x"
        dragSnapToOrigin
      />
    </Wrapper>
  );
}

export default Animations;
