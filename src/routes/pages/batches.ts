import { ensureLoggedIn } from 'connect-ensure-login'
import { Router } from 'express'
import Raven from 'raven'
import { createBatch, getAllBatches } from '../../controllers/batches'

export const route = Router()

// The entire URLs area is for logged in people only
route.use(ensureLoggedIn('/login'))

route.get('/', async (req, res) => {
  const batches = await getAllBatches()
  res.render('pages/batches/index', { batches })
})

route.get('/new', async (req, res) => {
  res.render('pages/batches/new')
})

route.post('/', async (req, res) => {
  try {
    const batch = await createBatch(
      {
        code: req.body.code,
        name: req.body.name,
        whatsapp: req.body.whatsapp || null,
        github: req.body.github || null,
        wakatime: req.body.wakatime || null,
      },
      req.user,
    )
    res.redirect(`/batches/${batch.code}`)
  } catch (e) {
    Raven.captureException(e)
    req.flash('error', e.message)
    res.redirect('/batches/new')
  }
})
