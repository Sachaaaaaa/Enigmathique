
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    console.log("lllllllllllllllllllllllllllllllllllllllllllllllllllllllllll")
    const token = req.headers['authorization']
    console.log(token)
  
    if (token == null) return res.sendStatus(401)
  
    console.log(jwt.verify(token, process.env.TOKEN_SECRET))
    console.log("ll")
    
}



// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoic2FjaGFAZ21haWwuY29tIiwiaWF0IjoxNzA0NzMwMzkyLCJleHAiOjE3MDQ3MzIxOTJ9.pia3xPOK8-j_utjckC3GyeT_48gG2LlRGFueQ_NARas"