import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { APP_SECRET, getUserId } from '../utils'

async function signup(parent, args, context, info) {

    const password = await bcrypt.hash(args.password, 10)

    const user = await new context.db.Users({...args, password, links: []}).save()

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {

    const user = await context.db.Users.findOne({email: args.email})
    if (!user) {
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

const post = async (parent, args, context) => {
    
    const userId = getUserId(context)
    const user = await context.db.Users.findById(userId)
    const link = await context.db.Links.create({
      description: args.description,
      url: args.url,
      postedBy: user._id,
    })

    user.links.push(link)
    await user.save()

    return link
}
const updateLink = async(parent, args, context) => {
    const link = await context.db.Links.findById(args.id);

    if(link) {
      link.url = args.url || link.url
      link.description = args.description || link.description
      await link.save()
      return link
    }

    return null;
}

const deleteLink = async (parent, args, context) => {
    const userId = getUserId(context)
    const user = await context.db.Users.findById(userId)
    const index = user.links.findIndex(l => l.toString() === args.id)
    user.links.splice(index, 1)

    await user.save()
    return await context.db.Links.findByIdAndRemove(args.id);
}

  
export {
    signup,
    login,
    post,
    updateLink,
    deleteLink
}