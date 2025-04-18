const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getTimeSeries(req, res) {
  try {
    const defaultFrom = new Date('2025-01-01T00:00:00Z');
    const now         = new Date();

    const from = req.query.from ? new Date(req.query.from) : defaultFrom;
    const to   = req.query.to   ? new Date(req.query.to)   : now;

    const records = await prisma.apiRequest.findMany({
      where: {
        timestamp: { gte: from, lte: to }
      },
      select: {
        timestamp: true,
        results:   true
      },
      orderBy: {
        timestamp: 'asc'
      }
    });

    const series = records.map(r => {
      const entry = { time: r.timestamp };
      (r.results || []).forEach(m => {
        entry[`${m.model}_cost`]    = m.total_cost    || 0;
        entry[`${m.model}_latency`] = m.duration_ms   || 0;
      });

      return entry;
    });

    res.json({ data: series });
  } catch (err) {
    console.error('Error fetching time series:', err);
    res.status(500).json({ error: 'Unable to fetch analytics time series' });
  }
}

module.exports = { getTimeSeries };
