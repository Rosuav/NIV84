template = """<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>NIV84</title>
		<style>
		ul, ul li {display: inline-block; padding: 0.25em;}
		</style>
	</head>

	<body>
	<h1>THE BIBLE</h1>
	<h2>New International Version 1984 (NIV1984)</h2>
	...
	</body>
</html>
"""

table = """	<h3>...</h3>
	<table>
	...
	</table>
"""

book = """	<tr><td>Genesis</td><td><ul>
	<li><a href="Genesis%2B1.html">1</a></li>
	<li><a href="Genesis%2B2.html">2</a></li>
	<li><a href="Genesis%2B3.html">3</a></li>
	<li><a href="Genesis%2B4.html">4</a></li>
	<li><a href="Genesis%2B5.html">5</a></li>
	<li><a href="Genesis%2B6.html">6</a></li>
	<li><a href="Genesis%2B7.html">7</a></li>
	<li><a href="Genesis%2B8.html">8</a></li>
	</ul></td></tr>
"""

OT = "Genesis Exodus Leviticus Numbers Deuteronomy #Chronicles"
NT = "Matthew Mark Luke John #Peter"
OT_table = generate_table(OT, "Old Testament")
NT_table = generate_table(NT, "New Testament")
