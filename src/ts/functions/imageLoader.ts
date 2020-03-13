function loadImg(img: HTMLImageElement, callback: EventListener){
	const tmpImg = new Image();

	tmpImg.addEventListener("load", callback);

	tmpImg.src = img.src;
}

export default loadImg;