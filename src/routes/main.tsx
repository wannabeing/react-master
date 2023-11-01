import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const LinkPage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.accentColor};
  }
`;

function Main() {
  return (
    <Wrapper>
      <Link
        to={{
          pathname: "/coin",
        }}
      >
        <LinkPage>코인페이지</LinkPage>
      </Link>
      <Link
        to={{
          pathname: "/todo",
        }}
      >
        <LinkPage>투두페이지</LinkPage>
      </Link>
    </Wrapper>
  );
}

export default Main;
