import domReady from "./xpage/ready";
import "./main-slider/main-top-slider";
import "./day-night-switcher";
import "./main-search-form";

import "./mobile-menu";


import "./live-slider";
import "./random-banner";

declare global {
	interface Window {
		$: any;
		is: any;
		Cookies: any;
	}
}

domReady(() => {
	document.body.classList.add("loaded");
});