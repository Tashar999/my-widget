# my-widget

Starter for the CS Club widget hackathon. Three files, plain HTML, CSS and JavaScript.

- `index.html` is what's on the page
- `style.css` is how it looks
- `script.js` is what it does

Build your widget in those three files. There are two finished examples to look at:

- `standard/` is a clock with a greeting. Small enough to read in five minutes.
- `advanced/` is a weather widget. It calls a real API and retries when the request fails.

With the server running (step 4 below), open `/standard/` or `/advanced/` at the end of your preview URL to see them.

## Getting started

1. Click **Fork** (top right), then **Create fork**. Now you have your own copy.
2. Working with a partner? On your fork, go to **Settings → Collaborators → Add people**.
3. Click the green **Code** button → **Codespaces** → **Create codespace on main**.
4. In the Codespace terminal, run:

   ```
   python3 -m http.server 8000
   ```

   Then click **Open in Browser**. Refresh that tab after every change.
5. To save your work: **Source Control** tab → type a message → **Commit** → **Sync Changes**.

## Using AI

Open `ai.md`, copy all of it, and paste it as the first message in a new Gemini chat. Then tell it which tier you want. It sets how much the AI does for you and how much you figure out yourself.

If you just want the AI to build everything, skip `ai.md`. You're still responsible for every line you commit.
