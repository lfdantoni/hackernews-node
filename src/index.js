import  GraphQLYoga from 'graphql-yoga'
import {Links} from './db'

const {GraphQLServer} = GraphQLYoga

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async() => await Links.find(),
    link: async (parent, args) => {
      return await Links.findById(args.id);
    }
  },
  Link: {
    id: (parent) => parent._id.toString()
  },
  Mutation: {
    post: async (parent, args) => {
       const link = new Links({
        description: args.description,
        url: args.url,
      })
      await link.save()
      return link
    },
    updateLink: async(parent, args) => {
      const link = await Links.findById(args.id);

      if(link) {
        link.url = args.url || link.url
        link.description = args.description || link.description
        await link.save()
        return link
      }

      return null;
    },
    deleteLink: async (parent, args) => {
      return await Links.findByIdAndRemove(args.id);
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schemas/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))