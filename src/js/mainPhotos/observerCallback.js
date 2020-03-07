const observerCallback = (entries, observer) => {
	if (window.requestIdleCallback){
		window.requestIdleCallback(function(){

			entries.forEach((value, index, array) => {
                console.log(value);
                
				if (value.isIntersecting){
					value.target.classList.add("animated")
				}
			})
		}, {timeout: 200})
	}else
		entries.forEach((value, index, array) => {
			if (value.isIntersecting){
				value.target.classList.add("animated")
			}
		})
};

export default observerCallback;