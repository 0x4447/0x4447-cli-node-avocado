# 🥑 Avocado

After having created the useful [0x4447 Potato](https://www.npmjs.com/package/@0x4447/potato) 🥔 CLI, we found that deploying a simple HTML page to AWS CloudFront, a page that is not build around a framework, is annoying and time consuming. This is why we came up with the idea for Avocado: a CLI that will build the final page out of a simple folder structure by using the awesome templating engine–Hogan.

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

- Removes the `_preview` and `_output` folder, this way we have a clean slate.
- Creates empty `_preview` and `_output` folder.
- Reads the JSON files from the `data` folder.
- Reads the JSON files from the `env.json` file.
- Merge the two data sets together.
- Renders the final page using Hogan.
- Save the result in the `_preview` and `_output` folder.

# Folder Structure of the Source Site

The root folder will contain the `_input` folder where the content of the site is located. The `data`, and `views` folders holds the data and the HTML files which are used to generate the previews and final output.

- Root
- _input/
  - assets/ - all your images, js, css and other.
  - data/ - JSON files for each page from the `view` folder to enrich the page using Hogan.
  - views/ - all pages in HTML form which can be organized using sub folders.
  - any file to be included in the final page.
- env.json - a JSON file that holds the environment variables that are uniquer per page deployment, and should not committed to the repository.

If you'd like to try out Avocado, you can take a look at our [company website repository](https://github.com/0x4447/0x4447.com) for reference.

# How to deliver the site locally

If you have just a single page it is easy to check the page by opening the individual HTML file. But if you'd like to have a local setup with a custom local domain and a self signed SSL cert, you can [check our configuration that we use](https://github.com/0x4447/0x4447-The-Library/tree/master/programmer/front-end/local-setup).

# Companion Software

This CLI tools works well also with the following software:

- [Potato](https://www.npmjs.com/package/@0x4447/potato): it helps you host and upload your work on to AWS S3 and deliver the site through AWS CloudFront.
- [Broccoli](https://www.npmjs.com/package/@0x4447/broccoli): it helps you create a Nginx configuration to work one the site from your local machine.

# The End

If you enjoyed this project, please consider giving it a 🌟. And check out our [0x4447 GitHub account](https://github.com/0x4447), where we have additional resources that you might find useful or interesting.

# Sponsor

This project is brought to you by 0x4447 LLC, a software company specializing in build custom solutions on top of AWS. Find out more by following this link: https://0x4447.com or, send an email at [hello@0x4447.email](mailto:hello@0x4447.email?Subject=Hello%20From%20Repo&Body=Hi%2C%0A%0AMy%20name%20is%20NAME%2C%20and%20I%27d%20like%20to%20get%20in%20touch%20with%20someone%20at%200x4447.%0A%0AI%27d%20like%20to%20discuss%20the%20following%20topics%3A%0A%0A-%20LIST_OF_TOPICS_TO_DISCUSS%0A%0ASome%20useful%20information%3A%0A%0A-%20My%20full%20name%20is%3A%20FIRST_NAME%20LAST_NAME%0A-%20My%20time%20zone%20is%3A%20TIME_ZONE%0A-%20My%20working%20hours%20are%20from%3A%20TIME%20till%20TIME%0A-%20My%20company%20name%20is%3A%20COMPANY%20NAME%0A-%20My%20company%20website%20is%3A%20https%3A%2F%2F%0A%0ABest%20regards.).
