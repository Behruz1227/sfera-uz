import create from 'zustand';

interface LessonStore {
  selectedLessonId: number;
  setSelectedLessonId: (id: number) => void;
  questionData: any;
  setquestionData: (id: any) => void;
  currentLessonId: any;
  setCurrentLessonId: (id: any) => void;
  nextLessonId: any;
  setNextLessonId: (id: any) => void;
  result: any;
  setResult: (data: any) => void;
}

export const useLessonStore = create<LessonStore>((set) => ({
  selectedLessonId: 0,
  setSelectedLessonId: (id) => set({ selectedLessonId: id }),
  questionData: [],
  setquestionData: (id) => set({ questionData: id }),
  nextLessonId: null,
  setNextLessonId:  (id) => set({nextLessonId: id}),
  setCurrentLessonId: (id) => set({currentLessonId: id}), 
  currentLessonId: null,
  setResult: (data) => set({result: data}), 
  result: null,
}));
