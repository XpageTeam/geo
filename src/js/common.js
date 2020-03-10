import $ from "jquery";
import is from "is_js";
import Cookies from "js-cookie";


import "./mainPhotos/mainPhotos.js";

window.jQuery = $;
window.$ = $;
window.is = is;
window.Cookies = Cookies;

require("./custom-select.js");

require("./jquery.fancybox.js");

document.addEventListener("DOMContentLoaded", function(){
	$(".fancybox").fancybox();
});