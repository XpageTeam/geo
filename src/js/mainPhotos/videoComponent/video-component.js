import is from "is_js";

export default {
	props: {
		src: {
			type: String,
			default: ""
		},
		link: {
			type: String,
			default: ""
		}
	},
	data: () => ({
		videoElement: undefined
	}),
	mounted(){

		this.videoElement = this.$el.querySelector(".video-item");

		document.addEventListener(
			"click", 
			this.bindPlayEvent,
			{once: true}
		);

		document.addEventListener(
			"touchend", 
			this.bindPlayEvent,
			{once: true}
		);

		// ;(function(){
		// 	const videoItems = document.querySelectorAll('.main-content__item:not([style*="visibility: visible;"]) video');

		// 	if (!videoItems.length)
		// 		return

		// 	const play = video => {

				
		// 	};

		// 	for (var video of videoItems){
		// 		video.addEventListener("loadedmetadata", function(){
		// 			video.play()
		// 		})
		// 		video.addEventListener("canplaythrough", function(){
		// 			video.play()
		// 		})
				
		// 	}

		// })();
	},
	methods: {
		isIOS(){
			return is.ios()
		},
		bindPlayEvent(){
			this.videoElement.addEventListener("loadedmetadata", function(){
				this.play()
			});

			this.videoElement.addEventListener("canplaythrough", function(){
				this.play()
			});

			this.videoElement.load()
		}
	},
	template: '\
		<a :href="link"  class="item item--video">\
			<video autoplay playsinline :data-controls="isIOS()" preload="metadata" loop muted  class="video-item">\
			<source :src="src" type="video/mp4"/>\
			</video>\
		</a>\
	'
}