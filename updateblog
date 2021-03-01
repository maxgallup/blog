# /bin/bash

declare -a fileNames
declare -a titles

echo "Converting from Markdown to HTML"

function convertMdtoHtml() {
    for file in *.md; do
        if [ -f $file ]
        then
            echo "    $file"

            fileNames+=("$(echo $file | sed 's/.md//')")
            titles+=("$(head -1 $file | sed 's/# //')")

            newEjsFile=$(echo $file | sed 's/.md/.ejs/')

            pandoc -f markdown -t html5 $file -o $newEjsFile
            mv $newEjsFile ~/blog/blog/views/partials/posts
        else
            echo "No .md files found"
        fi
    done
}

function createPostsPage() {
    echo "<h1> Posts </h1>" > posts.ejs
    echo "<ul id='postList'>" >> posts.ejs
    for i in ${!fileNames[@]}; do
        echo "    <li><a href='/posts/${fileNames[i]}'>${titles[i]}</a></li>" >> posts.ejs
    done
    echo "</ul>"           >> posts.ejs

    mv posts.ejs ~/blog/blog/views/partials
}

convertMdtoHtml

createPostsPage


echo "done"
