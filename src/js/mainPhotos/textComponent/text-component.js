export default {
	props: {
		link: {
			type: String,
			default: "",
		},
		bgColor: {
			type: String,
			default: "rgb(178, 213, 177)"
		},
		boxShadow: {
			type: String,
			default: ""
		},
		text: {
			type: String,
			default: ""
		}
	},
	template: '\
		<a :href="link" :data-bgc="bgColor" :style="\'background-color:\'+bgColor+\';\'+boxShadow" class="subscribe">\
			<span class="subscribe__title" v-html="text"></span>\
			<span class="subscribe__plus"></span>\
		</a>\
	'
}