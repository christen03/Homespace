import { create } from "zustand";
import {type Gender, type RoomType, type Person, type Tag} from "~/types";


interface ListingState {
  step: number;
  id: string;
  title: string;
  price: number;
  sharedSpace: boolean;
  bedrooms: number;
  bathrooms: number;
  occupants?: Person[]; 
  roomType?: RoomType; 
  preferredGender? : Gender;
  minAge?: number;  
  maxAge?: number;  
  latitude: number;
  longitude: number;
  descriptionTags: Tag[];
  addressString: string;
  imageSrcs: string[];
  image: string;
  listingStart: Date;
  listingEnd: Date;
  setTitle: (title: string) => void;
  setBathrooms: (bathrooms: number) => void;
  setBedrooms: (bedrooms: number) => void;
  setSharedSpace: (sharedSpace: boolean) => void;
  setOccupants: (occupants?: Person[]) => void; 
  setRoomType: (roomType?: RoomType) => void; 
  setPreferredGender: (preferredGender?: Gender) => void;
  setMinAge: (minAge?: number) => void;
  setMaxAge: (maxAge?: number) => void;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  setDescriptionTags: (descriptionTags: Tag[]) => void;
  setAddressString: (addressString: string) => void;
  setPrice: (price: number) => void;
  setImage: (image: string) => void;
  setImageSrcs: (imageSrc: string[]) => void;
  setListingStart: (listingStart: Date) => void;
  setListingEnd: (listingEnd: Date) => void;
  onHandleNext: () => void;
  onHandleBack: () => void;
  onHandleDone: () => void;
}

export const useListingStore = create<ListingState>((set) => ({
  step: 1,
  id: "",
  title: "",
  price: 0,
  sharedSpace: false,
  bedrooms: 0,
  bathrooms: 0,
  occupants: undefined, // Default to undefined since it's optional
  roomType: undefined,
  preferredGender: undefined,
  minAge: undefined,
  maxAge: undefined,
  latitude: 0,
  longitude: 0,
  descriptionTags: [],
  addressString: "",
  imageSrcs: [],
  image: "",
  listingStart: new Date(),
  listingEnd: new Date(),
  setTitle: (title: string) => set({ title }),
  setBathrooms: (bathrooms: number) => set({ bathrooms }),
  setBedrooms: (bedrooms: number) => set({ bedrooms }),
  setSharedSpace: (sharedSpace: boolean) => set({ sharedSpace }),
  setOccupants: (occupants?: Person[]) => set({ occupants }),
  setRoomType: (roomType?: RoomType) => set({ roomType }),
  setPreferredGender: (preferredGender?: Gender) => set({ preferredGender }),
  setMinAge: (minAge?: number) => set({ minAge }),
  setMaxAge: (maxAge?: number) => set({ maxAge }),
  setLatitude: (latitude: number) => set({ latitude }),
  setLongitude: (longitude: number) => set({ longitude }),
  setDescriptionTags: (descriptionTags: Tag[]) => set({ descriptionTags }),
  setAddressString: (addressString: string) => set({ addressString }),
  setPrice: (price: number) => set({ price }),
  setImage: (image: string) => set({ image }),
  setImageSrcs: (imageSrcs: string[]) => set({ imageSrcs }),
  setListingStart: (listingStart: Date) => set({ listingStart }),
  setListingEnd: (listingEnd: Date) => set({ listingEnd }),
  onHandleNext: () => set((state) => ({ step: state.step + 1 })),
  onHandleBack: () => set((state) => ({ step: state.step - 1 })),
  onHandleDone: () => set(() => ({ step: 1 })),
}));
