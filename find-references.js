console.log("Searching for Scripture references");

function find_refs(obj) {
	if (!obj) return;
	if (obj.nodeType == 3) {
		//Text node. Look for a reference.
		console.log("Checking", obj.data);
	} else {
		//DOM node. Recurse.
		find_refs(obj.firstChild);
	}
	find_refs(obj.nextSibling);
}
find_refs(document.body);
