import { atom } from "jotai";

export type AddressInfo = {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
};

export const addressAtom = atom<AddressInfo>({
  name: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
});
