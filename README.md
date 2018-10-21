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
- Reads the JSON files from the `data` folder to help Hogan enrich the pages.
- Renders the final page using Hogan.
- Save the result in the `_preview` and `_output` folder.
- Removes the `.html` ending from any HREF on the page.

The last steps is done, to make sure the URL on the page points to something like this https://0x4447.com/contact, instead of https://0x4447.com/contact.html. Since [0x4447 Potato](https://github.com/0x4447/0x4447-cli-node-potato) will strip the file format from the `.html` files.

# Folder Structure of the Source Site

If you'd like to try out Avocado, you can take a look at our [company website repository](https://github.com/0x4447/0x4447.com). The structure of the project was set to make it easy to use it with AWS CodeBuild.

The root folder will contain the `_input` folder where the content of the site is located. The `data`, and `views` folders holds the data and the HTML files which are used to generate the previews and final output.

All the other files and folders in the root directory are for CodeBuild itself.

# How to deliver the site locally

### SSL Snake oil

If you want to work on the content of the site on you local machine, then you can use Nginx for that. Nginx will use the dummy SSL certificate called `snakeoil`, to deliver the site over HTTPS. If you don't have it in your system you can generate one using the following command.

```
sudo apt-get install ssl-certsudo make-ssl-cert generate-default-snakeoilsudo
usermod --append --groups ssl-cert $(whoami)
```

### Nginx Config

Bellow you can find the bare minimum configuration to make it all work.

```
#
#	Server Configuration
#
server {

	listen 80;
	listen [::]:80;

	listen 443 ssl;
	listen [::]:443 ssl;

	#
	#	Use the a default SSL for development.
	#
	include snippets/snakeoil.conf;

	#
	#	Tell which folder to server.
	#
	root /PATH/YOUR_SITE_NAME/_output;

	#
	#	Set the default file.
	#
	index /home;

	#
	#	Tell Nginx which url is this configuration for.
	#
	server_name login.example.loc;

	#
	#	Default configuration.
	#
	location / {

		#
		#	Since we deliver files with no extension, we need to tell
		#	Nginx what those files are.
		#
		default_type text/html;

		#
		#	Tell the browser that any Origin file is OK.
		#
		add_header Access-Control-Allow-Origin *;

		#
		#	First attempt to serve request as file, then
		#	as directory, then fall back to displaying a 404.
		#
		try_files $uri $uri.html $uri/ =404;

	}
}
```

# Companion Software

This CLI tools works well also with the following software:

- [Potato](https://www.npmjs.com/package/@0x4447/potato): it helps you host and upload your work on to AWS S3 and deliver the site through AWS CloudFront.
- [Broccoli](https://www.npmjs.com/package/@0x4447/broccoli): it helps you create a Nginx configuration to work one the site from your local machine.

# The End

If you enjoyed this project, please consider giving it a 🌟. And check out our [0x4447 GitHub account](https://github.com/0x4447), where we have additional resources that you might find useful or interesting.

# Sponsor

This project is brought to you by 0x4447 LLC, a software company specializing in build custom solutions on top of AWS. Find out more by following this link: https://0x4447.com or, send an email at [hello@0x4447.email](mailto:hello@0x4447.email?Subject=Hello%20From%20Repo&Body=Hi%2C%0A%0AMy%20name%20is%20NAME%2C%20and%20I%27d%20like%20to%20get%20in%20touch%20with%20someone%20at%200x4447.%0A%0AI%27d%20like%20to%20discuss%20the%20following%20topics%3A%0A%0A-%20LIST_OF_TOPICS_TO_DISCUSS%0A%0ASome%20useful%20information%3A%0A%0A-%20My%20full%20name%20is%3A%20FIRST_NAME%20LAST_NAME%0A-%20My%20time%20zone%20is%3A%20TIME_ZONE%0A-%20My%20working%20hours%20are%20from%3A%20TIME%20till%20TIME%0A-%20My%20company%20name%20is%3A%20COMPANY%20NAME%0A-%20My%20company%20website%20is%3A%20https%3A%2F%2F%0A%0ABest%20regards.).
