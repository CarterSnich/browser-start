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
};

const searchForm = document.getElementById("search-form");
const inputSearch = document.getElementById("input-search");
const promptWrapper = document.getElementById("prompt-wrapper");
const promptResponse = document.getElementById("prompt-response");
const promptSummary = document.querySelector(
	"#prompt-response>div:nth-child(1)>span"
);
const promptResponseText = promptResponse.children[1];

const status = document.getElementById("status");
const time = document.getElementById("time");

const neofetch = document.getElementById("neofetch");

inputSearch.focus();

time.innerText = new Date().toLocaleTimeString([], {
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false,
});

searchForm.addEventListener("click", function (e) {
	e.stopPropagation();
	inputSearch.focus();
});

inputSearch.addEventListener("keydown", function (e) {
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
			setPromptResponse(
				this.innerText,
				"search engine: missing search engine option"
			);
			return;
		}

		// get the search engine
		const engine = SEARCH_ENGINES[engineMatch[1]];
		if (!engine) {
			setPromptResponse(
				this.innerText,
				`search engine: not found: ${engineMatch[1]}`
			);
			clearPromptResponse();
			return;
		}

		// get the search query
		const query = this.innerText.replace(/^@(\w+)\s?/, "");
		if (!query) {
			setPromptResponse(
				this.innerText,
				"search engine: missing search query option"
			);
			return;
		}

		if (e.ctrlKey) {
			window.open(
				`${engine.query_link}?${engine.param_name}=${query}`,
				"_blank"
			);
		} else {
			window.location.href = `${engine.query_link}?${engine.param_name}=${query}`;
		}
	}
});

"mousedown mouseup keydown keyup".split(" ").forEach((e) => {
	inputSearch.addEventListener(e, function () {
		console.log(getCaretPosition(this));
	});
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
		inputSearch.focus();
	}, 3000);
}

function getCaretPosition(editableDiv) {
	var caretPos = 0,
		sel,
		range;
	if (window.getSelection) {
		sel = window.getSelection();
		if (sel.rangeCount) {
			range = sel.getRangeAt(0);
			if (range.commonAncestorContainer.parentNode == editableDiv) {
				caretPos = range.endOffset;
			}
		}
	} else if (document.selection && document.selection.createRange) {
		range = document.selection.createRange();
		if (range.parentElement() == editableDiv) {
			var tempEl = document.createElement("span");
			editableDiv.insertBefore(tempEl, editableDiv.firstChild);
			var tempRange = range.duplicate();
			tempRange.moveToElementText(tempEl);
			tempRange.setEndPoint("EndToEnd", range);
			caretPos = tempRange.text.length;
		}
	}
	return caretPos;
}
