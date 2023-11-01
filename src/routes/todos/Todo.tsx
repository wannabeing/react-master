import styled from "styled-components";
import { ITodo, todosAtom } from "../../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  display: flex;
`;

function Todo({ todo }: { todo: ITodo }) {
  // recoil setState
  const setTodos = useSetRecoilState(todosAtom);
  // 🚀 (함수) 할 일의 카테고리를 변경하는 함수
  const onBtnClick = (newCategory: ITodo["category"]) => {
    console.log(newCategory);
  };
  return (
    <Wrapper>
      <li>{todo.text}</li>
      {todo.category !== "DOING" && (
        <button onClick={() => onBtnClick("DOING")}>DOING</button>
      )}
      {todo.category !== "DONE" && (
        <button onClick={() => onBtnClick("DONE")}>DONE</button>
      )}
      {todo.category !== "TODO" && (
        <button onClick={() => onBtnClick("TODO")}>TODO</button>
      )}
    </Wrapper>
  );
}

export default Todo;
