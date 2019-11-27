import  GraphQLYoga from 'graphql-yoga'
import * as Entities from './db'
import * as Mutation from './resolvers/Mutation'
import * as Query from './resolvers/Query'
import * as User from './resolvers/User'
import * as Link from './resolvers/Link'

const {GraphQLServer} = GraphQLYoga


const resolvers = {
  Query,
  Mutation,
  User,
  Link
}

const server = new GraphQLServer({
  typeDefs: './src/schemas/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      db: Entities,
      test: 'test context variable!'
    }
  }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))