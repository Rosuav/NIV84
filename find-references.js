console.log("Searching for Scripture references");

//TODO: Magically accept "Song of Solomon" and other aliases
const reference = /(Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1 Samuel|2 Samuel|3 Samuel|1 Kings|2 Kings|3 Kings|1 Chronicles|2 Chronicles|3 Chronicles|Ezra|Nehemiah|Esther|Job|Psalm|Proverbs|Song of Songs|Ecclesiastes|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1 Corinthians|2 Corinthians|3 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|2 Thessalonians|3 Thessalonians|1 Timothy|2 Timothy|3 Timothy|Titus|Philemon|Hebrews|James|1 Peter|2 Peter|3 Peter|1 John|2 John|3 John|Jude|Revelation) ([0-9]+)/g;

function find_refs(obj) {
	if (!obj) return;
	if (obj.nodeType == 3) {
		//Text node. Look for a reference.
		const match = obj.data.split(reference);
		if (match.length > 1)
		{
			const nodes = [document.createTextNode(match[0])]; //Initial text
			for (let i = 1; i < match.length; i += 3)
			{
				const ref = document.createElement("abbr");
				ref.appendChild(document.createTextNode(match[i] + " " + match[i+1]));
				ref.title = "Scripture reference";
				ref.className = "niv84-scripture-reference";
				nodes.push(ref);
				const popup = document.createElement("div");
				popup.appendChild(document.createTextNode("... this is where the text would go ..."));
				popup.className = "niv84-scripture-popup";
				nodes.push(popup);
				nodes.push(document.createTextNode(match[i+2]));
			}
			obj.replaceWith(...nodes);
		}
	} else {
		//DOM node. Recurse.
		find_refs(obj.firstChild);
	}
	find_refs(obj.nextSibling);
}
find_refs(document.body);