interface arrows{
	left: HTMLElement,
	right: HTMLElement
}

interface sizes{
	width?: number,
	height?: number
}

interface offsets{
	left?: number,
	top?: number
}



const moveArrow = (el: HTMLElement, x: number, y: number) => {
	el.setAttribute("style", `top: ${y}px; left: ${x}px`);
	el.style.pointerEvents = "all";
},
hideArrows = (arrows: arrows) => {
	arrows.left.style.opacity = "0";
	arrows.left.style.pointerEvents = "none";
	arrows.right.style.opacity = "0";
	arrows.right.style.pointerEvents = "none";	
},
arrowMoving = () => {
	let arrowsBlock = document.querySelector(".main-slider"),
		arrows = {
			left: document.querySelector(".main-slider__arrows .swiper-button-prev") as HTMLElement,
			right: document.querySelector(".main-slider__arrows .swiper-button-next") as HTMLElement,
		};

	if (!arrowsBlock || !arrows.left || !arrows.right)
		return

	arrowsBlock.classList.add("js__have-slides");

	hideArrows(arrows);

	arrowsBlock.addEventListener("mouseleave", event => {
		hideArrows(arrows);
	});

	arrowsBlock.addEventListener("mousemove", (event: MouseEvent) => {
		let {pageX: x, pageY: y} = event,
			activeSlide = arrowsBlock.querySelector(".swiper-slide-active"),
			showArrows = true;

		if (activeSlide.querySelector("a.main-slider__slide-desc")){
			let activeSlideTitle = activeSlide.querySelector(".main-slider__slide-text") as HTMLElement;


			let offset: offsets = {},
				sizes: sizes = {};

			if (!activeSlideTitle){
				offset.left = 0
				offset.top = 0

				sizes.width = 0
				sizes.height = 0
			}else{
				offset = {
					left: activeSlideTitle.offsetLeft,
					top: activeSlideTitle.offsetTop, 
				};

				sizes = {
					width: activeSlideTitle.offsetWidth,
					height: activeSlideTitle.offsetHeight
				};
			}

			// y -= arrows.left.offsetHeight;

			if (activeSlideTitle)
				if ((x >= offset.left && x <= sizes.width + offset.left && y >= offset.top && y <= sizes.height + offset.top)
					|| (y >= offset.top && y <= sizes.height + offset.top && x >= offset.left && x <= sizes.width + offset.left)){

					hideArrows(arrows);

					showArrows = false;
				}else
					showArrows = true;
		}

		if (!showArrows)
			return


		let side = x < arrowsBlock.clientWidth / 2 ? "left" : "right";

		x -= arrows.left.clientWidth / 2;

		switch (side){
			case "left":
				arrows.right.style.opacity = "0";

				// if (x <= 0){
				// 	arrows.left.style.opacity = 0;
				// 	return;
				// }else{
					arrows.left.style.opacity = "1";
					y -= arrows.left.clientHeight / 2;
					moveArrow(arrows.left, x, y)
				// }
			break;

			case "right":
				arrows.right.style.opacity = "1";
				arrows.left.style.opacity = "0";

				// if (x > wrapper.clientWidth){
				// 	arrows.right.style.opacity = 0;
				// 	return
				// }else{
					x -= arrows.left.clientWidth / 2;
					y -= arrows.right.clientHeight / 2;
					moveArrow(arrows.right, x, y)
				// }
			break;

			default:
				console.warn("O_o");
		}
	});
};

export default arrowMoving