import {Swiper} from "swiper/dist/js/swiper.esm";
import App from "../xpage/core";

function pauseAllVideos(slider: Swiper){
	const allVideos = App.transformNodeListToArray(slider.el.querySelectorAll("video"));

	for (const video of allVideos)
		(video as HTMLVideoElement).pause();
}

export default pauseAllVideos;