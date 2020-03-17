// const path = require('path');
const uuid = require('uuid/v4');
const {
    mkdir,
    writeJSON,
    readDirectoryJSON,
    readJSON,
    updateJSON,
    deleteFile
} = require('./file-system');

module.exports = class Model {
    constructor(modelName, schema) {
        this.modelName = modelName;
        this.schema = schema;
        mkdir(this.modelName);
    }

    //done & tested
    create(obj) {
        const _id = uuid();
        const validated = this.schema.validate(obj);
        return writeJSON(`${this.modelName}/${_id}`, { ...validated, _id });
    }

    //done & tested
    findById(id) {
        return readJSON(`${this.modelName}/${id}`);
    }

    //done & tested
    findByIdAndUpdate(id, patchObj) {
        return updateJSON(`${this.modelName}/${id}`, patchObj);
    }

    find() {
        return readDirectoryJSON(`${this.modelName}`);
    }

    //done & tested
    findByIdAndDelete(id) {
        return deleteFile(`${this.modelName}/${id}`);
    }
};
