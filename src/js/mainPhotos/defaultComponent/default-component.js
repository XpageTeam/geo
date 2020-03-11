export default {
	props: {
		item: {
			type: Object,
			default: {}
		},
		cellSizes: {
			type: Array,
			default: []
		},
		itemKey: {
			type: Number,
			default: 0
		}
	},
	methods: {
		getTarget(link){
			return link.indexOf("http") != -1 ? "_blank" : ""
		},
		getType(item){

			switch (item.typeData){
				case "evenet":
					return BX.message('JS_EVENT_TITLE')
				break;

				case "reportage":
					return item.nameInstitution || BX.message('JS_REPORTAGE_TITLE')
				break;

				case "exclusive":
					return BX.message('JS_EXCLUSIVE_TITLE')
				break;

				default:
					return ""
			}
		},
	},
	template: '\
		<a :style="item.boxShadow" :target="getTarget(item.link)" :href="item[\'link_\'+(cellSizes[itemKey] || \'box\')] || item.link" :class="\'item--\'+item.typeData" class="item">\
			<figure class="item__img">\
				<img loading="lazy" :src="item.imgLink[cellSizes[itemKey]]"/>\
			</figure>\
			<div v-if="item.dateElement" class="item__desc-top__date">{{ item.dateElement }}</div>\
			<div v-if="!item.isBanner" class="item__desc">\
				<div class="item__desc-top">\
					<div class="item__desc-top__title">{{ getType(item) }}</div>\
				</div>\
				<div class="item__desc-title">{{ item.title }}</div>\
				<div v-if="item.subtitle" class="item__desc-subtitle">{{ item.subtitle }}</div>\
			</div>\
			<div v-if="item.typeData == \'evenet\' && item.isTicketSale" class="item__btn">\
			<div class="buy-btn">{{ cellSizes[itemKey] == \'row\' ? \'Купить билет\' : \'\' }}</div>\
			</div>\
		</a>\
	'
}