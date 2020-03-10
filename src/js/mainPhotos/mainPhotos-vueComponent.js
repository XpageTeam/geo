import gridGeneration from "./gridGeneration.js";
import getMonthNameById from "./getMonthNameById.js";


/**
 * Позиция новостного блока в массиве
 */
const fixedSizeElID = 8;


export default {
	props:{
		dataCityId: {
			type: Number,
			default: 0
		}
	},
	data: () => ({
		list: [],
		cutch: "",
		loadCounter: 0,
		autoLoadCounter: 0,
		isLoading: false,
		cellSizes: [],
		allElementsLoaded: false,
		curLoaderText: BX.message('JS_LOAD_MORE'),
		viewObserver: undefined
	}),
	mounted(){
		setMainContentSize();

		this.initObserver();

		if (document.body.classList.contains("head-menu"))
			this.loadMore();

		this.bindEvents();
	},
	watch: {
		isLoading(val, oldVal){
			if (val)
				this.curLoaderText = BX.message('JS_LOAD_TEXT')
			else
				this.curLoaderText = BX.message('JS_LOAD_MORE')
		}
	},
	methods: {

		/**
		 * Создаёт обсервер для анимированного 
		 * появления элементов при скролле
		 */
		initObserver(){
			const observerOptions = {
				rootMargin: '-100px 0px',
				threshold: .5
			};

			function callBack(entries){
				if (window.requestIdleCallback)
					window.requestIdleCallback(() => {
						entries.forEach((value) => {
							if (value.isIntersecting)
								value.target.classList.add("animated")							
							});
					}, {timeout: 200});
				else
					entries.forEach((value) => {
						if (value.isIntersecting)
							value.target.classList.add("animated")							
					});
			}

			this.viewObserver = new IntersectionObserver(callBack, observerOptions);
		},

		/**
		 * Добавляет элемент в обсервер
		 * @param {HTMLElement} targetElement 
		 */
		addElementToObserver(targetElement){
			this.viewObserver.observe(targetElement);
		},

		getDay(date){
			let dateArray = date.split(".");

			return dateArray[0].toString().replace(/^0/, "") + " " + getMonthNameById(dateArray[1]);
		},
		
		bindEvents(){
			$(window).on("scroll resize touchmove", _ => {
				if ($(window).scrollTop() + $(window).height() >= $(".main-content").offset().top + ($(".main-content").height() - 150)){
					if (this.autoLoadCounter < 1 && !this.isLoading){
						this.loadMore();
						this.autoLoadCounter++;
					}
				}
			})

			this.loadMore();
		},
		
		loadMore(){

			if (this.isLoading || this.allElementsLoaded)
				return

			let lastGridElementsCount = this.cellSizes.length;

			this.cellSizes = gridGeneration();

			let newGridElementsCount = this.cellSizes.length - lastGridElementsCount;

			$.ajax({
				url: "/local/php_interface/ajax.php",
				type: "POST",
				dataType: 'json',
				context: this,
				data: {
					cityId: this.dataCityId,
					limit: newGridElementsCount,
					offset: lastGridElementsCount,
					commandType: "getElementsForMainPage"
				},
				beforeSend(){
					this.isLoading = true;
				},
				success(response){

					if (response.length == 0 && this.loadCounter > 3){
						this.allElementsLoaded = true;

						return
					}

					if (response.items){
						if (response.items.length){

							if (response.items[fixedSizeElID].typeData == "news"){

								for (let i = 0; i < response.items[fixedSizeElID].items.length; i++)
									response.items[fixedSizeElID].items[i].name = response.items[fixedSizeElID].items[i].name.replace(/&quot;/g, "\"");
								
								if (is.desktop())
									response.items.swap(this.cellSizes.indexOf("col", this.list.length + 5), fixedSizeElID)
							}

							for (let i = 0; i < response.items.length; i++){
								if (response.items[i].title)
									response.items[i].title = response.items[i].title.replace(/&quot;/g, "\"");

								if (!response.items[i].videoLink){
									response.items[i].videoLink = {fake: "false"}

									if (response.items[i].imgLink && !response.items[i].isTextBlock)
										for (var img in response.items[i].imgLink){
											if (~response.items[i].imgLink[img].indexOf(".mp4"))
												response.items[i].videoLink[img] = response.items[i].imgLink[img]
										}
								}
							}

							this.list = this.list.concat(response.items)
							this.loadCounter++;
						}

						if (response.all_cnt <= this.list.length)
							this.allElementsLoaded = true;
					}
				},
				error(response){
					console.log(response);
				},
				complete(){
					this.isLoading = false;
				}
			});
		},
	},
	template: '<div>\
		<div class="main-content">\
			<mp-item \
				:item="item"\
				:item-key="key"\
				:cell-sizes="cellSizes"\
				:key="key"\
				v-on:regElement="addElementToObserver"\
				v-for="(item, key) in list"\>\
			</mp-item>\
		</div>\
		<div v-if="!allElementsLoaded" class="main-content__btn">\
			<a @click="loadMore()" class="download-more" :class="{ \'download-more--loading\': isLoading }">{{ curLoaderText }}</a>\
		</div>\
	</div>'
}


/**
 * Задаёт соответствующий класс для 
 * main-content
 */
function setMainContentSize() {
	const mainContent = document.querySelector(".main-content");

	;(function(){
		if (!mainContent) return;

		if (is.tablet())
			mainContent.classList.add("main-content--tablet");
		else if (is.mobile())
			mainContent.classList.add("main-content--mobile");
	})();
}