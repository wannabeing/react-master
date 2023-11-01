import styled from "styled-components";
import Helmet from "react-helmet";
import { useRecoilValue } from "recoil";
import { todosAtom } from "../../atoms";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20%;
`;

const List = styled.div`
  margin-top: 10px;
`;

function TodoList() {
  // recoil state
  const todos = useRecoilValue(todosAtom);

  return (
    <>
      <Helmet>
        <title>Todo LIST</title>
      </Helmet>
      <Wrapper>
        <h1>투두리스트</h1>
        <TodoForm />
        <List>
          <ul>
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </ul>
        </List>
      </Wrapper>
    </>
  );
}

export default TodoList;
