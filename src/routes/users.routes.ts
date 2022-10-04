import { Router } from "express";
import { usersController as controller } from '../controllers'
import { userValidators } from '../middlewares'

const router = Router()

router.get('/', controller.all)
router.get('/:id', controller.findByID)

router.put('/addRole', userValidators.changeRole, controller.addRole)
router.put('/popRole', userValidators.changeRole, controller.popRole)




export default router