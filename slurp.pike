Stdio.File stdout=Stdio.File("stdout.txt","wac");
Stdio.File stderr=Stdio.File("stderr.txt","wac");
void fetch(string url,array newdir)
{
	sscanf(url,"%*ssearch=%s&",string outfile);
	if (has_value(newdir,outfile+".html")) return;
	write("%s Fetching %s\n",ctime(time())[..<1],url);
	mapping rc=Process.run(({"wget","http://web.archive.org"+url,"-O",outfile+".html"}));
	if (rc->stdout && rc->stdout!="") stdout->write("----------\n%s\n----------\n%s\n",url,rc->stdout);
	if (rc->stderr && rc->stderr!="") stderr->write("----------\n%s\n----------\n%s\n",url,rc->stderr);
}
int main(int argc,array(string) argv)
{
	foreach (argv[1..],string url) fetch(url,({ }));
	array(string) dir=({ });
	while (1)
	{
		array(string) newdir=get_dir();
		array(string) newfiles=newdir-dir;
		if (!sizeof(newfiles)) break;
		foreach (newfiles,string fn) if (fn!="slurp.pike" && !has_suffix(fn,".1"))
		{
			array(string) data=Stdio.read_file(fn)/">>";
			if (sizeof(data) && sscanf((data[0]/"\n")[-1],"%*shref=\"%s\"",string url) && has_value(url,"1984")) fetch(url,newdir);
		}
		dir=newdir;
	}
}
