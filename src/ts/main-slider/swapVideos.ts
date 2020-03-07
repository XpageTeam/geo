import App from "../xpage/core";

/** Эта фукция выбирает 
 * видео какого формата следует включить
 * ? вроде должно работать
 */
const swapVideosInMainSlider = (slider: HTMLElement) => {
	if (window.matchMedia("(orientation: landscape)").matches){
		const desktopVideos = App.transformNodeListToArray(slider.querySelectorAll("video[data-desktop-src]"));

		for (const video of desktopVideos)
			swapVideo(video as HTMLVideoElement, "data-desktop");
	}else{
		const desktopVideos = App.transformNodeListToArray(slider.querySelectorAll("video[data-mobile-src]"));

		for (const video of desktopVideos)
			swapVideo(video as HTMLVideoElement, "data-mobile");
	}
};

function swapVideo(video: HTMLVideoElement, targetAttr: String): void{
	if (video.getAttribute("src") == video.getAttribute(`${targetAttr}-src`))
		return

	// video.autoplay = true;
	video.setAttribute("src", video.getAttribute(`${targetAttr}-src`));
	video.setAttribute("poster", video.getAttribute(`${targetAttr}-poster`));
}

export default swapVideosInMainSlider;