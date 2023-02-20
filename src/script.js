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
}

worker();
setInterval(worker, 1000);
