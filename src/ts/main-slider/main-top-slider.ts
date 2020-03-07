
import {Swiper, Keyboard, EffectFade, Autoplay, Lazy, Pagination, Navigation} from "swiper/dist/js/swiper.esm";
import domReady from "../xpage/ready";
import arrowMoving from "./arrowsMoving";
import swapVideosInMainSlider from "./swapVideos";
import startMainSliderVideo from "./startVideo";
import pauseAllVideos from "./pauseAllVideos";

Swiper.use([Keyboard, EffectFade, Autoplay, Lazy, Pagination, Navigation]);

/** Это не только слайдер для главной страницы
 * ! он может использоваться на детальной тсранице заведения
 */

declare global {
	interface Window {
		nextSlideTimeout: NodeJS.Timeout
	}
}

domReady(() => {
	if(document.body.classList.value.includes("dir-promo-") && document.querySelector('.main-slider__cont')){
		document.body.classList.add('js__main-slider-has');
	}


	const mainSlider = document.querySelector(".main-slider") as HTMLElement;

	if (!mainSlider)
		return;

	const autoplaySettings: AutoplayOptions | false = mainSlider.querySelectorAll("video").length 
		? false 
		: {
			delay: 4000,
			disableOnInteraction: false,
		};

	swapVideosInMainSlider(mainSlider);

	/** Поместит в константу видео из первого слайда
	 * !! если в первом слайде оно присутствует
	 */
	const firstSlideVideo = mainSlider.querySelector(".swiper-slide:first-child video") as HTMLVideoElement;

	let slider: Swiper;

	slider = new Swiper(mainSlider, {
		effect: "fade",
		loop: true,
		keyboard: {
			enabled: true,
			onlyInViewport: true
		},
		lazy: {
			loadPrevNext: true,
			loadOnTransitionStart: true
		},
		autoplay: autoplaySettings,
		navigation: {
			nextEl: ".main-slider__arrows .swiper-button-next",
			prevEl: ".main-slider__arrows .swiper-button-prev",
		},
		pagination: {
			el: ".main-slider .swiper-pagination",
			clickable: true,
		},
		on: {
			init(){

				if (window.is.desktop() && mainSlider.querySelectorAll(".main-slider__slide").length > 1){
					arrowMoving();
				}
				// if (is.ios()){
				 	// $mainSlider.find("video").attr("controls", true)
				// }
		
				setTimeout(() => {
					mainSlider.classList.add("slider-loaded");
		
					setTimeout(() => {
						mainSlider.classList.add("slider-loaded-after");
					}, 300);
				}, 100)
				
				/** Если в первом слайде есть видео,
				 * его нужно запустить
				 */
				
				if (firstSlideVideo)
					startMainSliderVideo(firstSlideVideo, this);
			},
			slideChangeTransitionEnd(){
				pauseAllVideos(this);

				clearTimeout(window.nextSlideTimeout);

				const video = mainSlider.querySelector(".swiper-slide-active video") as HTMLVideoElement;

				startMainSliderVideo(video, this);
			}
		}
	});
});