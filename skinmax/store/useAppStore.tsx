import { create } from 'zustand';

type SkinData = {
  image: string | null;
  answers: Record<string, any>;
  setImage: (uri: string) => void;
  setAnswers: (answers: Record<string, any>) => void;
};

export const useAppStore = create<SkinData>((set) => ({
  image: null,
  answers: {},
  setImage: (uri) => set({ image: uri }),
  setAnswers: (answers) => set({ answers }),
}));
