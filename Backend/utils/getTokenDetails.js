const jwt=require('jsonwebtoken')
const getTokenDetails=(token)=>{
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return {id:decode.id,email:decode.email};
  } catch (error) {
    throw new Error("Invalid token");
  }
}
module.exports.getTokenDetails = getTokenDetails;