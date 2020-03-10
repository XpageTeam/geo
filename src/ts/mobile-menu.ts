import domReady from "./xpage/ready";

domReady(async () => {

	const MobileMenu = await import("./xpage/mobileMenu");

	const menu = new MobileMenu.default({
		burger: ".head__burger",
        menu: ".mobile-menu",
        menuActiveClass: "js__opened",
        bodyActiveClass: "js__menu-opened",
        ignoreWarnings: false,
        fixBody: true,
        media: "(max-width: 1000px)"
	});
});