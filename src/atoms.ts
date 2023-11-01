import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ITodo {
  id: number;
  text: string;
  category: string;
}

const { persistAtom } = recoilPersist();

export const darkThemeAtom = atom({
  key: "darkTheme",
  default: false,
});

export const todosAtom = atom<ITodo[]>({
  key: "todos",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const todoCategoryAtom = atom({
  key: "todoCategory",
  default: "TODO",
  effects_UNSTABLE: [persistAtom],
});

export const categoriesAtom = atom<string[]>({
  key: "categories",
  default: ["TODO", "DOING", "DONE"],
  effects_UNSTABLE: [persistAtom],
});

// selector는 atom을 가져와 output을 변경할 수 있는 기능이다.
export const todosSelector = selector({
  key: "todosSelector",
  get: ({ get }) => {
    const todos = get(todosAtom);
    const category = get(todoCategoryAtom);

    return todos.filter((todo) => todo.category === category);
  },
});
