function feed(parent, args, context, info) {
    return context.db.Links.find();
}

const info = () => `This is the API of a Hackernews Clone`

export {
    feed,
    info
}