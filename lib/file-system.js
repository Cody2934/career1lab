// fie system functions
const fs = require('fs').promises;

// make a directory and all parent directories
const mkdirp = path => fs.mkdir(path, { recursive:true });

// write an object to a file
const writeJSON = (path, obj) => fs.writeFile(path, JSON.stringify(obj))
    .then(() => obj);

// read an object from a file
const readJSON = path => fs.readFile(path, 'utf-8')
    .then(content => JSON.parse(content));

// real all files in a directory as objects
const readDirectoryJSON = path => fs.readdir(path)
    .then(files => Promise.all(files.map(file => readJSON(`${path}/${file}`))));

// update a files JSON
const updateJSON = (path, obj) => readJSON(path)
    .then(oldObj => ({ ...oldObj, ...obj }))
    .then(newObj => writeJSON(path, newObj));

// delete a file
const deleteFile = async(path) => {
    const json = await readJSON(path);
    await fs.unlink(path);
    return json;
};

// export all functions above
module.exports = {
    mkdirp,
    writeJSON,
    readJSON,
    readDirectoryJSON,
    updateJSON,
    deleteFile
};