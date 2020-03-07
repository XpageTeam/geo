export default {
	props: {
		newsItems: {
			type: Array,
			default: []
		},
		btnLink: {
			type: String,
			default: ""
		}
	},
	methods: {
		getTitle(){
			return BX.message('JS_NEWS_TITLE')
		},
		getBtnText(){
			return BX.message('JS_NEWS_BTN')
		}
	},
	template: '\
		<div class="news-block">\
			<div class="news-block__title">{{ getTitle() }}</div>\
			<div class="news-block__content">\
				<div class="nb-list">\
					<div v-for="newsItem in newsItems" class="nb-list__item">\
						<div class="nb-list__item-date">{{ newsItem.date }}</div>\
						<a :href="newsItem.url" class="nb-list__item-title">{{ newsItem.name }}</a>\
					</div>\
				</div>\
			</div>\
			<div class="news-block__btn">\
				<a :href="btnLink" class="default-btn">{{ getBtnText() }}</a>\
			</div>\
		</div>\
	'
}