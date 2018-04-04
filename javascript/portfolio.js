
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

// check if mobile menu link was clicked, if so hide the menu

$("#main-nav-ul").on("click", (event) => {
	if(event.target.tagName === "A"){
		menuBtn.checked = false;
		checkMenu();
	}
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
			<h1>Treehouse Profile</h1>
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