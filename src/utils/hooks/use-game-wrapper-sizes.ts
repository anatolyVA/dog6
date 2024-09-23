import {useEffect, useState} from "react";

export const useGameWrapperSizes = (isFitWindow: boolean) => {
	const [sizes, setSizes] = useState({width: 0, height: 0});
	useEffect(() => {
		const updateSize = () => {
			const game = document.getElementById("game");
			if (!game) return;
			let e = Math.min(
				(window.innerHeight - (isFitWindow ? 40 : 0)) / 1080,
				window.innerWidth / 1920,
			);

			if (!isFitWindow) e *= 0.812;

			setSizes({width: 1920 * e, height: 1080 * e});

			game.style.width = (1920 * e).toFixed(0) + "px";
			game.style.height = (1080 * e).toFixed(0) + "px";
		};

		updateSize();

		document.addEventListener("fullscreenchange", updateSize);
		window.addEventListener("resize", updateSize);
		return () => {
			window.removeEventListener("resize", updateSize);
			document.removeEventListener("fullscreenchange", updateSize);
		};
	}, [isFitWindow]);

	return sizes;
};
