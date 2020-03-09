Pawns is a News Feed web application intended to connect Chess related news. The application hosts personal articles as well as offers other resources (currently just NYTimes chess related articles). User can leave their own chess related bio and leave their comments on the Pawns website.

To view the application fork/clone this repo and follow the commands listed below.

This installs many default gems but additional ones such as: Postgres, bcrypt, jwt, rack-cors, and faker.
```bundle install```

This sets up the postgres server
```rails db:create```

Loads and sets up the schema
```rails db:migrate```

Seeds data necessary to the application.
```rails db:seed```

