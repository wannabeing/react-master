import styled from "styled-components";
import {
  IData,
  IMovies,
  getNowPlaying,
  getTopRatedMovie,
  getupComing,
} from "../../api";
import { useQuery } from "react-query";
import { PacmanLoader } from "react-spinners";
import { makeBgImgPath } from "../../utilities";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Banner = styled.div<{ bg: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),
    url(${(props) => props.bg});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 60px;
  color: white;
`;

const BannerTitle = styled.h2`
  font-size: 48px;
  margin-bottom: 20px;
`;

const BannerOverview = styled.p`
  font-size: 28px;
`;

const LatestMovies = styled.div`
  position: relative;
  top: -200px;
  padding: 0 20px;
  margin-bottom: 50px;
  color: white;
`;

const AnotherMovies = styled.div`
  padding: 0 20px;
  margin-bottom: 30vh;
`;

const Title = styled.h3`
  font-size: 28px;
  margin-bottom: 20px;
  color: white;
`;

const Slider = styled.div`
  position: relative;
`;
const SliderRow = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
`;
const SliderBox = styled(motion.div)<{ bg: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),
    url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  background-color: black;
  height: 20vh;
  border-radius: 25px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const SliderBoxTitle = styled(motion.p)`
  width: 100%;
  background-color: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1));
  text-align: center;
  padding: 10px 0;
`;

const SliderBoxInfo = styled(motion.div)`
  opacity: 0;
  font-size: 12px;
`;

const Modal = styled(motion.div)<{ bg?: string }>`
  position: fixed;
  width: 60vw;
  height: 40vh;
  background-color: black;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),
    url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  top: 30vh;
  left: 20vw;
  border-radius: 25px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  color: white;
`;
const ModalTitle = styled.h2`
  margin-top: 10%;
  font-size: 28px;
`;
const ModalInfo = styled.span`
  padding: 0 40px;
  margin-top: 3%;
  font-size: 14px;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
`;

// variants
const sliderRowVars = {
  hidden: {
    x: window.innerWidth,
  },
  visible: {
    x: 0,
    transition: {
      type: "tween",
      duration: 1,
    },
  },
  exit: {
    x: -window.innerWidth,
    transition: {
      duration: 1,
    },
  },
};

const sliderBoxVars = {
  initial: {
    scale: 1,
  },
  hover: {
    color: "#27ae60",
    scale: 1.3,
    y: -50,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.3,
    },
  },
};

const sliderBoxInfoVars = {
  hover: {
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.3,
    },
  },
};

