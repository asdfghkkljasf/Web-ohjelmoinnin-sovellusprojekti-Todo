import { pool } from '../helpers/db.js'
import { emptyOrRows } from '../helpers/utils.js'
import { Router } from 'express'

const router = Router()

router.get('/', (req, res, next) => {
    pool.query('select * from task', (error, result) => {
        if (error) {
            return next(error)
        }
        return res.status(200).json(emptyOrRows(result))
    })
})

router.post('/create', (req, res, next) => {
    pool.query('insert into task (description) values ($1) returning *', [req.body.description], (error, result) => {
        if (error) {
            return next(error)
        }
        return res.status(200).json(emptyOrRows(result)[0])
    })
})

router.delete('/delete/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    pool.query('delete from task where id = $1 returning *', [id], (error, result) => {
        if (error) {
            return next(error)
        }
        return res.status(200).json(emptyOrRows(result)[0])
    })
})

export default router
