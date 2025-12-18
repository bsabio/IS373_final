/**
 * GET /api/styles
 * Returns list of designStyle documents
 */

const sanityPkg = require('@sanity/client')
const createClient = sanityPkg.createClient || sanityPkg

module.exports = async function (req, res) {
  try {
    if (req.method !== 'GET') {
      res.statusCode = 405
      res.setHeader('Allow', 'GET')
      return res.end(JSON.stringify({ error: 'Method Not Allowed' }))
    }

    const projectId = process.env.SANITY_PROJECT_ID
    const dataset = process.env.SANITY_DATASET || 'production'

    if (!projectId) {
      res.statusCode = 500
      return res.end(JSON.stringify({ error: 'SANITY_PROJECT_ID not configured' }))
    }

    const client = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true
    })

    const groq = `*[_type=="designStyle"]{_id, title, "slug": slug.current, description}`
    const items = await client.fetch(groq)

    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify({ styles: items }))
  } catch (err) {
    console.error('Error in /api/styles:', err)
    res.statusCode = 500
    return res.end(JSON.stringify({ error: 'Failed to fetch styles' }))
  }
}
