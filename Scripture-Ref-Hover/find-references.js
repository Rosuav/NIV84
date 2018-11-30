//console.log("Searching for Scripture references");
//TODO: Somehow notice when new elements are inserted into the DOM and process those
//but without reprocessing our own creations.
//TODO: With editable fields (input/textarea), add a context menu entry.
//See https://developer.chrome.com/extensions/user_interface#context_menu

//TODO: Magically accept "Song of Solomon" and other aliases
const reference = /(Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1 Samuel|2 Samuel|3 Samuel|1 Kings|2 Kings|3 Kings|1 Chronicles|2 Chronicles|3 Chronicles|Ezra|Nehemiah|Esther|Job|Psalm|Proverbs|Song of Songs|Ecclesiastes|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1 Corinthians|2 Corinthians|3 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|2 Thessalonians|3 Thessalonians|1 Timothy|2 Timothy|3 Timothy|Titus|Philemon|Hebrews|James|1 Peter|2 Peter|3 Peter|1 John|2 John|3 John|Jude|Revelation) ([0-9]+)/g;
//TODO: Know which books have only one chapter, and validate against the number of verses, but hotlink to the entire book.

const base = "http://sikorsky.rosuav.com:8082/";

function find_refs(obj) {
	if (!obj) return;
	if (obj.nodeType == 3) {
		//Text node. Look for a reference.
		const match = obj.data.split(reference);
		if (match.length > 1)
		{
			const nodes = [document.createTextNode(match[0])]; //Initial text
			let actually_changed = false;
			for (let i = 1; i < match.length; i += 3)
			{
				const chapters = booklengths[match[i]] || 0;
				const chap = parseInt(match[i+1], 10);
				const text = document.createTextNode(match[i] + " " + match[i+1]); //Make sure this closely matches the original text
				if (!chap || !chapters || chap > chapters) {
					//It's probably NOT a Scripture reference. Just put the original text back.
					//For instance, "Job 273109" matches the regex, but isn't linkable.
					nodes.push(text);
					continue;
				}
				actually_changed = true;
				const ref = document.createElement("abbr");
				ref.appendChild(text);
				ref.title = "Scripture reference";
				ref.className = "niv84-scripture-reference";
				nodes.push(ref);
				const popup = document.createElement("div");
				//TODO: Lazily load (probably in response to a hover event or something)
				popup.innerHTML = '<iframe src="' + base + match[i].replace(" ", "%2520") + '+' + match[i+1] + '.html"></iframe>';
				popup.className = "niv84-scripture-popup";
				nodes.push(popup);
				nodes.push(document.createTextNode(match[i+2]));
			}
			if (actually_changed) {
				obj.replaceWith(...nodes);
				obj = nodes[nodes.length - 1]; //Chain to the new next-sibling
			}
		}
	} else {
		//DOM node. Recurse.
		find_refs(obj.firstChild);
	}
	find_refs(obj.nextSibling);
}
find_refs(document.body);
