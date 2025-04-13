# Templater Guide: Essential Concepts and Examples

Templater is an Obsidian plugin that lets you insert variables, function results, and execute JavaScript within your notes. This guide covers the essentials to get you started.

## Basic Syntax & Terminology

Templater uses **commands** enclosed in tags. A **template** is simply a file containing these commands.

-   `<% ... %>`: **Interpolation Command**. Executes the expression inside and outputs the result.
-   `<%* ... %>`: **JavaScript Execution Command**. Executes the JavaScript code inside. Does *not* output anything by default.

```markdown
<!-- Example: Interpolation Command -->
Today's date: <% tp.date.now("YYYY-MM-DD") %>

<!-- Example: JavaScript Execution Command -->
<%*
// This code runs but doesn't output directly
let message = "Hello from JavaScript!";
console.log(message);
%>
```

## Accessing Functions

Templater provides **functions** (objects invoked inside commands that return values) accessed via the `tp` object, organized into modules. There are two types:
-   **Internal Functions**: Built-in functions provided by Templater (e.g., `tp.date.now`).
-   **User Functions**: Custom functions you define via scripts or system commands (accessed via `tp.user.<your_function_name>`).

```
tp.<module_name>.<function_name>(arguments...)
```

**Example:**

```markdown
<!-- Get the current file's title -->
File Title: <% tp.file.title %>

<!-- Get tomorrow's date -->
Tomorrow: <% tp.date.tomorrow("dddd, MMMM Do") %>
```

## Common Function Modules

### Date Module (`tp.date`)

Handles date and time operations. Uses [Moment.js](https://momentjs.com/) formatting.

```markdown
<!-- Current date (default format YYYY-MM-DD) -->
<% tp.date.now() %>

<!-- Current date and time, custom format -->
<% tp.date.now("dddd, MMMM Do YYYY, h:mm:ss a") %>

<!-- Date 7 days from now -->
<% tp.date.now("YYYY-MM-DD", 7) %>

<!-- Access Moment.js directly (Templater uses it internally) -->
<% moment().format("LLLL") %>
```

### File Module (`tp.file`)

Interacts with the current file and other files in the vault.

```markdown
<!-- Get the file title -->
<% tp.file.title %>

<!-- Get the file's folder path (relative to vault) -->
<% tp.file.folder(true) %>

<!-- Get the file creation date -->
<% tp.file.creation_date("YYYY-MM-DD HH:mm") %>

<!-- Get the file last modified date -->
<% tp.file.last_modified_date("YYYY-MM-DD HH:mm") %>

<!-- Get the current text selection -->
<% tp.file.selection() %>

<!-- Include content from another note -->
<% tp.file.include("[[My Other Note]]") %>

<!-- Place the cursor here after template insertion -->
<% tp.file.cursor() %>

<!-- Create a new note (use <%* for async operations) -->
<%*
const createdFile = await tp.file.create_new("# New Note Content", "New Note Name");
tR += `Created: [[${createdFile.basename}]]`; // Output link
%>
```

### System Module (`tp.system`)

Provides interaction with the system, like prompts and clipboard.

```markdown
<!-- Get clipboard content -->
<% tp.system.clipboard() %>

<!-- Prompt user for input -->
<%*
let userName = await tp.system.prompt("What is your name?");
tR += `Hello, ${userName}!`;
%>

<!-- Suggest options to the user -->
<%*
let chosenMood = await tp.system.suggester(["Happy", "Sad"], ["Happy", "Sad"], false, "How are you feeling?");
tR += `You are feeling: ${chosenMood}`;
%>

<!-- Suggest a file from the vault -->
<%*
const files = tp.app.vault.getMarkdownFiles(); // Use tp.app for Obsidian API
const chosenFile = await tp.system.suggester( (file) => file.basename, files, false, "Select a file");
if (chosenFile) { tR += `Selected: [[${chosenFile.basename}]]`; }
%>
```

### Web Module (`tp.web`)

Fetches data from the web.

```markdown
<!-- Get a daily quote -->
<% tp.web.daily_quote() %>

<!-- Get a random picture URL from Unsplash -->
<% tp.web.random_picture("800x600", "nature,landscape") %>

<!-- Fetch data from an API (result is usually a string) -->
<%*
const url = "https://jsonplaceholder.typicode.com/todos/1";
const result = await tp.web.request(url);
// You might need to parse JSON: const data = JSON.parse(result);
tR += `API Result (first 50 chars): ${result.substring(0, 50)}...`;
%>
```

## JavaScript Execution (`<%* ... %>`)

Execute arbitrary JavaScript. Use `await` for asynchronous functions (like prompts or file operations). To output results, append to the `tR` variable.

```markdown
<%*
// Simple calculation
let a = 5;
let b = 10;
let sum = a + b;
// Output the result using tR
tR += `The sum of ${a} and ${b} is ${sum}.`;

// Conditional logic based on file title
if (tp.file.title.toLowerCase().includes("meeting")) {
  tR += "\n## Meeting Notes\n";
} else {
  tR += "\n## General Notes\n";
}

// Using frontmatter
let noteType = tp.frontmatter["note type"]; // Use brackets for keys with spaces
if (noteType === "seedling") {
  tR += "\nStatus: Seedling - needs development.";
}

// Accessing Obsidian API via tp.app or tp.obsidian
const activeLeaf = tp.app.workspace.activeLeaf;
console.log("Current view mode:", activeLeaf.getViewState().state.mode);
%>
```

## Whitespace Control

Control newlines around commands using `-` or `_`:

-   `-%>`: Removes *one* newline after the command.
-   `_%>`: Removes *all* whitespace (including newlines) after the command.
-   `<%-`: Removes *one* newline before the command.
-   `<%_`: Removes *all* whitespace (including newlines) before the command.

**Example:**

```markdown
<%* if (true) { -%>
Content without extra line above.
<%* } -%>
Content without extra line below.

<%_ "No space before." _%>No space after.
```

## User Functions (`tp.user`)

Define custom functions using JavaScript files or system commands (requires configuration in Templater settings).

**JavaScript Example (`Scripts/myUtils.js`):**

```javascript
// Scripts/myUtils.js
function greet(name) {
  return `Hello, ${name}! This is from my custom script.`;
}
module.exports = greet;
```

**Template Usage:**

```markdown
<% tp.user.myUtils("Obsidian User") %>
```

## Key Settings Highlights

-   **Template folder location**: Specifies the folder containing your `.md` template files.
-   **Syntax Highlighting**: Toggles syntax highlighting for Templater commands in editor mode (Desktop/Mobile).
-   **Automatic jump to cursor**: Automatically moves the cursor to a `<% tp.file.cursor() %>` location after template insertion.
-   **Trigger Templater on new file creation**: Enables automatic template execution when new files are created.
    -   **Folder Templates**: Apply a specific template based on the folder a new note is created in (deepest match wins). Mutually exclusive with Regex Templates.
    -   **File Regex Templates**: Apply a template if the new file's path matches a specified regex pattern (first match wins). Mutually exclusive with Folder Templates.
-   **Template Hotkeys**: Allows binding specific templates to keyboard shortcuts.
-   **Startup Templates**: Templates that run once when Templater starts (useful for setting up hooks).
-   **User Script Functions Folder**: Folder containing `.js` files (CommonJS modules) defining custom `tp.user` script functions.
-   **User System Command Functions**: Define `tp.user` functions that execute system commands (use with caution).

This guide provides a starting point. Explore the full Templater documentation for more advanced features and detailed function references.
