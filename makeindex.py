import os
import fnmatch
dir = set(os.listdir("Bible"))
dir.discard("index.html")

def generate_book(book, strict=True):
	if book.startswith("#"):
		ret = []
		for i in range(1, 4):
			cur = generate_book(f"{i}%20{book[1:]}", strict=(i == 1))
			if cur: ret.append(cur)
		return "	".join(ret)
	prefix = book + "+"
	chapters = fnmatch.filter(dir, prefix + "*.html")
	dir.difference_update(chapters)
	chapters = [int(fn[len(prefix):-5]) for fn in chapters]
	if not chapters:
		if strict: raise ValueError("No files found for book %r" % book) # Probable typo in book name
		return ""
	chapters.sort()
	chapters = [f'<li><a href="{book.replace("%", "%25")}%2B{chap}.html">{chap}</a></li>\n' for chap in chapters]
	return f"""	<tr><td>{book.replace("%20", " ")}</td><td><ul>
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

if dir:
	print("Unused files in directory:")
	print(", ".join(sorted(fn[:-5].replace("%20", " ").replace("+", " ") for fn in dir)))
