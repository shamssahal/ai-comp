const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getRequests(req, res) {
  const page  = parseInt(req.query.page  ?? '1', 10);
  const limit = parseInt(req.query.limit ?? '13', 13);

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    return res
      .status(400)
      .json({ error: '`page` and `limit` must be positive integers' });
  }

  const skip = (page - 1) * limit;

  // fetch total + paginated data
  const [ totalCount, items ] = await Promise.all([
    prisma.apiRequest.count(),
    prisma.apiRequest.findMany({
      skip,
      take: limit,
      orderBy: { timestamp: 'desc' },
      select: {
        requestId:   true,
        timestamp:   true,
        prompt:      true,
        models:      true,
        temperature: true,
        max_tokens:  true
      }
    })
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  res.json({
    page,
    limit,
    totalCount,
    totalPages,
    data: items
  });
}


module.exports = { getRequests };
