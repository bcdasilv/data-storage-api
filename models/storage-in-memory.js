
const { v4: uuidv4 } = require('uuid')
const { Blob } = require('buffer')

const storage = new Map();

async function addData(repoId, data){
    let objects = storage.get(repoId);
    if (!objects){
        //repo does not exist so by default we create one
        objects = new Array()
    }
    const found = objects.find( (obj) => areTheSame(obj, data))
    if (found){
        return false //duplicate not allowed in repo
    }
    data.oid = uuidv4()
    objects.push(data)
    storage.set(repoId, objects)
    return {
        oid: data.oid,
        size: new Blob([data]).size
    }
}

async function getData(repoId, id){
    const objects = storage.get(repoId)
    if (objects){
        let obj = objects.find( (obj) => obj.oid === id )
        if (obj) {
            delete obj.oid;
            return obj
        }
        return null;
    }
    else 
        return null;
}

async function removeData(repoId, id){
    const objects = storage.get(repoId)
    if (objects) {
        const objToDel = objects.find( (obj) => obj.oid === id )
        const indexToDel = objToDel ? objects.indexOf(objToDel) : -1
        if (indexToDel >= 0) {
            return objects.splice(indexToDel, 1).length
        }
    }

    return false
}

/* Utilities --- Could move this to a "util" folder */

function areTheSame(objA, objB){
    const keys1 = Object.keys(objA);
    const keys2 = Object.keys(objB);
    for (const key of keys1) {
      if (key !== "oid"){
        const val1 = objA[key];
        if (keys2.includes(key)) {
            const val2 = objB[key];
            const areObjects = isObject(val1) && isObject(val2);
            if (
              areObjects && !areTheSame(val1, val2) ||
              !areObjects && val1 !== val2
            ) {
              return false;
            }
        } else {
            return false;
        }
      }
    }
    return true;
}

function isObject(object) {
    return object != null && typeof object === 'object';
}

module.exports = {
    addData,
    removeData,
    getData
}