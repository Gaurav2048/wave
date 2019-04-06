const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose =    require('mongoose');

require('dotenv').config();
mongoose.Promise = global.Promise; 

mongoose.connect(process.env.DATABASE)

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//Models    
const {User} =  require('./models/User');
const {Brand} = require('./models/brands'); 
const {Wood} = require('./models/woods'); 
const {Product} = require('./models/product'); 


//Middleware    
const {auth} = require('./middleware/auth'); 
const {admin} = require('./middleware/admin'); 

//===========================
//           PRODUCTS
//===========================


app.post('/api/product/shop', (req, res)=> {
        let order = req.body.order ? req.body.order : 'desc';
        let sortBy = req.body.sortBy ? req.body.sortBy : '_id'; 
        let limit =  req.body.limit ? parseInt(req.body.limit) :100; 
        let skip =   parseInt(req.body.skip) ;
      
        
        let findArgs = {}

        for (let key in req.body.filters)
        {
            if(req.body.filters[key].length>0){
                    if(key === 'price'){
                        findArgs[key] ={
                            $gte : req.body.filters[key][0],
                            $lte: req.body.filters[key][1]
                        }
                    }else {
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
            .exec((err, articles)=>{
                        if(err) res.status(400).send(err);
                        res.status(200).json({
                            size: articles.length,
                            articles  
                        })
        })

         
})

// By arrival

app.get('/api/product/article',(req,res)=>{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy: '_id';
    let limits = req.query.limit ? parseInt(req.query.limit) : 100; 
    
    Product.find().populate('brand').
        populate('wood').
        sort([[sortBy,order]]).
        limit(limits)
        .exec((err, article)=> {
            if(err) res.status(400).send(err);
            res.send(article);
            
        })
})


app.get('/api/product/article_by_id', (req, res)=>{

    let type = req.query.type; 
    let item = req.query.id; 
    items =[]; 
    if(type === 'array'){
        let ids = req.query.id.split(',');
        
        items = ids.map(item =>{
            return mongoose.Types.ObjectId(item);
        })
    }

    Product. 
    find({'_id': {$in: items}}).
    exec((err, doc)=>{
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).send(doc); 
    })

})


app.post('/api/product/article', auth, admin, (req,res)=>{
        const product = new Product(req.body);
        product.save((err, doc)=>{
            if(err) return res.json({success: false, err}); 
            res.status(200).json({
                success: true, 
                article: doc
            })
        })
})



//===========================
//           WOODS
//===========================

app.post('/api/product/wood',auth,admin, (req,res)=>{

    const wood = new Wood(req.body); 
    Wood.save((err, doc) =>{
        if(err) return res.json({success: false, err})
        res.status(200).json({
            success: true,
            wood:doc
        })
    })

})

app.get('/api/product/woods',(req,res)=>{
    Wood.find({}, (err, woods)=>{
        if(err) return res.status(400).send(err); 
        res.status(200).send(woods);
    })
})

//===========================
//           BRANDS
//===========================

app.post('/api/products/brand', auth,admin,(req,res)=>{
        const brand = new Brand(req.body);
        brand.save((err, doc)=>{
            if(err) return res.json({success: false,err});
            res.status(200).json({success: true, brand:doc})
        }); 
})


app.get('/api/product/get_brands', (req,res)=>{
    Brand.find({},(err,brands)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(brands);
    })
})


//===========================
//           USERS
//===========================

// register
app.post('/api/user/register', (req, res)=> {
    const user = new User(req.body);
    user.save((err, doc) => {
        if(err) return res.json({success: false, err}); 
        res.status(200).json({success:true,
            
        })
    })
});


// logout

app.get('/api/user/logout',auth,(req, res)=>{

    User.findOneAndUpdate({_id:req.user._id},{token:''}, (err, doc)=>{
            if(err) return res.json({success:false, err});
            return res.status(200).send({
                success:true
            })
    })

})

// auth
app.get('/api/user/auth',auth,(req,res)=>{
        res.status(200).json({
                isAdmin: req.user.role === 0 ? false : true,
                isAuth : true,
                email:req.user.email,
                name: req.user.name,
                lastname: req.user.lastname,
                role: req.user.role,
                cart:req.user.cart,
                history: req.user.history
        })
})
 

// login
app.post('/api/user/login', function(req, res){
    // find email 

    User.findOne({'email': req.body.email}, (err, user)=>{
            if(!user) return res.json({loginSuccess: false, message: "Auth failed, emial not found"});
            user.comparePassword(req.body.password, (err, match)=>{
                if(!match) return res.json({loginSuccess: false, message: 'Wrong Password'})
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie('w_auth', user.token).status(200).json({
                        loginSuccess:true
                    })
                })
            })
    })

    //check password

    // generate token 


})

const port = process.env.PORT||3002;


app.listen(port, ()=>{
    console.log('server running on', port);
    
})