const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');

require('dotenv').config();
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//init 

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//Models    
const { User } = require('./models/User');
const { Brand } = require('./models/brands');
const { Wood } = require('./models/woods');
const { Product } = require('./models/product');


//Middleware    
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//===========================
//           PRODUCTS
//===========================


app.post('/api/product/shop', (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);


    let findArgs = {}

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    console.log(findArgs);
    Product
        .find(findArgs)
        .populate('brand')
        .populate('wood')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, articles) => {
            if (err) res.status(400).send(err);
            res.status(200).json({
                size: articles.length,
                articles
            })
        })


})

//
// By arrival

app.get('/api/product/article', (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limits = req.query.limit ? parseInt(req.query.limit) : 100;

    Product.find().populate('brand').
        populate('wood').
        sort([[sortBy, order]]).
        limit(limits)
        .exec((err, article) => {
            if (err) res.status(400).send(err);
            res.send(article);

        })
})


app.get('/api/product/article_by_id', (req, res) => {

    let type = req.query.type;
    let item = req.query.id;
    items = [];
    if (type === 'array') {
        let ids = req.query.id.split(',');

        items = ids.map(item => {
            return mongoose.Types.ObjectId(item);
        })
    }

    Product.
        find({ '_id': { $in: items } }).
        exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).send(doc);
        })

})


app.post('/api/product/article', auth, admin, (req, res) => {
    const product = new Product(req.body);
    product.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})



//===========================
//           WOODS
//===========================

app.post('/api/product/wood', auth, admin, (req, res) => {

    const wood = new Wood(req.body);
    Wood.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({
            success: true,
            wood: doc
        })
    })

})

app.get('/api/product/woods', (req, res) => {
    Wood.find({}, (err, woods) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(woods);
    })
})

//===========================
//           BRANDS
//===========================

app.post('/api/product/brand', auth, admin, (req, res) => {
    const brand = new Brand(req.body);
    brand.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, brand: doc })
    });
})


app.get('/api/product/get_brands', (req, res) => {
    Brand.find({}, (err, brands) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(brands);
    })
})


//===========================
//           USERS
//===========================

// register
app.post('/api/user/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,

        })
    })
});


// logout

app.get('/api/user/logout', auth, (req, res) => {

    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        })
    })

})

// auth
app.get('/api/user/auth', auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    })
})


// login
app.post('/api/user/login', function (req, res) {
    // find email 

    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) return res.json({ loginSuccess: false, message: "Auth failed, emial not found" });
        user.comparePassword(req.body.password, (err, match) => {
            if (!match) return res.json({ loginSuccess: false, message: 'Wrong Password' })
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true
                })
            })
        })
    })

    //check password

    // generate token 


})


app.post('/api/user/uploadImage', auth, admin, formidable(), (req, res) => {

    cloudinary.uploader.upload(req.files.file.path, (result) => {
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    }, {
            public_id: `${Date.now()}`,
            resource_type: 'auto'
        })
})

app.get('/api/user/remove/removeImage', auth, admin, (req, res) => {
    let image_id = req.query.public_id;
    cloudinary.uploader.destroy(image_id, (err) => {
        if (err) return res.json({ success: false, err })
        res.send(200).send('ok')
    })
})



app.post('/api/user/addToCart', auth, (req, res) => {

    console.log(req.user);
    

    User.findOne({ _id: req.user._id }, (err, doc) => {
        let duplicate = false;
        doc.cart.forEach((item) => {
            if (item.id == req.query.productId) {
                duplicate = true
            }
        })

        if (duplicate) {
            User.findOneAndUpdate({_id:req.user._id,"cart.id":mongoose.Types.ObjectId(req.query.productId)}
            ,{$inc: {"cart.$.quantity":1}},
            {new:true},
            ()=>{
                if (err) return res.json({ success: false, err })
                return res.status(200).json(doc.cart)
           
            }
            )
        } else {
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: mongoose.Types.ObjectId(req.query.productId),
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, doc) => {
                    if (err) return res.json({ success: false, err })
                    return res.status(200).json(doc.cart)
                }
            )
        }

    })
})

app.get('/api/user/removeFromCart',auth,(req,res) =>{
    User.findOneAndUpdate(
        {_id: req.user._id},
        {"$pull": 
                {"cart": {"id":mongoose.Types.ObjectId(req.query._id)}}
        },
        {new:true},
        (err,doc)=>{
            let cart = doc.cart;
            let array = cart.map(item =>{
                return mongoose.Types.ObjectId(item.id)
            });

            Product.find({'_id':{$in:array}}).
                populate('brand').
                populate('wood').
                exec((err, cartDetail) => {
                    return res.status(200).json({
                        cartDetail,cart
                    })
                })
        }
    )
})


const port = process.env.PORT || 3002;


app.listen(port, () => {
    console.log('server running on', port);

})