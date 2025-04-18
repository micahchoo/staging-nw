```dataview
TABLE
		length(rows.file.tags) as numtags
	, join(rows.file.link, ", ") as tags
FROM "Home"
FLATTEN file.tags as tag
GROUP BY tag
SORT numtags DESC
```



