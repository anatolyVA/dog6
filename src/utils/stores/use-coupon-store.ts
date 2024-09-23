import { create } from "zustand/index";
import { SelectedBet } from "../../ui/grid-item.tsx";

export type Coupon = {
  win: number;
  bet: number;
} & SelectedBet;

type State = {
  coupons: Coupon[];
};

type Action = {
  setCoupons: (coupons: Coupon[]) => void;
  addCoupons: (coupons: Coupon[]) => void;
  clear: () => void;
};

export const useCouponStore = create<State & Action>((set) => ({
  coupons: [],
  setCoupons: (coupons) => set({ coupons }),
  addCoupons: (coupons) =>
    set((state) => ({ coupons: [...state.coupons, ...coupons] })),
  clear: () => set({ coupons: [] }),
}));
