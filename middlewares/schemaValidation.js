import { Validator } from "jsonschema"


const validator = new Validator()



const schemaValidation = (schema)=> {
    return (req,res,next)=> {

        const validate = validator.validate(req.body, schema)
        const errors= []
    
        if(!validate.valid) {
            
            validate.errors.forEach(e=> {
                errors.push(e.message.replace(/\"/g, '' ))
            })
            return res.json({
                errors
            })
        }
    
        next()
        }
}

export {
    schemaValidation
}