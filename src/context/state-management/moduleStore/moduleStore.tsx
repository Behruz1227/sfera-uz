import { create } from 'zustand';

const moduleData = localStorage.getItem('ModuleData')
const categoryId = localStorage.getItem('CategoryId')
const vedioLink = localStorage.getItem('VedioLink')
const lessonId = localStorage.getItem('LessonId')


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
const ModuleStore = create<ModuleState>((set) => ({
  ModuleData: moduleData || null, // Default to null if not set
  setModuleData: (data) => {
    set({ ModuleData: data });
    localStorage.setItem('ModuleData', data); // Store the value as a string
  },
  CategoryId: categoryId || null, // Default to null if not set
  setCategoryId: (data) => {
    set({ CategoryId: data });
    if (data) {
      localStorage.setItem('CategoryId', data); // Store the value as a string
    } else {
      localStorage.removeItem('CategoryId'); // Remove the item if the value is null
    }
  },
  VedioLink: vedioLink || null, // Default to null if not set
  setVedioLink: (data) => {
    set({ VedioLink: data });
    if (data) {
      localStorage.setItem('VedioLink', data); // Store the value as a string
    } else {
      localStorage.removeItem('VedioLink'); // Remove the item if the value is null
    }
  },
  LessonId: lessonId || null, // Default to null if not set
  setLessonId: (data) => {
    set({ LessonId: data });
    if (data) {
      localStorage.setItem('LessonId', data); // Store the value as a string
    } else {
      localStorage.removeItem('LessonId'); // Remove the item if the value is null
    }
  }
}));

export default ModuleStore;
