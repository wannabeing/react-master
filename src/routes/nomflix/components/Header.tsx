import styled from "styled-components";
import {
  motion,
  useAnimation,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ISearch {
  search: string;
}

const Nav = styled(motion.nav)`
  z-index: 1;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  padding: 10px 20px;
  font-size: 14px;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  width: 10%;
  height: 10%;
  margin-right: 5%;
  cursor: pointer;
`;
const Menus = styled.ul`
  display: flex;
  align-items: center;
  width: 100%;
`;
const Menu = styled.li`
  position: relative;
  margin-right: 5%;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const ActiveMenu = styled(motion.span)`
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 5px;
  height: 5px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.accentColor};
`;

const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    height: 25px;
  }
  &:hover {
    transition: fill 0.3s ease-in-out;
    fill: ${(props) => props.theme.accentColor};
  }
`;

const SearchInput = styled(motion.input)`
  position: absolute;
  left: -160px;
  outline: none;
  border: none;
  padding: 10px;
  border-radius: 5px;
  /* 변화가 시작되는 위치 설정 */
  transform-origin: right center;
  &:focus {
    border: 2px solid ${(props) => props.theme.accentColor};
  }
`;

// variants
const logoVars = {
  initial: {
    fill: "#27ae60",
  },
  active: {
    fill: "#e67e22",
  },
};

const navVars = {
  initial: {
    backgroundColor: "rgba(255,255,255,0)",
    color: "rgba(255,255,255,1)",
  },
  animate: {
    backgroundColor: "rgba(255,255,255,1)",
    color: "rgba(0,0,0,1)",
    transition: {
      duration: 1,
    },
  },
};

function Header() {
  // routeMatch
  const homeRouteMatch = useRouteMatch("/");
  const tvRouteMatch = useRouteMatch("/tv");

  // variants
  const searchInputAni = useAnimation();
  const searchIconAni = useAnimation();
  const navAni = useAnimation();

  // state
  const [clickSearch, setClicksearch] = useState(false);

  // hooks
  const { scrollY } = useScroll();
  const { register, handleSubmit, setFocus, setValue } = useForm<ISearch>();
  const history = useHistory();

  // eventListeners
  useMotionValueEvent(scrollY, "change", (currentScrollY) => {
    if (currentScrollY > 80) {
      navAni.start("animate");
    } else {
      navAni.start("initial");
    }
  });

  // 🚀 functions
  const onClickSearch = () => {
    if (clickSearch) {
      searchInputAni.start({
        scale: 0,
      });
      searchIconAni.start({
        x: 0,
      });
    } else {
      searchInputAni.start({
        scale: 1,
      });
      searchIconAni.start({
        x: -190,
      });
    }

    setFocus("search");
    setClicksearch((prev) => !prev);
  };

  const onSearchValid = (data: ISearch) => {
    history.push(`/search?keyword=${data.search}`);
    setValue("search", "");
  };

  return (
    <Nav variants={navVars} initial="initial" animate={navAni}>
      <Col>
        {/* 로고 컴포넌트 */}
        <Logo
          variants={logoVars}
          initial="initial"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        {/* 메뉴 컴포넌트 */}
        <Menus>
          <Menu>
            <Link to="/">
              홈{" "}
              {homeRouteMatch?.isExact && <ActiveMenu layoutId="activeMenu" />}
            </Link>
          </Menu>
          <Menu>
            <Link to="/tv">
              티비쇼 {tvRouteMatch && <ActiveMenu layoutId="activeMenu" />}
            </Link>
          </Menu>
        </Menus>
      </Col>
      <Col>
        {/* 검색 컴포넌트 */}
        <Search onSubmit={handleSubmit(onSearchValid)}>
          <motion.svg
            onClick={onClickSearch}
            animate={searchIconAni}
            transition={{ type: "tween" }}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <SearchInput
            {...register("search", { required: true, minLength: 3 })}
            initial={{
              scale: 0,
            }}
            animate={searchInputAni}
            transition={{ type: "linear" }}
            placeholder="검색어를 입력해주세요"
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
