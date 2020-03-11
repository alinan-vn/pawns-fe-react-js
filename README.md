**Note** this repo contains the front end code for Pawns, for installation and reference to the back end code is located in this README.
#
# Pawns #
is a News Feed web application intended to connect Chess related news. The application hosts personal articles as well as offers other resources (currently just NYTimes chess related articles). User can leave their own chess related bio and leave their comments on the Pawns website.
#
Front end requirements:

* React
* Redux
* React Router
* Semantic-Ui
* Semantic-Ui-React
#
Back end requirements and instructions:
* https://github.com/alinan-vn/pawns-be-ruby-on-rails

To view the application fork/clone this repo and follow the commands listed below.

This installs many default gems but additional ones such as: Postgres, bcrypt, jwt, rack-cors, and faker.
```bundle install```

This sets up the postgres server
```rails db:create```

Loads and sets up the schema
```rails db:migrate```

Seeds data necessary to the application.
```rails db:seed```

