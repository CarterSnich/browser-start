window.onload = function () {
	document.querySelector("#input-search").focus();
};

let currentTimeOfDay;

let worker = function () {
	let today = new Date();
	let time = today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	let timeOfDay = today.getHours() < 12 ? "morning" : today.getHours() < 18 ? "afternoon" : "evening";

	document.getElementById("time").innerHTML = time;

	if (timeOfDay != currentTimeOfDay) {
		currentTimeOfDay = timeOfDay;
		document.getElementById("timeOfDay").innerText = timeOfDay;
	}
};

worker();
setInterval(worker, 1000);

document.getElementById("search-engine").addEventListener("change", function (e) {
	let queryUrl = this.value;
	let brand = this.selectedOptions[0].innerText;

	document.getElementById("input-search").placeholder = brand;
	document.getElementById("search-form").action = queryUrl;
});
