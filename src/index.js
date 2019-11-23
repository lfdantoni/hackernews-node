const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      return links.find(link => link.id === args.id);
    }
  },
  Mutation: {
    post: (parent, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink(parent, args) {
      const link = links.find(link => link.id === args.id);
      if(link) {
        link.description = args.description || link.description;
        link.url = args.url || link.url;

        return link;
      }
      return null;
    },
    deleteLink(parent, args) {
      const linkIdx = links.findIndex(link => link.id === args.id);
      if(linkIdx >= 0) {
        const link = links[linkIdx];
        links.splice(linkIdx, 1);

        return link;
      }
      return null;
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schemas/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))