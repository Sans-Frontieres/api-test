import { Router } from "express";
import { usersController as controller } from '../controllers'
import { userValidators } from '../middlewares'
import { verifyToken, isAdminOrModerator, isAdmin } from '../middlewares/authorization';

const router = Router()

router.get('/', [verifyToken, isAdminOrModerator], controller.all)
router.get('/:id', [verifyToken, isAdminOrModerator], controller.findByID)

router.put('/addRole', [verifyToken, isAdmin], userValidators.changeRole, controller.addRole)
router.put('/popRole', [verifyToken, isAdmin], userValidators.changeRole, controller.popRole)




export default router