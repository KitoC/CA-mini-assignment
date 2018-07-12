


const isAdmin = (req, res, next) => {
    if (req.user.role && req.user.role === 'admin') {
        next()
    } else {
        res.sendStatus(403)
    }
}

const isTeacher = (req, res, next) => {
    if (req.user.role && req.user.role === 'teacher') {
        next()
    } else {
        res.sendStatus(403)
    }
}


const canCreate = (req, res, next) => {
    if (req.user.role && (req.user.role === 'student' || 'teacher' || 'admin')) {
        next()
    } else {
        res.sendStatus(403)
    }
}

const canUpdate = (req, res, next) => {
    const { user, body } = req

    if (user._id == body.userId) {
        next()
    } else if (user.role === 'admin') {
        next()
    } else {
        res.sendStatus(403)
    }
}


const canDestroy = (req, res, next) => {
    const {user, body} = req

    if(user._id == body.userId){
        next()
    } else if ((user.role === 'teacher') || (user.role === 'admin')) {
        next()
    } else {
        res.sendStatus(403)
    }
}

const canDestroyTopic = (req, res, next) => {
    const { user, body } = req
    // console.log(user._id, body)
    if (user._id == body.id) {
        next()
    } else if (user.role === 'admin') {
        next()
    } else if (user.role === 'teacher') {
        if (user._id == body.userId) {
            next()
        }
    } else {
        res.sendStatus(403)
    }
}

module.exports = {
    isAdmin,
    isTeacher, 
    canDestroy,
    canUpdate,
    canDestroyTopic
}