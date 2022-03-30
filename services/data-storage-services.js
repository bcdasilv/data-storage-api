const model = require('../models/storage-in-memory')

async function create(repo, data){
    const result = await model.addData(repo, data);
    return result
}

async function download(repo, id){
    const result = await model.getData(repo, id);
    return result
}

async function remove(repo, id){
    const result = await model.removeData(repo, id);
    return result
}

module.exports = {
  download,
  create,
  remove
}