/* Stuff I might be able to make use of:
* https://developer.chrome.com/extensions/user_interface#context_menu
  - Right-click on anything to react to the selected text, even inside an input/textarea
* https://developer.chrome.com/extensions/content_scripts
  - Run a script on every page, once it's loaded, and look for references
*/
chrome.runtime.onInstalled.addListener(function() {
	console.log("Hello, world!");
});
