import domReady from "./xpage/ready";
import {Swiper, Keyboard, Scrollbar} from "swiper/dist/js/swiper.esm"

Swiper.use([Keyboard, Scrollbar])

domReady(() => {
	new Swiper(".live-slider", {
		slidesPerView: !document.querySelector(".venue__live-slider") ? 3 : "auto",
		spaceBetween: 24,
		freeMode: true,
		keyboard: {
			enabled: true,
			onlyInViewport: true
		},
		scrollbar: {
			el: '.live-slider__cont-scrollbar .swiper-scrollbar',
			draggable: true
		},
		breakpoints: {
			1100: {
				slidesPerView: !document.querySelector(".venue__live-slider") ? 2 : "auto",
				spaceBetween: 20
			},
			660: {
				slidesPerView: !document.querySelector(".venue__live-slider") ? 1 : "auto",
				spaceBetween: 10
			}
		}
	});
});