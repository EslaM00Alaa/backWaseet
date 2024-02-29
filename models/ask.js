const joi = require("joi");



function validateAskOrder(obj)
{
    const schema = joi.object({
        name:joi.string().trim().required(),
        phone:joi.string().trim().max(100).required()
    })
    return schema.validate(obj)
}


module.exports=validateAskOrder ;
