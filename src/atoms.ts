import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
  category: "DOING" | "DONE" | "TODO";
}

export const darkThemeAtom = atom({
  key: "darkTheme",
  default: false,
});

export const todosAtom = atom<ITodo[]>({
  key: "todos",
  default: [],
});
