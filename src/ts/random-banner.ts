import domReady from "./xpage/ready";
import App from "./xpage/core";

domReady(() => {
	const bannerContainers = App.transformNodeListToArray(document.querySelectorAll(".main-content__banner"));

    if (!bannerContainers.length)
        return;

    let i = 0;

    for (const bannerContainer of bannerContainers){
        if (window.Cookies.get("lastMainBannerID"+i) && window.$(bannerContainer).find("div[id*='item']:eq(0)").length){
            const lastMainBannerID = window.Cookies.get("lastMainBannerID"+i),
                $nextBanner = window.$(bannerContainer).find("div[id*='item']:eq("+(+lastMainBannerID + 1)+")");

            if (!$nextBanner.length){
                window.$(bannerContainer).find("div[id*='item']:eq(0)").addClass("js__visible")
                window.Cookies.set("lastMainBannerID"+i, 0)
            }else{
                $nextBanner.addClass("js__visible")
                window.Cookies.set("lastMainBannerID"+i, +lastMainBannerID + 1)
            }
        }else{
            const $firstBanner = window.$(bannerContainer).find("div[id*='item']:eq(0)");

            if ($firstBanner.length){
                window.$(bannerContainer).find("div[id*='item']:eq(0)").addClass("js__visible")
                window.Cookies.set("lastMainBannerID"+i, 0)
            }
        }

        window.$(bannerContainer).addClass("js__ready");

        i++;
    }
});