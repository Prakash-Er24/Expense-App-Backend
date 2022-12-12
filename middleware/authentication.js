const jwt  = require('jsonwebtoken')

const authentication = (req,res,next) =>{
    const token = req.headers.authorization
    if(token)
    {
        try{ 
            const tokenData = jwt.verify(token.split(' ')[1],process.env.JWT_KEY)
            req.tokenData = tokenData
            next()
        }
        catch(e)
        {
            res.json({errors:e})
        }
    }
    else
    {
        res.json({notice:'Token is required to access data'})
    }
}

module.exports = authentication