import { create } from "zustand";

interface ListingState {
  step: number;
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  occupants: number;
  latitude: number;
  longitude: number;
  addressString: string;
  imageSrcs: string[];
  image: string;
  setTitle: (title: string) => void;
  setBathrooms: (bathrooms: number) => void;
  setBedrooms: (bedrooms: number) => void;
  setOccupants: (occupants: number) => void;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  setAddressString: (addressString: string) => void;
  setPrice: (price: number) => void;
  setImage: (image: string) => void;
  setImageSrcs: (imageSrc: string[]) => void;
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
  latitude: 0,
  longitude: 0,
  addressString: "",
  imageSrcs: [],
  image: "",
  setTitle: (title: string) => set({ title }),
  setBathrooms: (bathrooms: number) => set({ bathrooms }),
  setBedrooms: (bedrooms: number) => set({ bedrooms }),
  setOccupants: (occupants: number) => set({ occupants }),
  setLatitude: (latitude: number) => set({ latitude }),
  setLongitude: (longitude: number) => set({ longitude }),
  setAddressString: (addressString: string) => set({ addressString }),
  setPrice: (price: number) => set({ price }),
  setImage: (image: string) => set({ image }),
  setImageSrcs: (imageSrcs: string[]) => set({ imageSrcs }),
  onHandleNext: () => set((state) => ({ step: state.step + 1 })),
  onHandleBack: () => set((state) => ({ step: state.step - 1 })),
}));
