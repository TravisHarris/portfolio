
	/*----------------------------------------
		Nav Scrolling
	----------------------------------------*/

$(".scroll").on("click touchstart" , function (event) {
        event.preventDefault();
        // hide menu when mobile menu nav link is clicked
        menuBtn.checked = false;
		checkMenu();
        $('html,body').stop();
        //calculate destination place
        let dest = 0;
        if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
            dest = $(document).height() - $(window).height();
        } else {
            dest = $(this.hash).offset().top;
        }
        //go to destination
        $('html,body').animate({
            scrollTop: dest
        }, 1000, 'swing');
});

	/*----------------------------------------
		Mobile Menu
	----------------------------------------*/

const menuBtn = document.getElementById("menu-btn");
const menuBefore = document.getElementById("menu-icon-before");
const menuAfter = document.getElementById("menu-icon-after");
const menu = document.getElementById("main-nav");

function checkMenu(){
	if(menuBtn.checked){
		menu.style.transform = "translateX(-100%)";
		menuBefore.style.display = "none";
		menuAfter.style.display = "inline-block";
	}
	else{
		menu.style.transform = "translateX(0)";
		menuBefore.style.display = "inline-block";
		menuAfter.style.display = "none";
	}
}

// hide the mobile menu when screen is larger than 1020px wide

window.onresize = checkWindowSize;
window.onload = checkWindowSize;

function checkWindowSize() {
    if(window.innerWidth > 1020) {
    	menuBtn.checked = false;
    }
    checkMenu();
};

menuBtn.addEventListener("click", () => {
	checkMenu();
});



	/*----------------------------------------
		Treehouse profile
	----------------------------------------*/

const treehouseAPI = "https://teamtreehouse.com/travisharris.json";

function displayStats(data) {

	/*----------------------------------------
		Profile Stats
	----------------------------------------*/

	$("#treehouse-profile").html(`
			<div id="treehouse-header">
				<img id="treehouse-logo" src="media/portfolio/treehouse.svg" alt="treehouse logo">
				<h1>Treehouse Profile</h1>
			</div>
			<ul id="points-ul">
				<li class="points total"><h3>Total Points: ${data.points.total}</h3></li>
				<li class="points html"><h3>HTML:  ${data.points.HTML}</h3></li>
				<li class="points css"><h3>CSS: ${data.points.CSS}</h3></li>
				<li class="points javascript"><h3>JavaScript: ${data.points.JavaScript}</h3></li>
			</ul>
			<h3 class="treehouse-desc">Below are the most recent badges I've earned on Treehouse</h3>
		`);

	/*----------------------------------------
		Badges
	----------------------------------------*/

	let badgeHTML = '<ul id="treehouse-badge-ul">';
	let latestBadges = data.badges.reverse();
	for(let i = 0; i < 6; i++){
		badgeHTML += `
			<li class="treehouse-badge">
				<img src="${latestBadges[i].icon_url}" alt="badge">
				<h4>${latestBadges[i].name}</h4>
			</li>
		`;
	}
	badgeHTML += "</ul>";

	$("#treehouse-badges").html(badgeHTML);
}

$.getJSON(treehouseAPI, displayStats);