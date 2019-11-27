async function links(parent, args, context) {

    const user = await context.db.Users
        .findById(parent.id)
        .populate({
            path: 'links',
            model: context.db.Links
        });
    return user.links
}
  
export {
    links,
}