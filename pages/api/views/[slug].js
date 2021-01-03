import db from '../../../lib/database'

export default async (req, res) => {
  // TODO: could filter slugs and decline request?
  if (req.method === 'POST') {
    const ref = db.ref('post-views').child(req.query.slug)
    const { snapshot } = await ref.transaction((currentViews) => {
      if (currentViews === null) {
        return 1
      }

      return currentViews + 1
    })

    return res.status(200).json({
      total: snapshot.val(),
    })
  }

  // TODO: could filter slugs and decline request?
  if (req.method === 'GET') {
    const snapshot = await db
      .ref('post-views')
      .child(req.query.slug)
      .once('value')
    const views = snapshot.val()

    return res.status(200).json({ total: views })
  }
}
