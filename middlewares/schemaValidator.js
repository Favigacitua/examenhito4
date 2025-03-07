import { Validator } from "jsonschema";

const validator = new Validator();

const schemaValidator = (schema) => {
  return (req, res, next) => {
    const validate = validator.validate(req.body, schema);
    
    if (!validate.valid) {
      const errors = validate.errors.map(e => e.message.replace(/\"/g, ''));
      
      return res.status(400).json({
        error: "Faltan campos obligatorios",
        details: errors
      });
    }
    
    next(); 
  };
};

export { schemaValidator };