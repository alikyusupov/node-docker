module.exports = (req, res, next) => {
    if(!req.session.user) {
        return res.status(403).json({
            message: "Unauthorized"
        })
    }
    res.user = req.session.user
    next()
}