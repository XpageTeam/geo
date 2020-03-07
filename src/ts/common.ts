import domReady from "./xpage/ready";
import "./main-slider/main-top-slider";

declare global {
	interface Window {
		$: any;
		is: any;
		Cookies: any;
	}
}

domReady(() => {
	
})