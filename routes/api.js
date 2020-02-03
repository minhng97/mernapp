const express = require('express')
const router = express.Router()

const BlogPost = require('../models/BlogPost')

// An api endpoint that returns a msg
router.get('/', (req, res) => {

    BlogPost.find({})
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            console.log('error: ', error)
        })

});

router.post('/save', (req, res) => {
    console.log("Body: ", req.body)
    const data = req.body

    const newBlogPost = new BlogPost(data)

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: "Internal server error" })
            return;
        }
        // BlogPost
        return res.json({
            msg: "We received the data"
        });
    });
});



// Verify the post
router.post('/post', verify, (req, res) => {

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post created...',
                authData
            })
        }
    })
}
);

router.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: 'Minh',
        email: 'minh@gmail.com'
    }

    jwt.sign({ user: user }, 'secretkey', { expiresIn: '1d' }, (err, token) => {
        res.json({
            token: token
        })
    })
}
)


function verify(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        req.token = bearerToken;

        next()
    } else {
        res.json({
            msg: 'You must login first'
        })
    }
}

module.exports = router