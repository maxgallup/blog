# Static Markdown Blog with EJS, Express and Shell

### Main Idea
The goal of this project is to create a simple node based blog that generates posts based on markdown documents. As the blog writer, you will write blog posts in markdown which will the be converted into HTML using shell scripting. The blog posts will then be displayed on their own page and separately, as a collection under a "Posts" page where you will see the title and date of the post. All functionality perviously described will be implemented in node js within a `server.js` file and a `updateblog.sh` script which will have to be run manually by the Blogger when updating/writing blogs on the host machine. This tutorial will only focus on blog content, and not styling.

### EJS
Using templates with javascript will allow us to have a single `index.ejs` page with a common title, navigation bar and/or footer. Then every endpoint like the individual posts or the home page will include just those specific HTML elements in their respective `.ejs` files. All templates, including `index.ejs` will be stored inside of a `views` directory. Within that all specific endpoints will be stored under the `partials` directory and within that all specific posts will be stored under `posts`.

### Express Routing and Rendering
Every endpoint renders the `index.ejs` file with a given object passing along the name of the content that should be displayed on every given page. In the example below, we are passing a `{view: 'posts'}` which will be accepted within the body of the `index.ejs` file. Effectively copying the contents of `posts.ejs` into the body of `index.ejs`.
```js
//server.js
app.get('/posts', (req, res) => {
    res.render('index', {view:'posts'});
});

//index.ejs
<body>
    ...
    <%- include('partials/' + view) -%>
    ...
</body>
```



### Creating or Updating posts

In order to easily and efficiently write blog posts, they need to be converted to HTML from Markdown. We will save all posts written in markdown in a `blog/posts` directory that is placesd in the same project directory as the rest of the code and then store the converted HTML files in `blog/views/partials/posts`. Converting from markdown to HTML will be done using the command line tool [pandoc](https://pandoc.org/MANUAL.html). A short shell script will automate the conversion process for us so that all of the markdown files will always be converted into the `blog/views/partials/posts` directory. When we are done writing a blog and we are currently in the post in the `blog/posts` directory, we can just run the shell script and it will do all of the converting and moving for us.

``` sh
for file in *.md; do
    if [ -f $file ]
    then
        echo "    $file"
        newEjsFile=$(echo $file | sed 's/.md/.ejs/')
        pandoc -f markdown -t html5 $file -o $newEjsFile
        mv $newEjsFile ~/blog/views/partials/posts
    else
        echo "No .md files found"
    fi
done
```

The first line in the for loop checks to see if there are any files that end in `.md`. If there are, we create a variable that stores the name of the file and swaps `.md` for `.ejs`, see [sed command](https://www.howtogeek.com/666395/how-to-use-the-sed-command-on-linux/). On the next line `pandoc` converts from markdown to html and we specify the name of the output file with the previously created variable. Finally, the file needs to be moved into the `.../partials/posts` directory, which is given by and absolute path. Saving the shell script above as root into the `/usr/bin` directory on linux machines, allows you to run the script anywhere on your machine simply by typing its name into the command line, for example `convertmd`.

### Posts page

The aim of the posts page is to display a collection of all posts with date and title information. Additionally the titles should be clickable links to the full posts. 


