import styled from "styled-components";
import Helmet from "react-helmet";
import { useRecoilValue } from "recoil";

import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { todoCategoryAtom, todosSelector } from "../../atoms";

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

const Selector = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  padding: 20px 0;
`;

function TodoList() {
  // recoil state
  const todoCategory = useRecoilValue(todoCategoryAtom);
  const todos = useRecoilValue(todosSelector);

  return (
    <>
      <Helmet>
        <title>Todo LIST</title>
      </Helmet>
      <Wrapper>
        <h1>투두리스트</h1>

        <TodoForm />
        <Selector>
          <h3>{todoCategory}</h3>
          <List>
            <ul>
              {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} />
              ))}
            </ul>
          </List>
        </Selector>
      </Wrapper>
    </>
  );
}

export default TodoList;
