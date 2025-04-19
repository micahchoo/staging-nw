```dataview
TABLE
		length(rows.file.frontmatter.tags) as numtags
	, join(rows.file.link, ", ") as tags
FROM "Home"
FLATTEN file.frontmatter.tags as tag
GROUP BY tag
SORT numtags DESC
```



