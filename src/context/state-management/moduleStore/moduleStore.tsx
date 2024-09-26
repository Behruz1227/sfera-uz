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
    sessionStorage.setItem('ModuleData', JSON.stringify(data)); // Store as a string
  },
  CategoryId: null,
  setCategoryId: (data) => {
    set({ CategoryId: data });
    if (data) {
      sessionStorage.setItem('CategoryId', data); // Store as a string
    } else {
      sessionStorage.removeItem('CategoryId'); // Remove if null
    }
  },
  VedioLink: null,
  setVedioLink: (data) => {
    set({ VedioLink: data });
    // if (data) {
    //   sessionStorage.setItem('VedioLink', data); // Store as a string
    // } else {
    //   sessionStorage.removeItem('VedioLink'); // Remove if null
    // }
  },
  LessonId: null,
  setLessonId: (data) => {
    set({ LessonId: data });
    if (data) {
      sessionStorage.setItem('LessonId', data); // Store as a string
    } else {
      sessionStorage.removeItem('LessonId'); // Remove if null
    }
  }
}));

// Create a custom hook to initialize state from sessionStorage
export const useInitializeModuleStore = () => {
  const { setModuleData, setCategoryId, setVedioLink, setLessonId } = useModuleStore();

  useEffect(() => {
    const moduleData = sessionStorage.getItem('ModuleData');
    const categoryId = sessionStorage.getItem('CategoryId');
    // const vedioLink = sessionStorage.getItem('VedioLink');
    const lessonId = sessionStorage.getItem('LessonId');

    setCategoryId(categoryId);
    // setVedioLink(vedioLink);
    setLessonId(lessonId);
    if (moduleData) {
      setModuleData(JSON.parse(moduleData));
    }
  }, [setModuleData, setCategoryId, setVedioLink, setLessonId]);
};

export default useModuleStore;
