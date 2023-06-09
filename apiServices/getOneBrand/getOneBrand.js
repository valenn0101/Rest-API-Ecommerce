const { PrismaClient } = require('@prisma/client')
const logger = require('../../config/logger')
const prisma = new PrismaClient()

const getOneBrand = async (req, res) => {
  const { brandID } = req.params

  try {
    const brand = await prisma.brands.findUnique({
      where: {
        id: parseInt(brandID),
      },
    })
    
    if (!brand) {
      logger.error('Brand not found')
      return res.status(404).json({ error: 'Brand not found' })
    }

    return res.status(200).json(brand)
  } catch (error) {
    logger.error('Error retrieving brand:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = getOneBrand
