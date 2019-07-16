# Portfolio node

Node js with typescript Graphql API for the project portfolio

## Local environment

First install the database and the administrator

```sh
choco install mysql
```

```sh
choco install mysql.workbench
```

Open workbench and execute the following command there

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';
```

After click on create new schema option and write `portfolio`

After that you can start the project

```js
yarn start
```

## Graphql Queries and Mutations

Mutation to create a project

```js
mutation {
  createProject(
    description: "PWA for the Yo-kai Watch games, it contains all yo-kais for Yo-kai Watch, their locations, stats, favoritefoods, skills and evolutions. With a really good user base of 4k this year!",
    title: "Yokaidex",
    image:"https://res.cloudinary.com/dcrcweea8/image/upload/v1562620408/portfolio/yokaidex.png"
  ) {
    id
    description
    title
    image
  }
}
```

Query to get all the projects

```js
query {
  projects {
    id
    title
    description
    image
  }
}
```

Query to send an email

```js
query {
  contact(message: "test", email: "test", name: "test")
}
```

Mutation to create the experience

```js
mutation{
  createExperience(
    image: "https://res.cloudinary.com/dcrcweea8/image/upload/v1563018808/portfolio/farfetch.png",
    company: "Farfetch",
    title: "Frontend Developer",
    description: "Developing the wishlist and out-of-stock of the website",
    startDate: "Sat Jul 13 2019 13:02:52 GMT+0100 (Western European Summer Time)",
    endDate: "Sat Jul 13 2019 13:02:52 GMT+0100 (Western European Summer Time)"
  ){
    id
  }
}
```

Mutation to create the skill

```js
mutation {
  createSkill (
    name: "test"
  ){
    id
  }
}
```

Mutation to add a skill to the experience

```js
mutation{
  addSkill(skillId: 3, experienceId: 1)
  {
    id,
    skills {
        id
    }
  }
}
```

## License

[MIT](https://github.com/joaopedrodcf/portfolio-node/blob/master/LICENSE)
