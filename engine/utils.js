function elemHeight(elem) {
	let style = getComputedStyle(elem);
	return elem.offsetHeight +
					parseInt(style.marginTop) +
					parseInt(style.marginBottom);
}

function elemWidth(elem) {
	let style = getComputedStyle(elem);
	return elem.offsetWidth +
					parseInt(style.marginRight) +
					parseInt(style.marginLeft);
}

function goupCheck(goup, treshold) {
	function goupScale(goup, state, opacity) {
		if (state === 1) {
			goup.style.opacity = opacity;
			goup.style.display = "block";
			goup.style.top = 0;
		} else {
			goup.style.display = "none";
		}
	}

	let offset = window.pageYOffset;
	if (offset >= treshold) {
		goupScale(goup, 1, 0.5);
	} else {
		goupScale(goup, 0, 0.5);
	}
}

function navMove(nav, navY) {
	let offset = window.pageYOffset;
	let diff = navY - offset;
	if (diff < 0) {
		nav.style.top = "0" + 'px';
	} else {
		nav.style.top = diff + 'px';
	}
}

function SubElem(button, subBlock, buttonSkin, state = 0) {
	this.state      = state;
	this.button     = button;
	this.subBlock   = subBlock;
	this.buttonSkin = buttonSkin;

	this.toggleSub = function() {
		if (this.state === 0) {
			this.state = 1;
			this.subBlock.style.display = "block";
			this.buttonSkin.className = "fa fa-angle-up";
		} else {
			this.state = 0;
			this.subBlock.style.display = "none";
			this.buttonSkin.className = "fa fa-angle-down";
		}
	};
}

document.addEventListener('DOMContentLoaded', () => {
	let header = document.getElementById("header");
	let nav = document.getElementById("nav");

	let headerHeight = elemHeight(header);
	let navY = nav.offsetTop;

	// go up button util
	let goupBtn = document.getElementById("go_up");

	window.onscroll = function() {
		goupCheck(goupBtn, headerHeight);
		navMove(nav, navY);
	};

	goupBtn.addEventListener('click', function () {
		window.scrollBy({
			top: -document.documentElement.scrollHeight,
			behavior: 'smooth'
		});
	});

	// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
	// sub menu util
	let buttonedC = document.getElementsByClassName("buttoned");
	let buttoned = new Array(); 

	let i = 0;
	Array.from(buttonedC).forEach(function(el) {
		let button = el.getElementsByClassName("button-container")[0];;
		let subBlock = el.getElementsByClassName("subBlock")[0];
		let buttonSkin = button.getElementsByClassName("skin")[0];

		buttoned[i] = new SubElem(button, subBlock, buttonSkin, 0);
		let tmp = buttoned[i];
		buttoned[i].button.addEventListener("click", function(){ tmp.toggleSub(); });
		i++;
	});
});
