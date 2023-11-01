import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesAtom, todoCategoryAtom, todosAtom } from "../../atoms";

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.span`
  font-size: 10px;
  color: red;
  margin: 5px 0;
`;

// 🚀 (함수)유효성검사 함수1
const todoValidate1 = (value: string) => {
  if (value === "ttttt") {
    return "한번 틀리면 계속 검사함";
  }
};
// 🚀 (함수)유효성검사 함수2
const todoValidate2 = (value: string) => {
  if (value === "yyyyy") {
    return "한번 틀리면 계속 검사함2";
  }
};
// 🚀 (함수)유효성검사 함수3
const todoValidate3 = async (value: string) => {
  if (value === "server") {
    return "async await으로도 받을 수 있습니다";
  }
};

// 🚀 (함수) 유효하지 않은 값을 받았을 때
const onInvalid = (data: any) => {};

interface IForm {
  todo: string;
}
interface IFormCategory {
  category: string;
}

function TodoForm() {
  // recoil setState
  const setTodos = useSetRecoilState(todosAtom);
  const [categoryState, setCategorystate] = useRecoilState(todoCategoryAtom);
  const [categories, setCategories] = useRecoilState(categoriesAtom);

  // react-hook-form
  const {
    register: todoRegister,
    handleSubmit: todoHandleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const {
    register: categoryRegister,
    handleSubmit: categoryHandleSubmit,
    setValue: setCategoryVal,
  } = useForm<IFormCategory>();

  // 🚀 (함수) 유효한 값을 받았을 때
  const onValid = ({ todo }: IForm) => {
    if (todo === "password") {
      setError(
        "todo",
        {
          message: "submit하고 나서는 검사 안함",
        },
        {
          shouldFocus: true,
        }
      );
    }
    // recoil state 저장
    setTodos((prev) => [
      { id: Date.now(), text: todo, category: categoryState },
      ...prev,
    ]);
    setValue("todo", ""); // input 초기화
  };

  const onSelectInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategorystate(event.currentTarget.value);
  };

  const onCategorySubmit = ({ category }: IFormCategory) => {
    setCategories((prev) => [...prev, category]);
    setCategoryVal("category", "");
  };

  return (
    <>
      <Form onSubmit={categoryHandleSubmit(onCategorySubmit)}>
        <input
          {...categoryRegister("category")}
          id="category"
          type="text"
          placeholder="사용자 카테고리 추가하기"
        />
        <button>추가</button>
      </Form>
      <Form onSubmit={todoHandleSubmit(onValid, onInvalid)}>
        <select onInput={onSelectInput}>
          {categories.map((cateogry) => (
            <option key={cateogry} value={cateogry}>
              {cateogry}
            </option>
          ))}
        </select>
        <input
          {...todoRegister("todo", {
            required: "값을 입력해주세요",
            minLength: { message: "5자 이상입니다.", value: 5 },
            pattern: {
              value: /^[^\d]+$/,
              message: "숫자는 들어가면 안됩니다.",
            },
            validate: {
              todoValidate1: todoValidate1,
              todoValidate2: todoValidate2,
              todoValidate3: todoValidate3,
            },
          })}
          type="text"
          placeholder="할 일을 입력하시오"
        />
        <ErrorMessage>{errors?.todo?.message as string}</ErrorMessage>
        <button>저장</button>
      </Form>
    </>
  );
}

export default TodoForm;
