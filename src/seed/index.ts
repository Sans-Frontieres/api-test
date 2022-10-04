import Roles from '../enum'
import { User } from '../models'

const insertUsers = async () => {
    if (await User.estimatedDocumentCount() > 0) return

    const adminUser = await User.signUp({ username: 'Admin', email: 'admin@mail.com', password: 'admin123' })

    await User.addRole(adminUser.id, Roles.ADMIN)

    const moderatorUser = await User.signUp({ username: 'Moderator', email: 'moderator@mail.com', password: 'moderator123' })

    await User.addRole(moderatorUser.id, Roles.MODERATOR)
}

export default insertUsers