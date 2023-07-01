const SEARCH_ENGINES = {
	google: {
		name: "Google",
		query_link: "https://www.google.com/search",
		param_name: "q",
	},
	duckduckgo: {
		name: "DuckDuckGo",
		query_link: "https://www.duckduckgo.com",
		param_name: "q",
	},
	yandex: {
		name: "Yandex",
		query_link: "https://yandex.com/search/",
		param_name: "text",
	},
	aur: {
		name: "AUR Packages",
		query_link: "https://aur.archlinux.org/packages",
		param_name: "K",
	},
	steamunlocked: {
		name: "STEAMUNLOCKED",
		query_link: "https://steamunlocked.net/",
		param_name: "s",
	},
	pornhub: {
		name: "PornHub",
		query_link: "https://www.pornhub.com/video/search",
		param_name: "search",
	},
};

document.getElementById("console-input").addEventListener("keydown", function (e) {
	if (e.key == "Enter") {
		e.preventDefault();
		console.dir(this.innerText);
	}
});

const console = document.getElementById("console");
const consoleInput = document.getElementById("console-input");
const promptWrapper = document.getElementById("prompt-wrapper");
const promptResponse = document.getElementById("prompt-response");
const promptSummary = document.querySelector("#prompt-response>div:nth-child(1)>span");
const promptResponseText = promptResponse.children[1];
const status = document.getElementById("status");
const time = document.getElementById("time");
const neofetch = document.getElementById("neofetch");

consoleInput.focus();

document.querySelector("body").addEventListener("keypress", function (e) {
	if (e.key === "/") {
		e.preventDefault();
		consoleInput.focus();
	}
});

time.innerText = new Date().toLocaleTimeString([], {
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false,
});

console.addEventListener("click", function (e) {
	e.stopPropagation();
	inputSearch.focus();
});

consoleInput.addEventListener("keydown", function (e) {
	if (e.keyCode == 13) {
		e.preventDefault();

		if (this.innerText == "neofetch") {
			neofetch.classList.remove("d-none");
			return;
		}

		if (!this.innerText.trim()) {
			return;
		}

		// get the search engine option
		const engineMatch = this.innerText.match(/^@(\w+)/);
		if (!engineMatch) {
			setPromptResponse(this.innerText, "search engine: missing search engine option");
			return;
		}

		// get the search engine
		const engine = SEARCH_ENGINES[engineMatch[1]];
		if (!engine) {
			setPromptResponse(this.innerText, `search engine: not found: ${engineMatch[1]}`);
			return;
		}

		// get the search query
		const query = this.innerText.replace(/^@(\w+)\s?/, "");
		if (!query) {
			setPromptResponse(this.innerText, "search engine: missing search query option");
			return;
		}

		if (e.ctrlKey) {
			window.open(`${engine.query_link}?${engine.param_name}=${query}`, "_blank");
		} else {
			window.location.href = `${engine.query_link}?${engine.param_name}=${query}`;
		}
	}
});

consoleInput.addEventListener("keyup", function (e) {
	let suggestions = "";
	if (consoleInput.innerText && consoleInput.innerHTML.match(/^@(\w+)/)) {
		Object.keys(SEARCH_ENGINES).forEach((eng) => {
			let match = eng.match(consoleInput.innerText.replace("@", ""));
			if (match) {
				suggestions += `${match.input}<br>`;
			}
		});
	}
	document.getElementById("suggestion").innerHTML = suggestions;
});

neofetch.addEventListener("click", function () {
	this.classList.add("d-none");
});

function setPromptResponse(text, response) {
	promptSummary.innerText = text;
	promptResponseText.innerText = response;

	promptWrapper.classList.add("d-none");
	promptResponse.classList.remove("d-none");

	setTimeout(function () {
		status.innerText = "❌";
		time.innerText = new Date().toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		});
		promptWrapper.classList.remove("d-none");
		promptResponse.classList.add("d-none");
		consoleInput.focus();
	}, 3000);
}
