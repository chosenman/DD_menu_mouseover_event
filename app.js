// add selector of menu wrapper
var menuSelector = document.getElementsByClassName('menu')[0];

// add event listeners
menuSelector.addEventListener("mouseover", mouseOverF);
menuSelector.addEventListener("mouseout", mouseOutF);
document.addEventListener('mouseover', whoIsFather);

function whoIsFather(event){
			var etarget = event.target;

			if(findWrapper(etarget) == 'menu') {
				// do nothing
			} else {
				hideSubs();
			}
}

// find wrapper 'menu' to make possible to close SUBMENU if we outed our cursor from SUBMENU on document elements
		function findWrapper(start) {
			console.log(start);
			if(
				start !== null
				&& start.parentElement !== null
				&& start.parentElement !== undefined
				&& start.parentElement.className == 'menu'
				) {
				return 'menu';
			} else if(
				start.nodeName == 'HTML'
				) {
				hideSubs();
			} else {
				return findWrapper(start.parentElement);
			}
		}

// function to go through all selectors of displayed SUBMENUS and hiding them
	function hideSubs() {
		for (var i = displayedSubmenuSelector.length - 1; i >= 0; i--) {
			displayedSubmenuSelector[i].setAttribute('style', 'display:none');
		}

		// clearing our temporary array
		displayedSubmenuSelector = [];
		console.log('hide subs!');
	}

// array to record selectors of our SUBMENUS which we will open
var displayedSubmenuSelector = [];

// function wich will evaluate event 
function mouseOverF(event) {
		var selector = event.target.nextElementSibling;

		if (
			// if we mouseovered on UL object which already displayed
			event.target.tagName == 'UL'
			&& event.target.attributes.style !== undefined
			// menu class check className
			&& event.target.attributes.className !== 'menu'
			&& event.target.attributes.style.value.includes('display:block')
			) {
				event.preventDefault();
				event.stopPropagation();
		} else if (
			// if we mouseovered on LI element which has SUBMENU and it's displayed already
			selector !== null
			&& selector.tagName == 'UL' 
			&& selector.attributes.style !== undefined
			&& selector.attributes.style.value.includes('display:block')
			) {
				event.preventDefault();
				event.stopPropagation();
		} else if (
			// if we mouseovered on LI element with SUBMENU than -> display it
			selector !== null &&
			selector.tagName === "UL" 
			) {
			
			selector.setAttribute('style', 'display:block');
			event.stopPropagation();

			// pushing selector of just opened SUBMENU into our temporary array
			return displayedSubmenuSelector.push(selector);
		}
}

function mouseOutF(event) {
	var slctr = event.target;

				// console.log(event);
				// console.log(displayedSubmenuSelector);

	if( 
		// we moveout our mouse of 'menu'
		slctr !== undefined
		&& slctr !== null
		&& slctr.className == 'menu' 
		|| 
		// we moveout our mouse of LI>A which has SUBMENU
		slctr.nextElementSibling !== null
		&& slctr.nextElementSibling.attributes.style !== undefined
		&& slctr.nextElementSibling.attributes.style.value.includes('display:block')
		&& slctr.offsetParrent !== undefined
		&& slctr.offsetParrent.parentElement.className == 'menu'
		||
		// we moveout our mouse of LI which has SUBMENU
		slctr.parentElement !== undefined
		&& slctr.parentElement.className == 'menu'
		) {

				hideSubs();
				event.stopPropagation();	
				event.stopPropagation();
	} else if (

		// describing event when mouse moves to NEXT list(menu) element LI to close SUBMENU of pervious list element
		slctr.previousElementSibling !== null
		&& slctr.previousElementSibling.tagName == 'LI'	
		&& slctr.previousElementSibling.lastElementChild !== undefined
		&& slctr.previousElementSibling.lastElementChild.tagName == 'UL'
		&& slctr.previousElementSibling.lastElementChild.attributes.style !== undefined
		&& slctr.previousElementSibling.lastElementChild.attributes.style.value.includes('display:block')
		||
		// the same as befor but this time just REVERSE event nextElementSibling
		slctr.nextElementSibling !== null
		&& slctr.nextElementSibling.tagName == 'LI'	
		&& slctr.nextElementSibling.lastElementChild.tagName == 'UL'
		&& slctr.nextElementSibling.lastElementChild.attributes.style !== undefined
		&& slctr.nextElementSibling.lastElementChild.attributes.style.value.includes('display:block')
		) {

			console.log('poper');
			displayedSubmenuSelector[displayedSubmenuSelector.length - 1].setAttribute('style', 'display:none');
			displayedSubmenuSelector.pop();

			event.stopPropagation();	
			event.stopPropagation();
	} else if (

		// describing event when mouse moves to NEXT list(menu) element LI>A to close SUBMENU of pervious list element
		slctr.offsetParent !== null
		&& slctr.offsetParent.previousElementSibling !== null
		&& slctr.offsetParent.previousElementSibling.tagName == 'LI'	
		&& slctr.offsetParent.previousElementSibling.lastElementChild.tagName == 'UL'
		&& slctr.offsetParent.previousElementSibling.lastElementChild.attributes.style !== undefined
		&& slctr.offsetParent.previousElementSibling.lastElementChild.attributes.style.value.includes('display:block')
		||
		// the same as befor but this time just REVERSE event nextElementSibling
		slctr.offsetParent !== null
		&& slctr.offsetParent.nextElementSibling !== null
		&& slctr.offsetParent.nextElementSibling.tagName == 'LI'	
		&& slctr.offsetParent.nextElementSibling.lastElementChild.tagName == 'UL'
		&& slctr.offsetParent.nextElementSibling.lastElementChild.attributes.style !== undefined
		&& slctr.offsetParent.nextElementSibling.lastElementChild.attributes.style.value.includes('display:block')
		) {

			console.log('poper');
			displayedSubmenuSelector[displayedSubmenuSelector.length - 1].setAttribute('style', 'display:none');
			displayedSubmenuSelector.pop();

			event.stopPropagation();	
			event.stopPropagation();
	} 



}