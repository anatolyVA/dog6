import { useCouponStore } from "../utils/stores/use-coupon-store.ts";

export function WinBlock() {
  const coupons = useCouponStore((state) => state.coupons);

  const isVisible = coupons.some((coupon) => coupon.win > 0);
  const win = coupons.reduce((acc, coupon) => acc + coupon.win, 0).toFixed(2);

  return (
    isVisible && (
      <div className="win-block">
        <div className="win-block__content">
          <div className="win-block__msg">
            <div className="win-block__text">Вы выиграли!</div>
            <div className="win-block__sum-wrap">
              <span className="win-block__coins sprite money"></span>
              <span className="win-block__sum">{win}</span>
            </div>
            <div className="win-block__jp"></div>
          </div>
        </div>
      </div>
    )
  );
}
