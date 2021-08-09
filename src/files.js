const fs = require('fs');

const directoryExists = (filePath) => {
    let exists = false;

    try {
        exists = fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory();
    } catch (error) {
        return false;
    }

    return exists;
};

const isDirectoryWritable = (filePath) => {
    try {
        fs.accessSync(filePath, fs.constants.W_OK);
    } catch (err) {
        return false;
    }

    return true;
}

const fileExists = (filePath) => {
    return fs.existsSync(filePath) && !directoryExists(filePath);
};

const readFile = (filePath) => {
    return fs.readFileSync(filePath, 'utf8');
};

module.exports = {
    directoryExists: directoryExists,
    isDirectoryWritable: isDirectoryWritable,
    fileExists: fileExists,
    readFile: readFile
};