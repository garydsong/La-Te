![la-te](https://user-images.githubusercontent.com/105745865/197884351-964fc2f7-9c9a-46bc-8026-1978f7929c97.png)

La-Té is a fullstack web application, inspired by [Ko-fi](https://ko-fi.com). La-Té is the original, fun and friendly way to receive donations and messages of support from fans of what you do! Use it as a tip jar, let fans crowdfund a goal and even get donation alerts while you stream. Unlike other platforms, La-Té doesn't take a fee on each donation. Keep more of your money with La-Té. 

**Live site: [La-Te](http://la-te.herokuapp.com)**

# 🔗 Wiki Links
- [API Documentation](https://github.com/garydsong/La-Te/wiki/API-Documentation)
- [Database Schema](https://github.com/garydsong/La-Te/wiki/Database-Schema)
- [Feature List](https://github.com/garydsong/La-Te/wiki/Feature-List)
- [Redux Store Shape](https://github.com/garydsong/La-Te/wiki/Redux-State)
- [User Stories](https://github.com/garydsong/La-Te/wiki/User-Stories)

# 🖥️ Technologies
### Frameworks, Platforms, Libraries:
[![My Skills](https://skillicons.dev/icons?i=py,flask,js,react)](http://nope-yelp.herokuapp.com)

[![My Skills](https://skillicons.dev/icons?i=redux,postgres,docker,sqlite)](http://nope-yelp.herokuapp.com)

[![My Skills](https://skillicons.dev/icons?i=css,html,heroku)](http://nope-yelp.herokuapp.com)

- Python, Flask, JavaScript, React
- Redux, Postgres, Docker, SQLite
- CSS3, HTML5, Heroku

### Asset Design:
[![My Skills](https://skillicons.dev/icons?i=svg,ps,ai,css)](http://nope-yelp.herokuapp.com)

Assets utilized and/or created by:

- SVG, Adobe Photoshop, Adobe Illustrator, CSS3


# 📃 Pages

## 💦 Splash Page
![Screenshot_176](https://user-images.githubusercontent.com/105745865/199860901-eefc03d0-05d8-4638-b03e-ba53114a8725.png)
### Sign-up triggered on "Claim"

![Screenshot_177](https://user-images.githubusercontent.com/105745865/199860967-ca6535f0-8dca-440d-b4a4-8442afa7bfb3.png)
### Click and drag carousel with user testimonials

![Screenshot_178](https://user-images.githubusercontent.com/105745865/199861042-ad1dc122-f5e6-4b67-935f-40e61540eb10.png)
### FAQ

## 📝 Sign Up/Log In
![Screenshot_179](https://user-images.githubusercontent.com/105745865/199861135-fa09bbd1-0c1a-4570-876b-5241a5648c27.png)
### Sign up validation errors handled in scrollable box at top of the form

![Screenshot_180](https://user-images.githubusercontent.com/105745865/199861208-c424881c-28d6-4736-a30b-319f19e4da14.png)
### Demo user and easy to access sign up on log in page

## ⛹️ User Profile
![Screenshot_181](https://user-images.githubusercontent.com/105745865/199861292-cc5f95a4-0551-4163-bdce-ce541eb81943.png)
### Owner of the page has Write a Post at top of the page

![Screenshot_182](https://user-images.githubusercontent.com/105745865/199861359-c113dbba-977a-4165-b04d-597fefe9690a.png)

![Screenshot_184](https://user-images.githubusercontent.com/105745865/199861447-e4fc1390-37cc-4949-a714-e80a686208b0.png)
### Manage your posts and leave comments on yours or other user's posts

![Screenshot_185](https://user-images.githubusercontent.com/105745865/199861468-6fd4c05f-7650-44b2-9ecb-0fea02f48a42.png)
### Edit your posts with auto filled information

![Screenshot_186](https://user-images.githubusercontent.com/105745865/199861515-79a36dc7-6a42-43dd-9c4f-9d5fcd1df025.png)
### Edit your comment with light blue indicator that now you are editing your comment

## 🔍 Discover Page
![Screenshot_187](https://user-images.githubusercontent.com/105745865/199861563-d7587fe9-8bea-4065-bc98-aa31bd82a33f.png)
### Discover users page with all new users

## ☕ Lattes
![Screenshot_188](https://user-images.githubusercontent.com/105745865/199861587-74c24bb9-f166-4e6f-9350-096d9d863174.png)
### Leave a user a donation (latte) with a message

![Screenshot_189](https://user-images.githubusercontent.com/105745865/199861743-f43099e8-85e5-431b-9bbc-4435f6c8f582.png)
### Confirmation message that your donation has been sent

## 📥 Inbox
![Screenshot_190](https://user-images.githubusercontent.com/105745865/199861812-61e2a2c8-c12c-448a-9072-0025179a7f36.png)
### Check your balance and your messages in your inbox


# ▶️ Get Started

### Clone repository.

- SSH:

```
git@github.com:garydsong/La-Te.git
```

- HTTPS:

```
https://github.com/garydsong/La-Te.git
```

- CLI:
```
gh repo clone garydsong/La-Te
```

### Install dependencies & Prep database.
- In the project directory you will run:

```
pipenv install
```

This command will install packages into the pipenv virtual environment and update your Pipfile.

- Create a .env file in said current directory.
- Paste in SECRET_KEY and DATABASE_URL configurations.

```
SECRET_KEY=<<SECRET_KEY>>
DATABASE_URL=sqlite:///dev.db
```

The .env file contains the individual user environment variables that override the variables set in the /etc/environment file. You can customize your environment variables as desired by modifying your .env file. In this case we are setting the SECRET_KEY and the DATABASE_URL.

- While in your root directory run:

```
pipenv shell
```

This will create a new active pip environment for  you to run your backend.

- Followed by:

```
flask db upgrade
flask seed all
pipenv run flask run
```

Because this application uses SQLite, the upgrade command will detect that a database does not exist and will create it. While now you are creating the database you are also seeding in our 105 businesses, 315 business images, 30 users, and all of their 270 grumbles/nopes.

- Navigate to your /Nope-Yelp/react-app/ folder and create another .env file.
- Paste in the REACT_APP_BASE_URL

```
REACT_APP_BASE_URL=http://localhost:5000
```
We'll be pasting in the path to server for frontend into this newly created environment file.

- All there is to do is:

```
npm install
```
This command installs a package and any packages that it depends on. Since the package has a package-lock the installation of dependencies will be driven by that. If you take a peak into your package.json file you can see all the dependencies our project is installing.

```
npm start
```
This runs a predefined command specified in the "start" property of a package's "scripts" object in our case it is:

```
"start": "react-scripts start"
```
DO NOT paste this anywhere. The code above is already provided in our package.json file!

*And voilà!*


# 📱 Contacts
<img src=https://i.imgur.com/2ffGJqj.png width=20> [LinkedIn](https://www.linkedin.com/in/gary-song-96b071246/)
<img src=https://i.imgur.com/w9xwrCT.png width=20> [GitHub](https://github.com/garydsong)
