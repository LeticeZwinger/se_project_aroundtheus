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

# [Video Demo](https://youtu.be/CKeBrD3_7iM)

# [Figma Design](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)

![desktop-view](/images/desktop-view.png)

# API

Posts are saved into TripleTen's database via implemented API calls:

  GET - getInitialCards()
  
  GET - getUserInfo()
  
  PATCH - updateUserInfo(data) -> data.name, data.about
  
  PATCH - updateProfileImage(data) -> data.profileImage
  
  POST - addCard(data) -> data.link, data.name
  
  DELETE - deleteCard(cardId)
  
  PUT - likeCard(cardId)
  
  DELETE - unlikeCard(cardId)
