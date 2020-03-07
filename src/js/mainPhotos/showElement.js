const showElement = element => {
	window.requestAnimationFrame(function(){
		element.classList.add("animated")
	})
};

export default showElement;