const overlayVars = {
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

// 한번에 보여주고 싶은 콘텐츠 개수
const offset = 6;

function Home() {
  // api data
  const { data: nowData, isLoading: nowLoading } = useQuery<IMovies>(
    ["movies", "nowPlaying"],
    getNowPlaying
  );
  const { data: topData, isLoading: topLoading } = useQuery<IMovies>(
    ["movies", "topRated"],
    getTopRatedMovie
  );
  const { data: upData, isLoading: upLoading } = useQuery<IMovies>(
    ["movies", "upcoming"],
    getupComing
  );

  // state
  const [nowIndex, setNowIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [upIndex, setUpIndex] = useState(0);
  const [modalData, setModalData] = useState<IData>();
  const [sliderWorking, setSliderWorking] = useState(false); // slider 중복 클릭 방지

  // hooks
  const history = useHistory();
  const modalRouteMatch = useRouteMatch<{ movieID: string }>(
    "/movies/:movieID"
  );

  // functions
  // slider Index 증가시키는 함수
  const inreaseIndex = (
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    data?: IMovies
  ) => {
    if (data) {
      // slider 애니메이션 진행중이면 return
      if (sliderWorking) return;
      toggleBooleanState(setSliderWorking);

      // 콘텐츠 개수와 최대 인덱스
      const movieLength = data.results.length - 1;
      const maxIndex = Math.ceil(movieLength / offset) - 2;

      // 현재 최대인덱스면 0번인덱스로 이동, 아니면 인덱스 1증가
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  // boolean State값을 토글해주는 함수
  const toggleBooleanState = (
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setState((prev) => !prev);
  };

  // modal 함수
  const onModal = (movie: IData) => {
    setModalData(movie);
    history.push(`/movies/${movie.id}`);
  };
  const onOverlay = () => {
    history.goBack();
  };

  return (
    <Wrapper>
      {nowLoading || topLoading || upLoading ? (
        <Loader>
          <PacmanLoader color="white" />
        </Loader>
      ) : (
        <>
          <Banner bg={makeBgImgPath(nowData?.results[0].backdrop_path || "")}>
            <BannerTitle>{nowData?.results[0].title}</BannerTitle>
            <BannerOverview>{nowData?.results[0].overview}</BannerOverview>
          </Banner>
          {/* nowPlaying SLIDER */}
          <LatestMovies>
            <Title>최근 영화들</Title>
            <button onClick={() => inreaseIndex(setNowIndex, nowData)}>
              next
            </button>
            <Slider>
              <AnimatePresence
                initial={false}
                onExitComplete={() => toggleBooleanState(setSliderWorking)}
              >
                <SliderRow
                  key={nowIndex}
                  variants={sliderRowVars}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {nowData?.results
                    .slice(1)
                    .slice(offset * nowIndex, offset * nowIndex + offset)
                    .map((movie) => (
                      <SliderBox
                        key={movie.id}
                        layoutId={movie.id + ""}
                        bg={makeBgImgPath(
                          movie.backdrop_path || movie.poster_path,
                          "w500"
                        )}
                        onClick={() => onModal(movie)}
                        variants={sliderBoxVars}
                        initial="initial"
                        whileHover="hover"
                      >
                        <SliderBoxTitle>{movie.title}</SliderBoxTitle>
                        <SliderBoxInfo variants={sliderBoxInfoVars}>
                          {movie.release_date}
                        </SliderBoxInfo>
                      </SliderBox>
                    ))}
                </SliderRow>
              </AnimatePresence>
            </Slider>
          </LatestMovies>
          {/* topRated SLIDER */}
          <AnotherMovies>
            <button onClick={() => inreaseIndex(setTopIndex, topData)}>
              next
            </button>
            <Title>평점 높은 영화들</Title>
            <Slider>
              <AnimatePresence
                initial={false}
                onExitComplete={() => toggleBooleanState(setSliderWorking)}
              >
                <SliderRow
                  key={topIndex}
                  variants={sliderRowVars}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {topData?.results
                    .slice(offset * topIndex, offset * topIndex + offset)
                    .map((movie) => (
                      <SliderBox
                        onClick={() => onModal(movie)}
                        layoutId={movie.id + ""}
                        key={movie.id}
                        bg={makeBgImgPath(
                          movie.backdrop_path || movie.poster_path,
                          "w500"
                        )}
                        variants={sliderBoxVars}
                        initial="initial"
                        whileHover="hover"
                      >
                        <SliderBoxTitle>{movie.title}</SliderBoxTitle>
                        <SliderBoxInfo variants={sliderBoxInfoVars}>
                          {movie.release_date}
                        </SliderBoxInfo>
                      </SliderBox>
                    ))}
                </SliderRow>
              </AnimatePresence>
            </Slider>
          </AnotherMovies>
          {/* upComing SLIDER */}
          <AnotherMovies>
            <button onClick={() => inreaseIndex(setUpIndex, upData)}>
              next
            </button>
            <Title>곧 개봉하는 영화들</Title>
            <Slider>
              <AnimatePresence
                initial={false}
                onExitComplete={() => toggleBooleanState(setSliderWorking)}
              >
                <SliderRow
                  key={upIndex}
                  variants={sliderRowVars}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {upData?.results
                    .slice(offset * upIndex, offset * upIndex + offset)
                    .map((movie) => (
                      <SliderBox
                        onClick={() => onModal(movie)}
                        layoutId={movie.id + ""}
                        key={movie.id}
                        bg={makeBgImgPath(
                          movie.backdrop_path || movie.poster_path,
                          "w500"
                        )}
                        variants={sliderBoxVars}
                        initial="initial"
                        whileHover="hover"
                      >
                        <SliderBoxTitle>{movie.title}</SliderBoxTitle>
                        <SliderBoxInfo variants={sliderBoxInfoVars}>
                          {movie.release_date}
                        </SliderBoxInfo>
                      </SliderBox>
                    ))}
                </SliderRow>
              </AnimatePresence>
            </Slider>
          </AnotherMovies>
          <AnimatePresence>
            {modalRouteMatch ? (
              <>
                <ModalOverlay
                  onClick={onOverlay}
                  variants={overlayVars}
                  animate="animate"
                  exit="exit"
                />
                <Modal
                  layoutId={modalRouteMatch.params.movieID}
                  bg={makeBgImgPath(
                    modalData?.backdrop_path || modalData?.poster_path || ""
                  )}
                >
                  <ModalTitle>{modalData?.title}</ModalTitle>
                  <ModalInfo>{modalData?.overview}</ModalInfo>
                  <ModalInfo>{modalData?.release_date}</ModalInfo>
                  <ModalInfo>{modalData?.vote_average}점</ModalInfo>
                </Modal>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
