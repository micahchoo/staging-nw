```dataview
TABLE
		length(rows.file.frontmatter.categories) as count
	, join(rows.file.link, ", ") as categories
FROM "Home/_posts"
FLATTEN file.frontmatter.categories as cat
GROUP BY cat
SORT numtags DESC
```
