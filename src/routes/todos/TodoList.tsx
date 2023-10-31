import { useForm } from "react-hook-form";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.span`
  font-size: 10px;
  color: red;
  margin: 5px 0;
`;

interface IForm {
  todo: string;
}

export function TodoList() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const onValid = (data: IForm) => {
    if (data.todo === "password") {
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
    setValue("todo", "");
  };

  const todoValidate1 = (value: string) => {
    if (value === "ttttt") {
      return "한번 틀리면 계속 검사함";
    }
  };
  const todoValidate2 = (value: string) => {
    if (value === "yyyyy") {
      return "한번 틀리면 계속 검사함2";
    }
  };
  const todoValidate3 = async (value: string) => {
    if (value === "server") {
      return "async await으로도 받을 수 있습니다";
    }
  };

  const onInvalid = (data: any) => {
    console.log(data);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid, onInvalid)}>
        <input
          {...register("todo", {
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
          placeholder="입력하시오-"
        />
        <ErrorMessage>{errors?.todo?.message as string}</ErrorMessage>
        <button>submit</button>
      </Form>
    </Wrapper>
  );
}
