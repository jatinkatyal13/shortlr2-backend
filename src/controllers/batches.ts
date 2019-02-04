import Raven from 'raven'
import sequelize from 'sequelize'
import { BatchAttributes, Batches, UserAttributes } from '../db/models'

export const getAllBatches = async () => {
  const batches = await Batches.findAll()

  return batches
}

export const createBatch = async (
  batchAtt: BatchAttributes,
  user: UserAttributes,
) => {
  if (['admin', 'employee'].indexOf(user.role) === -1) {
    throw new Error('Not authorised.')
  }
  const batch = await Batches.create({
    code: batchAtt.code,
    name: batchAtt.name,
    whatsapp: batchAtt.whatsapp,
    wakatime: batchAtt.wakatime,
    github: batchAtt.github,
  })
  return batch
}
