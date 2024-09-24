import { create } from 'zustand';
import { useEffect } from 'react';

// Define the type for the store's state
interface ModuleState {
  ModuleData: any;
  setModuleData: (data: any) => void;
  CategoryId: string | null;
  setCategoryId: (data: string | null) => void;
  VedioLink: string | null;
  setVedioLink: (data: string | null) => void;
  LessonId: string | null;
  setLessonId: (data: string | null) => void;
}

// Create the store
const useModuleStore = create<ModuleState>((set) => ({
  ModuleData: null,
  setModuleData: (data) => {
    set({ ModuleData: data });
    localStorage.setItem('ModuleData', JSON.stringify(data)); // Store as a string
  },
  CategoryId: null,
  setCategoryId: (data) => {
    set({ CategoryId: data });
    if (data) {
      localStorage.setItem('CategoryId', data); // Store as a string
    } else {
      localStorage.removeItem('CategoryId'); // Remove if null
    }
  },
  VedioLink: null,
  setVedioLink: (data) => {
    set({ VedioLink: data });
    // if (data) {
    //   localStorage.setItem('VedioLink', data); // Store as a string
    // } else {
    //   localStorage.removeItem('VedioLink'); // Remove if null
    // }
  },
  LessonId: null,
  setLessonId: (data) => {
    set({ LessonId: data });
    if (data) {
      localStorage.setItem('LessonId', data); // Store as a string
    } else {
      localStorage.removeItem('LessonId'); // Remove if null
    }
  }
}));

// Create a custom hook to initialize state from localStorage
export const useInitializeModuleStore = () => {
  const { setModuleData, setCategoryId, setVedioLink, setLessonId } = useModuleStore();

  useEffect(() => {
    const moduleData = localStorage.getItem('ModuleData');
    const categoryId = localStorage.getItem('CategoryId');
    // const vedioLink = localStorage.getItem('VedioLink');
    const lessonId = localStorage.getItem('LessonId');

    if (moduleData) {
      setModuleData(JSON.parse(moduleData));
    }
    setCategoryId(categoryId);
    // setVedioLink(vedioLink);
    setLessonId(lessonId);
  }, [setModuleData, setCategoryId, setVedioLink, setLessonId]);
};

export default useModuleStore;
