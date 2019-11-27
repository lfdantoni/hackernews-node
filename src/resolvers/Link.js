function postedBy(parent, args, context) {
    return context.db.Links.findById(parent.id).postedBy
}

const id = (parent) => parent._id.toString()

export {
    postedBy,
    id
}