function notFound(req, res, next) {
    res.status(404).json({ error: 'route not found' })
}

module.exports = notFound