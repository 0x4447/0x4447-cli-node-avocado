# 0x4447 Avocado 🥑

After having created the usefull CLI [0x4447 Potato](https://github.com/0x4447/0x4447-cli-node-potato)🥔 we found that deploying a simple HTML page that is not build around a framewrok is bit to anoying and time consuming. This is why we came up with the idea of Avocado–a CLI that will build the final page out of a simple folder structure.

# Actions that Avocado Does

- Removes any files and folder inside the `_output` fodler of the source project
- Reads the JSON data that will be used by hogan do enrich the page
- Renders the final page usign Hogan
- Copise the final page from the `_input` folder to the `_otput` one
- Removes the `.html` from the urls in the menu 
- Removes the `.thml` format from the HTML files themself.

The last two steps are mad so, wehn you deploy the page on CloudFront you will have a URL that looks like https://0x4447.com/contact, instead of https://0x4447.com/contact.html.

# Why This Name?

Why not? We had to call it something. And once you see it, you're not going to forget it. 😃

# The End

If you enjoyed this article/project, please consider giving it a 🌟. And check out our [0x4447 GitHub account](https://github.com/0x4447), where we have additional articles and tools that you might find interesting.

# For Hire 👨‍💻 👩‍💻

If you'd like us to help you with something, please feel free to say hello@0x4447.com, and share what's on your mind. We'll take a look, and try our best to help you. Or visit our website at: [0x4447.com](https://0x4447.com).
