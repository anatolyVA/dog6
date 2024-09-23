import { Button } from "../ui/button.tsx";
import { useRulesPopupStore } from "../utils/stores/use-rules-popup-store.ts";

export function Rules() {
  const isOpen = useRulesPopupStore((state) => state.isOpen);
  const close = useRulesPopupStore((state) => state.close);

  return (
    isOpen && (
      <>
        <div className="rules">
          <Button className="close-rules-button" onClick={close} />
        </div>
        <div className="curtain"></div>
      </>
    )
  );
}
