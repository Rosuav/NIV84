int main()
{
	foreach (glob("*.html",get_dir()),string fn)
	{
		sscanf(Stdio.read_file(fn),"%s</title>%*s<div class='heading passage-class-0'>%s<div class=\"passage-scroller\">",string hdr,string body);
		if (!body) {write("Unable to parse: %s\n",fn); continue;}
		while (sscanf(body,"%s\"/web/%s\"%s",string before,string url,string after)) //Clean up the archive.org URLs
		{
			if (sscanf(url,"%*s#%s",string hash) && hash) url="#"+hash; //Turn hash links relative, hoping that they're within-page ones
			else sscanf(url,"%*[0-9]/%s",url); //Turn others to absolute
			body=sprintf("%s\"%s\"%s",before,replace(url,"&","&amp;"),after);
		}
		while (sscanf(body,"%s<sup class='footnote' value='%*s'>%s",string before,string after)) body=sprintf("%s<sup class='footnote'>%s",before,after); //Strip the non-standard value='......' attribute on sup
		Stdio.File(fn,"wct")->write("%s</title>\n<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n</head><body>\n<div class='heading passage-class-0'>%s</body></html>",hdr,body);
	}
}
