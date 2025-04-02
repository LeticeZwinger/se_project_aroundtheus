# [Project 3: Around The U.S.](https://leticezwinger.github.io/se_project_aroundtheus/)

# Table of Contents

- [Description](#description)
- [API](#api)
- [Deploy](#deploy)
- [System Requirements](#system-requirements)
- [Plugins](#plugins)
- [<a href="https://youtu.be/CKeBrD3_7iM" rel="nofollow">Video Demo</a>](https://youtu.be/CKeBrD3_7iM)
- [<a href="https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1" rel="nofollow">Figma Design</a>](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3:-Around-the-US?node-id=0:1)

<!-- Created by https://github.com/ekalinin/github-markdown-toc -->

# Description

A small, profileless image board written in JavaScript. On the site people can post pictures from their favorite trips around the USA! Users can also delete anyone elses post and change the profile's name and description.

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

- GET - getInitialCards()
- GET - getUserInfo()
- PATCH - updateUserInfo(data) -> data.name, data.about
- PATCH - updateProfileImage(data) -> data.profileImage
- POST - addCard(data) -> data.link, data.name
- DELETE - deleteCard(cardId)
- PUT - likeCard(cardId)
- DELETE - unlikeCard(cardId)

# Deploy

    Install Dependencies
    •	npm install

    Development Mode
    •	npm run dev

    Production Build
    •      npm run build

    Deploying
    •	npm run deploy

# System Requirements

- Node.js:
- Recommended: v14.x or higher
- Minimum: v10.13.0 (many dependencies require Node v10.13.0 or later)
  (Ensure you are running a stable, modern version of Node; using Node v14 or v16 is advised.)
- npm:
- Version 6.x or higher (bundled with Node.js)
  Alternatively, you may use Yarn if preferred.
- JavaScript:
- The application is built using JavaScript.

# Plugins

    Babel
    • @babel/core v7.18.9 – The main package that compiles modern JavaScript
    • @babel/preset-env v7.18.9 – Smart preset that lets you use the latest JS based on your target environments
    • babel-loader v8.2.5 – Allows Webpack to process JavaScript files through Babel

    Webpack
    • webpack v5.76.0 – Bundles the project’s files and assets
    • webpack-cli v4.10.0 – Command-line interface for running Webpack
    • webpack-dev-server v4.9.3 – Runs a local server with live reload for development

    PostCSS and Related Plugins
    • postcss-loader v7.0.1 – Lets you use PostCSS with Webpack
    • autoprefixer v10.4.7 – Adds vendor prefixes to CSS automatically
    • cssnano v5.1.12 – Minifies CSS for better performance

    CSS Tooling
    • css-loader v6.7.1 – Interprets @import and url() in CSS
    • mini-css-extract-plugin v2.6.1 – Extracts CSS into separate files instead of inline in JS

    HTML Tooling
    • html-webpack-plugin v5.5.0 – Generates an HTML file and injects bundled scripts/styles

    Deployment
    • gh-pages v6.1.1 – Automates the deployment process, making it easier to publish the project to GitHub Pages

# [Video Demo](https://youtu.be/CKeBrD3_7iM)

# [Figma Design](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)
