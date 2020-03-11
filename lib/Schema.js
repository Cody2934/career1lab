const Property = require('./Validator');

// export the schema 'class'
module.exports = class Schema {
    // build out the schema using the following this. format
    constructor(schema) {
        this.schema = schema;
        this.properties = Object.entries(schema)
            // map through the fill in field and fill the schema
            .map(([field, options]) => new Property(field, options));
    }

    // make sure the things can go into the things and error if not
    Validate(obj) {
        const validated = {};
        const errors = [];
        this.properties
            .forEach(validator => {
                try {
                    validated[validator.field] = validator.validate(obj);
                } catch (e) {
                    errors.push(e);
                }
            });

        if (errors.length > 0) {
            throw new Error(`invalid schema >> ${errors}`);
        }

        return validated;
    }

};
