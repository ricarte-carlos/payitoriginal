import { create } from "zustand";

type PublishedDispatch = {
  isPublished: boolean;
  setIsPublished: (published: boolean) => void;
};

export const usePublished = create<PublishedDispatch>((set) => ({
  isPublished: true,
  setIsPublished: (isPublished: boolean) => set({ isPublished }),
}));
