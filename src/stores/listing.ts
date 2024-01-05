import { create } from "zustand";

interface ListingState {
  step: number;
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  occupants: number;
  schoolDistance: string;
  imageSrc: string;
  image: string;
  setTitle: (title: string) => void;
  setBathrooms: (bathrooms: number) => void;
  setBedrooms: (bedrooms: number) => void;
  setOccupants: (occupants: number) => void;
  setSchoolDistance: (schoolDistance: string) => void;
  setPrice: (price: number) => void;
  setImage: (image: string) => void;
  setImageSrc: (imageSrc: string) => void;
  onHandleNext: () => void;
  onHandleBack: () => void;
}

export const useListingStore = create<ListingState>((set) => ({
  step: 1,
  id: "",
  title: "",
  price: 0,
  bedrooms: 0,
  bathrooms: 0,
  occupants: 0,
  schoolDistance: "",
  imageSrc: "",
  image: "",
  setTitle: (title: string) => set({ title }),
  setBathrooms: (bathrooms: number) => set({ bathrooms }),
  setBedrooms: (bedrooms: number) => set({ bedrooms }),
  setOccupants: (occupants: number) => set({ occupants }),
  setSchoolDistance: (schoolDistance: string) => set({ schoolDistance }),
  setPrice: (price: number) => set({ price }),
  setImage: (image: string) => set({ image }),
  setImageSrc: (imageSrc: string) => set({ imageSrc }),
  onHandleNext: () => set((state) => ({ step: state.step + 1 })),
  onHandleBack: () => set((state) => ({ step: state.step - 1 })),
}));