# work with prisma

**install prisma**

> npm i prisma

**install prisma client**

> npm i @prism/client

## create prisma app

create new folder

> mkdir prisma-app

next, initialize a node.js project and add the prisma CLI as development dependency ti it:

> npm inti -y
> npm install prisma --save-dev

this creates a package.json with an initial setup fro a node.js app you can now invoke the CLI by prefixing it with npx

> npx prisma

next, set up your prisma project by creating your **Prisma schema** file with the following command

> npx prisma init

this command created a new directory called **prisma** which contains a file called **schema.prisma** and a.env file in the root of the project **schema.prisma** contains the prisma schema with your database connection and the prisma Client generator, .env is a dotenv file for defining environment variables (used for your databse connection)

### Connect your database

To connent your database,you need to set the **url** filed of the **datasource** block in your Prisma Prisma schema to your database **connection url**

```prisma
datasource db{
    provider='postgresql'
    url = env(DATABASE_URL)
}

```

**NODE**

> note that the default schema created by prisma init uses PostgreSQL, so your first need to switch the provider to mysql

```prisma
datasource db{
    provider='mysql'
    url = env(DATABASE_URL)
}

```

in this case url is _set via an environment variable_ which is defined in **.env**

```env
DATABASE_URL='mysql://root:@localhost:3306/prisma'
```

You now need to adjust the connection Url to point to your own database.
The format of the connnection Url for your database typically depends on the database you use ,For MYSQL it looks as follows (the parts spelled all-uppercased are placeholder fro your specifc details)

### create some table

```prisma
model Post{
  id Int @default(autoincrement())@id
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title String @db.VarChar(255)
  conent String?
  published Boolean @default(false)
  author User @relation(fields:[authorId],references:[id])
}

model Profile{
  id Int @default(autoincrement()) @id
  bio String?
  user User @relation(fields:[userId],references:[id])
  userId Int @unique
}

model Task{
  id Int @default(autoincrement())@id
  task_name String @db.VarChar(255) @unique
  task_description String @db.varChar(500)
  task_ststus Boolean @default(false)

}

model User{
  id @default(autoincrement())@id
  email String @unique
  name String?
  posts Post[]
  profile Profile?
}

```

To map your data model to the database schema, you need to use the prisma **migrate**
Cli commands

> npx prisma migrate dev --name init

This command does tow things

1. it creates a new SQL migration file for this mifration
2. it run the SQL mifration file against the database

**Note**

> generate is called under the hood by default, after running prisma migrate dev, if the prisma-client-js generator is defined in your schema, this will check if @prisma/client is installed and install it if its missing

### Introspection

Introspection use to create table without schema

**Force Overwrite**
To overwrite manual chaanges, generate a schema based solely on the introspected database and ignore any existing schema file, add the --force flig to the intrspect command

> npx prisma introspect --force

Use cases include

- you want to start from scratch with a schema generated from the underlying database
- you have an invalid schema and must use --force to make introspection work

### introspection workflow

that typical workflow for projects that are not using Prisma Migrate,but instead use plain SQL or another migration tool looks as follow

## Prisma Client

#### install and generate Prisma Client

To get started with prisma Client, you need to install the @prisma/client pakcage

> npm i @prisma/client

Notice that the install command automatically invokes prisma generate for your witch reads your prisma schema and generate a version pg prisma client that is tailored to your models

> wherever you make changes to your prisma schema in the future, you manually need to invoke prisma generate in order to accomodate the changes in your prisma client Api

### create Express app

> npm i express
> create index.js file and write it the code

```js
const express = require("express");
const { PrismaClient } = require("@prisma/client");
// init express
const app = express();

// init prisma client
const prisma = new PrismaClient();
app.use(express.json());

// setup route
// home page
app.use("/users", require("./routes/user"));
app.use("/", (req, res) => res.send("<h1>home page</h1>"));

// create get all user route
// app.get("/", async (req, res) => {
//   const users = await prisma.user.findMany();
//   return res.status(200).json({ users });
// });

// get single user
// app.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   const user = await prisma.user.findUnique({ where: { id: Number(id) } });
//   res.json(user);
// });
// create post route
// app.post("/", async (req, res) => {
//   const { username, password } = req.body;
//   const user = await prisma.user.create({
//     data: { username, password },
//   });
//   res.status(201).json({ message: "user added successfully", data: user });
// });
// create update route
// app.put("/:id", async (req, res) => {
//   const { username } = req.body;
//   const updateUser = await prisma.user.update({
//     where: {
//       id: Number(req.params.id),
//     },
//     data: {
//       username: username,
//     },
//   });
//   res.json(updateUser);
// });
// create delete route
// app.delete("/:id", async (req, res) => {
//   const id = req.params.id;
//   const delUser = await prisma.user.delete({
//     where: { id: Number(id) },
//   });
//   return res.json(delUser);
// });

app.listen(3000, () => console.log(`server running in port 3000`));
```

### Works with client connections

# list of query

### add new data to the database

```js 
// create record
const task = Prisma.task.create({ data: { name: "task one" } });

// update or create record
const upsertTask = await prisma.task.upsert({
  where: { id: 1 },
  update: { name: "update" },
  create: { name: "create new task" },
});
```

### get all data from the database

```js
const tasks = Prisma.task.findMany();

// or
const tasks = Prisma.task.findMany({
  select: {
    name: true,
  },
  where: { isComplete: true },
});
```

### get single record from the database

```js
const task = Prisma.task.findUnique({ where: { id: 1 } });
```

### update record from the database

```js
const task = Prisma.task.update({
  where: { id: 1 },
  data: { name: "update name" },
});
```

### delete record from the database

```js
const task = Prisma.task.delete({ where: { id: 1 } });
```

- first import PrismaClient from package
- create new record

```js
const { PrismaClient } = require("@prisma/client");

// init prisma
const Prisma = new PrismaClient();
const { task } = Prisma;
// @route GET ALL ALLTasks
//@ DESC GET ALL ALLTasks
//@ ACCESS public
const ALLTasks = async (req, res, next) => {
  try {
    const tasks = await task.findMany();

    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server errors" });
  }
};
```
