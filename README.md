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

## License

[MIT](https://github.com/joaopedrodcf/portfolio-node/blob/master/LICENSE)
