import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { DatabaseConnectionError } from '../errors/database-connection-error'
import { RequestValidationError } from '../errors/request-validation-error'
const router = express.Router()

router.post(
    '/api/users/signup',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().isLength({ min: 4, max: 20 })
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req)
        const { email, password } = req.body
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array())
        }
        console.log('Creating a user...')
        throw new DatabaseConnectionError()

        res.send({})
    }
)

export { router as singupRouter }