const dataStorageService = require('../services/data-storage-services');

async function create(req, res, next) {
    try {
        const repo = req.params.repo
        const data = req.body
        const result = await dataStorageService.create(repo, data)
        if (result){
            res.status(201)
            res.json(result)
        }
        else {
            res.status(406).end();// may add a msg field
        }
    } catch (err) {
      console.error(`Error while creating new data`, err.message);
      next(err);
    }
  }

async function get(req, res, next) {
    try {
        const repo = req.params.repo
        const id = req.params.id
        const result = await dataStorageService.download(repo, id);
        if (!result){
            res.status(404).end() // may add a msg field
        } else {
            res.status(200)
            res.json(result)
        }
    } catch (err) {
        console.error(`Error while getting stored data`, err.message);
        next(err);
    }
  }
  
  async function remove(req, res, next) {
    try {
        const repo = req.params.repo
        const id = req.params.id
        const result = await dataStorageService.remove(repo, id)
        if (!result){
            res.status(404).end() // may add a msg field
        } else {
            res.status(200).end()
        }
        
    } catch (err) {
      console.error(`Error while deleting data`, err.message);
      next(err);
    }
  }
  
  module.exports = {
    get,
    create,
    remove
  };