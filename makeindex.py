def generate_book(book):
	chapters = "1 2 3".split() # FIXME
	chapters = [f'<li><a href="{book}%2B{chap}.html">1</a></li>\n' for chap in chapters]
	return f"""	<tr><td>{book}</td><td><ul>
		{"		".join(chapters)}
		</ul></td></tr>
"""

def generate_table(books, heading):
	books = [generate_book(book) for book in books.split()]
	return  f"""<h3>{heading}</h3>
	<table>
	{"	".join(books)}
	</table>
"""

OT = "Genesis Exodus Leviticus Numbers Deuteronomy #Chronicles"
NT = "Matthew Mark Luke John #Peter"
OT_table = generate_table(OT, "Old Testament")
NT_table = generate_table(NT, "New Testament")

with open("Bible/index.html", "w") as f:
	f.write(f"""<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>NIV84</title>
		<style>
		ul, ul li {{display: inline-block; padding: 0.25em;}}
		</style>
	</head>

	<body>
	<h1>THE BIBLE</h1>
	<h2>New International Version 1984 (NIV1984)</h2>
	{OT_table}
	{NT_table}
	</body>
</html>
""")
