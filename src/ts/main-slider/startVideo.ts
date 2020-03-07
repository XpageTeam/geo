import {Swiper} from "swiper/dist/js/swiper.esm";
import pauseAllVideos from "./pauseAllVideos";

const startMainSliderVideo = (video: HTMLVideoElement, slider: Swiper) => {
	if (!video){
		window.nextSlideTimeout = setTimeout(function(){
			slider.slideNext();
		}, 4000)

		return
	}

	pauseAllVideos(slider);

	video.addEventListener("ended", function(){
		slider.slideNext();
	});

	video.play();
}

export default startMainSliderVideo;