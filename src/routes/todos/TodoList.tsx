import { useState } from "react";
import { useForm } from "react-hook-form";

export function TodoList() {
  const { register, watch } = useForm();

  return (
    <form>
      <input {...register("todo")} type="text" placeholder="입력" />
      <button>submit</button>
    </form>
  );
}
