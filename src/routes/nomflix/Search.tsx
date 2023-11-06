import styled from "styled-components";
import { IData, IMovies, ITvs, getSearchMovie, getSearchTv } from "../../api";
import { useQuery } from "react-query";
import { PacmanLoader } from "react-spinners";
import { makeBgImgPath } from "../../utilities";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

function Search() {
  // params
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  // api data
  const { data: movieData, isLoading: movieLoading } = useQuery<IMovies>(
    ["search", "movies"],
    () => getSearchMovie(keyword || "")
  );

  const { data: tvData, isLoading: tvLoading } = useQuery<ITvs>(
    ["search", "tv"],
    () => getSearchTv(keyword || "")
  );

  // state
  const [movieIndex, setMovieIndex] = useState(0);
  const [tvIndex, setTvIndex] = useState(0);
  const [modalData, setModalData] = useState<IData>();
  const [sliderWorking, setSliderWorking] = useState(false); // slider 중복 클릭 방지

  // hooks
  const history = useHistory();
  const modalRouteMatch = useRouteMatch<{ id: string }>("/search/:id");

  // functions
  // slider Index 증가시키는 함수
  const inreaseIndex = (
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    data?: IMovies | ITvs
  ) => {
    if (data) {
      // slider 애니메이션 진행중이면 return
      if (sliderWorking) return;
      toggleBooleanState(setSliderWorking);

      // 콘텐츠 개수와 최대 인덱스
      const dataLength = data.results.length - 1;
      const maxIndex = Math.ceil(dataLength / offset) - 2;

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
  const onModal = (data: IData) => {
    setModalData(data);
    history.push(`/search/${data.id}`);
  };
  const onOverlay = () => {
    history.goBack();
  };

  return (
    <Wrapper>
      {movieLoading || tvLoading ? (
        <Loader>
          <PacmanLoader color="white" />
        </Loader>
      ) : (
        <>
          {movieData && tvData === null ? (
            <Loader>검색하신 결과가 없습니다 ㅠ</Loader>
          ) : (
            <>
              <Banner
                bg={makeBgImgPath(movieData?.results[0].backdrop_path || "")}
              >
                <BannerTitle>{movieData?.results[0].title}</BannerTitle>
                <BannerOverview>
                  {movieData?.results[0].overview}
                </BannerOverview>
              </Banner>
              {/* movie SLIDER */}
              <LatestMovies>
                <Title>영화</Title>
                <button onClick={() => inreaseIndex(setMovieIndex, movieData)}>
                  next
                </button>
                <Slider>
                  <AnimatePresence
                    initial={false}
                    onExitComplete={() => toggleBooleanState(setSliderWorking)}
                  >
                    <SliderRow
                      key={movieIndex}
                      variants={sliderRowVars}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {movieData?.results
                        .slice(1)
                        .slice(
                          offset * movieIndex,
                          offset * movieIndex + offset
                        )
                        .map((movie) => (
                          <SliderBox
                            key={movie.id}
                            layoutId={movie.id + ""}
                            bg={makeBgImgPath(
                              movie.backdrop_path || movie.poster_path || "",
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
              {/* tv SLIDER */}
              <AnotherMovies>
                <button onClick={() => inreaseIndex(setTvIndex, tvData)}>
                  next
                </button>
                <Title>TV쇼</Title>
                <Slider>
                  <AnimatePresence
                    initial={false}
                    onExitComplete={() => toggleBooleanState(setSliderWorking)}
                  >
                    <SliderRow
                      key={tvIndex}
                      variants={sliderRowVars}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {tvData?.results
                        .slice(offset * tvIndex, offset * tvIndex + offset)
                        .map((tv) => (
                          <SliderBox
                            onClick={() => onModal(tv)}
                            layoutId={tv.id + ""}
                            key={tv.id}
                            bg={makeBgImgPath(
                              tv.backdrop_path || tv.poster_path || "",
                              "w500"
                            )}
                            variants={sliderBoxVars}
                            initial="initial"
                            whileHover="hover"
                          >
                            <SliderBoxTitle>{tv.name}</SliderBoxTitle>
                            <SliderBoxInfo variants={sliderBoxInfoVars}>
                              {tv.first_air_date}
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
                      layoutId={modalRouteMatch.params.id}
                      bg={makeBgImgPath(
                        modalData?.backdrop_path || modalData?.poster_path || ""
                      )}
                    >
                      <ModalTitle>{modalData?.title}</ModalTitle>
                      <ModalInfo>{modalData?.overview}</ModalInfo>
                      <ModalInfo>
                        {modalData?.release_date
                          ? modalData.release_date
                          : modalData?.first_air_date}
                      </ModalInfo>
                      <ModalInfo>{modalData?.vote_average}점</ModalInfo>
                    </Modal>
                  </>
                ) : null}
              </AnimatePresence>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Search;
