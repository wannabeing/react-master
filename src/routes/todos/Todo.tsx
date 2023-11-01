import styled from "styled-components";
import { ITodo, categoriesAtom, todosAtom } from "../../atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";

const Wrapper = styled.div`
  display: flex;
`;

function Todo({ todo }: { todo: ITodo }) {
  // recoil setState
  const setTodos = useSetRecoilState(todosAtom);
  const categories = useRecoilValue(categoriesAtom);

  // 🚀 (함수) 할 일의 카테고리를 변경하는 함수
  const onBtnClick = (newCategory: string) => {
    setTodos((prevTodos) => {
      const targetIndex = prevTodos.findIndex((value) => value.id === todo.id);

      const newTodo = { id: todo.id, text: todo.text, category: newCategory };

      return [
        ...prevTodos.slice(0, targetIndex),
        newTodo,
        ...prevTodos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <Wrapper>
      <li>{todo.text}</li>
      {categories.map(
        (category) =>
          todo.category !== category && (
            <button
              key={category}
              onClick={() => onBtnClick(category.toUpperCase())}
            >
              {category.toUpperCase()}
            </button>
          )
      )}
    </Wrapper>
  );
}

export default Todo;
