import { create } from "zustand";

type Hash = {
  router: string;
  addRouter: (router: string) => void;
};

export const useHashChange = create<Hash>()((set) => ({
  router: "home",
  addRouter: (router) => set({ router }),
}));
