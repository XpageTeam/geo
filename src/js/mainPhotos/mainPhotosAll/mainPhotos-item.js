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
			default: 0,
		}
	},
	mounted(){

		if (this.$el.querySelector("img"))
			this.$el.querySelector("img").addEventListener("load", () => {
				this.$emit("regElement", this.$el);
			})
		else
			this.$emit("regElement", this.$el);
	},
	template: '\
		<div :id="\'item-\'+item.id" :class="\'main-content__item--\'+(cellSizes[itemKey] || \'box\')" class="main-content__item">\
			<news-item \
				:news-items="item.items"\
				:btn-link="item.link"\
				\
				v-if="item.typeData == \'news\'">\
			</news-item>\
			\
			<video-item \
				:src="item.videoLink[(cellSizes[itemKey] || \'box\')]" \
				:link="item.link"\
				\
				v-else-if="item.videoLink[cellSizes[itemKey]]">\
			</video-item>\
			\
			<default-item\
				:item="item"\
				:cell-sizes="cellSizes"\
				:item-key="itemKey"\
				v-else-if="!item.isTextBlock && item.videoLink.fake"\
			></default-item>\
			\
			<text-item \
				:link="item.link"\
				:bg-color="item.bgColor"\
				:box-shadow="item.boxShadow"\
				:text="item.title"\
				\
				v-if="item.isTextBlock && item.videoLink.fake">\
			</text-item>\
		</div>\
	'
}