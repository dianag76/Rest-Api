'use strict'

const express = require('express');
const { authenticateUser } = require('./middleware/auth-user');
//construct a router instance 
const router = express.Router();
const User = require('./models').User;

//handler function to wrap each route 
function asyncHandler(cb){
    return async (req,res,next) => {
        try{
            await cb(req,res,next);
        } catch (error){
            res.status(500).send(error);
        }
    }
}

//first two are get and post: 
//Route that returns a list of users 
router.get('/users', authenticateUser, asyncHandler(async (req,res) => {
    const user = req.currentUser;
    // let users = await User.findAll();
    res.json({
        name: user.name,
        username: user.username
    });
        res.status(200);
    }
)); 

//Routes that creates a new user
router.post('/users', asyncHandler(async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).json({"message": "Account successfully created!"});
    } catch (error) {
        console.log ('ERROR: ', error.name);

      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
      //check above
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
        throw error;
    }
  }
}));




// /api/courses GET
router.get('api/courses',asyncHandler(async(req, res, next) =>{
    const courses = await Course.findAll({
        include: [
            {
                model: User,
            },
        ],
    });
    res.status(200);
}));

// /api/courses/:id GET
router.get('api/courses/:id', asyncHandler(async(req,res,next) => {
    const course = await Course.findByPk(req.params.id, {
        include: [
            {
            model: User, 
            },
        ],
    });
    res.status(200);
}));

// /api/courses POST
router.post('api/courses', asyncHandler(async(req, res, next) =>{
    try {
        const course = await Course.create();
        res.status(201);
    } catch (err) {
        console.log('ERROR:', err.name);
        if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraint'){
            const errors = await error.errors.map(err => err.message);
            res.status(400).json({errors})
        } else {
            throw err;
        }
    }
}));

// /api/courses/:id PUT
router.put('api/courses/:id', asyncHandler(async(req,res,next) =>{
    try{
        const course = await Course.update(req.params.id);
        res.status(201);
    } catch (err) {
        console.log('ERROR:', err.name);
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraint') {
            const errors = await error.errors.map(err => err.message);
            res.status(400).json({ errors })
        } else {
            throw err;
        }
    }
}));

// /api/coureses/:id DELETE

router.delete('api/courses/:id', asyncHandler (async(req, res, next) => {
    try {
        const course = await Course.findByPk(req.params.id);
        await course.destroy()
        res.status(204).end();
    } catch (err) {
        res.status(500).json ({ message: err.message })
        }
}));

module.exports = router;