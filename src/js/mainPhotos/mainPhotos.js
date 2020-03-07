import Vue from "vue";

import photoReportVue from "./mainPhotos-vueComponent.js";
import videoItem from "./videoComponent/video-component.js";
import newsItem from "./newsComponent/news-component.js";
import textItem from "./textComponent/text-component.js";
import defaultItem from "./defaultComponent/default-component.js";
import mpItem from "./mainPhotosAll/mainPhotos-item.js";

Vue.component("photo-report", photoReportVue);
Vue.component("video-item", videoItem);
Vue.component("news-item", newsItem);
Vue.component("text-item", textItem);
Vue.component("default-item", defaultItem);
Vue.component("mp-item", mpItem);

document.addEventListener("DOMContentLoaded", e => {
	if (document.getElementById("photoReport"))
		new Vue({
			el: "#photoReport",
		})
})