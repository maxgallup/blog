# /bin/bash

echo "Converting from Markdown to HTML"

for file in *.md; do
	if [ -f $file ]
	then
        echo "    $file"
		newfile=$(echo $file | sed 's/.md/.html/')
		pandoc -f markdown -t html5 $file -o $newfile
		mv $newfile ~/blog/html/
	else
        echo "No .md files found"
    fi
done

echo "done"
