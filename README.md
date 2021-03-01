# blog


### Writing posts

In order to easily and efficiently write blog posts in markdown, they need to be converted to HTML. We will save all posts written in markdown in a `blog/posts` directory that is placesd in the same project directory as the rest of the code and then store the converted HTML files in `blog/blog/views/partials/posts`. Converting from markdown to HTML will be done using the command line tool [pandoc](https://pandoc.org/MANUAL.html). A short shell script will automate the conversion process for us so that all of the markdown files will always be converted into the `blog/blog/views/partials/posts` directory. When we are done writing a blog and we are currently in the post in the `blog/posts` directory, we can just run the shell script and it will do all of the converting and moving for us.

``` sh
for file in *.md; do
	if [ -f $file ]
	then
        echo "    $file"
        newEjsFile=$(echo $file | sed 's/.md/.ejs/')
		pandoc -f markdown -t html5 $file -o $newEjsFile
		mv $newEjsFile ~/blog/blog/views/partials/posts
	else
        echo "No .md files found"
    fi
done
```

The first line in the for loop checks to see if there are any files that end in `.md`. If there are, we create a variable that stores the name of the file and swaps `.md` for `.ejs`, see [sed command](https://www.howtogeek.com/666395/how-to-use-the-sed-command-on-linux/). On the next line `pandoc` converts from markdown to html and we specify the name of the output file with the previously created variable. Finally, the file needs to be moved into the `.../partials/posts` directory, which is given by and absolute path. Saving the shell script above as root into the `/usr/bin` directory on linux machines, allows you to run the script anywhere on your machine simply by typing its name into the command line, for example `convertmd`.

