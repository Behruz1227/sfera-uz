import { create } from 'zustand';

// Define the type for the store's state
interface MeeState {
  getMeeData: any;
  setGetMeeData: (data: any) => void;
  imgUpload: any;
  setImgUpload: (val: any) => void;  // Add the new property to the state type
}

// Create the store
const useMeeStore = create<MeeState>((set) => ({
    getMeeData: null,
    setGetMeeData: (data) => set({getMeeData: data}),
    imgUpload: null,
    setImgUpload: (val: any) => set({imgUpload: val}),
}));

export default useMeeStore;
