import domReady from "./xpage/ready";
import EventListener from "./xpage/EventListener";

domReady(() => {
	new EventListener(".main-nav__search .search-link").add("click", (el: HTMLElement, e: Event) => {
		const $this = window.$(el);
		if ($this.siblings(".search-form").length){
			e.preventDefault();
	
			if(!window.$('.head').hasClass('js__scrolled')) {
				window.$(".search-form:not([style*='opacity'])").fadeToggle(300)
			}
		}
	});
});