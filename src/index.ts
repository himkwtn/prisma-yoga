import { GraphQLServer } from "graphql-yoga";
import { Prisma } from "prisma-binding";
const resolvers = {
  Query: {
    hello: (_, { name }) => {
      const returnValue = `Hello ${name || "World!"}`;
      return returnValue;
    },
    courses: (root, args, context, info) => {
      return context.db.query.courses({}, info);
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: "http://localhost:4466",
      debug: true
    })
  })
});

server.start(() => console.log("Server is running on http://localhost:4000"));
