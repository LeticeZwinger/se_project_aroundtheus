# [Project 3: Around The U.S.](https://leticezwinger.github.io/se_project_aroundtheus/)

# Table of Contents

# Description
A small, profileless image board written in React. On the site people can post pictures from their favorite trips around the USA! Users can also delete anyone elses post and change the profile's name and description.

This is the project #3 of Triple10 web dev program. In this project we practice:

- HTML semantics
- CSS properties
- Grid layouts
- Responsive web design
- Media queries
- RESTful APIs

![desktop-view](/src/images/desktop-view.png)

# API

Posts are saved into TripleTen's database via implemented API calls:
* GET - getInitialCards()  
* GET - getUserInfo()
* PATCH - updateUserInfo(data) -> data.name, data.about 
* PATCH - updateProfileImage(data) -> data.profileImage 
* POST - addCard(data) -> data.link, data.name 
* DELETE - deleteCard(cardId) 
* PUT - likeCard(cardId) 
* DELETE - unlikeCard(cardId)

# Deploy
* Install Dependencies
npm install

* Development Mode
npm run dev

* Production Build
npm run build

* Deploying
npm run deploy


# System Requirements
* Node.js:
* Recommended: v14.x or higher
* Minimum: v10.13.0 (many dependencies require Node v10.13.0 or later)
(Ensure you are running a stable, modern version of Node; using Node v14 or v16 is advised.)
* npm:
* Version 6.x or higher (bundled with Node.js)
Alternatively, you may use Yarn if preferred.
*	JavaScript:
* The application is built using JavaScript. 


# Plugins

	Babel
	 •	@babel/core v7.18.9
	 •	@babel/preset-env v7.18.9
	 •	babel-loader v8.2.5
  
	Webpack
	 •	webpack v5.76.0
         •      webpack-cli v4.10.0
	 •	webpack-dev-server v4.9.3
  
	PostCSS and Related Plugins
	 •	postcss-loader v7.0.1
	 •	autoprefixer v10.4.7
	 •	cssnano v5.1.12
  
	CSS Tooling
	 •	css-loader v6.7.1
	 •	mini-css-extract-plugin v2.6.1
  
	HTML Tooling
         •	html-webpack-plugin v5.5.0
	 
	Deployment Tool
	 •	gh-pages v6.1.1 



# [Video Demo](https://youtu.be/CKeBrD3_7iM)

# [Figma Design](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)
