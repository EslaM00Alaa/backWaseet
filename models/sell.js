const joi = require("joi");



function validateSellOrder(obj)
{
    const schema = joi.object({
        name:joi.string().trim().required(),
        phone:joi.string().trim().max(100).required(),
        house_details:joi.string().trim().required(),
        address_details:joi.string().trim().required(),
        expected_price:joi.number(),
    })
    return schema.validate(obj)
}


module.exports=validateSellOrder ;
