const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getRequestById(req, res) {
    const { id } = req.params;
  
    const record = await prisma.apiRequest.findUnique({
      where: { requestId: id },
      include: { results: true }
    });
  
    if (!record) {
      return res
        .status(404)
        .json({ error: `No request found with id "${id}"` });
    }
  
    res.json(record);
  }

module.exports = { getRequestById };
