import $ from "jquery";
import Cookies from "js-cookie";

$(_ => {
	if (!$(".head .adv").is(":visible")){
		if (Cookies.get("adblockMessageShowed"))
			$("body").addClass("js__adblock-disclemer-hidden");

		$("body").addClass("adblock-detected");
	}

	$(".adblock-message__btn").click(_ => {
		Cookies.set("adblockMessageShowed", 1, {expires: 10});
		$("body").addClass("js__adblock-disclemer-hidden");
	});
})