# 🥑 Avocado

After having created the useful [0x4447 Potato](https://github.com/0x4447/0x4447-cli-node-potato) 🥔 CLI, we found that deploying a simple HTML page to AWS CloudFront, a page that is not build around a framework, is annoying and time consuming. This is why we came up with the idea for Avocado: a CLI that will build the final page out of a simple folder structure by using the awesome templating engine–Hogan.

# How to Install

```
] sudo npm install -g @0x4447/avocado
```

# How to Use

```
] avocado -s PATH_TO_FOLDER
```

# Where to get Help

```
] avocado -h
```

# What to Expect

- Removes the `_preview` and `_output` folder, this way we have a clean slate
- Creates empty `_preview` and `_output` folder folders
- Reads the JSON data that will be used by Hogan to enrich the page
- Renders the final page using Hogan in to the `_preview` folder
- Copy the content of the `_input` folder in to the `_preview` one. From there it copies the final content to the `_output` folder
- Removes the `.html` from the URLs in the menu

The last steps is done, to make sure the URL on the page points to something like this https://0x4447.com/contact, instead of https://0x4447.com/contact.html. Since [0x4447 Potato](https://github.com/0x4447/0x4447-cli-node-potato) will strip the file format from the `.html` files.

# Folder Structure of the Source Site

If you'd like to try out Avocado, you can take a look at our [company website repository](https://github.com/0x4447/0x4447.com). The structure of the project was set to make it easy to use it with AWS CodeBuild.

The root folder will contain the `_input` folder where the content of the site is located. The `data`, and `views` folders holds the data and the HTML files which are used to generate the previews and final output.

All the other files and folders in the root directory are for CodeBuild itself.

# The End

If you enjoyed this project, please consider giving it a 🌟. And check out our [0x4447 GitHub account](https://github.com/0x4447), where we have additional resources that you might find useful or interesting.

# For Hire 👨‍💻 👩‍💻

If you'd like us to help you with something, please feel free to say [hello@0x4447.email](mailto:hello@0x4447.email?Subject=Hello%20From%20Repo&Body=Hi%2C%0A%0AMy%20name%20is%20NAME%2C%20and%20I%27d%20like%20to%20get%20in%20touch%20with%20someone%20at%200x4447.%0A%0AI%27d%20like%20to%20discuss%20the%20following%20topics%3A%0A%0A-%20LIST_OF_TOPICS_TO_DISCUSS%0A%0ASome%20useful%20information%3A%0A%0A-%20My%20full%20name%20is%3A%20FIRST_NAME%20LAST_NAME%0A-%20My%20time%20zone%20is%3A%20TIME_ZONE%0A-%20My%20working%20hours%20are%20from%3A%20TIME%20till%20TIME%0A-%20My%20company%20name%20is%3A%20COMPANY%20NAME%0A-%20My%20company%20website%20is%3A%20https%3A%2F%2F%0A%0ABest%20regards.), and share what's on your mind. We'll take a look, and try our best to help you. Or visit our website at: [0x4447.com](https://0x4447.com).
