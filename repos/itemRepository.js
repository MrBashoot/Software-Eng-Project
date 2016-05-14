/**
 * Created by Ahmed on 5/13/2016.
 */
"use strict";
class itemRepository {

    constructor() {
        this.fs = require('fs');
    }

    getAllItems(){
        return new Promise ((resolve,reject) =>{
            this.readJsonFile('./data/Item.json').then(Items => {
                resolve(Items);
            }).catch(err => {
                reject(err);
            });
        });
    }

    getItem(itemId){
        return new Promise ((resolve, reject) =>{
            this.getAllItems().then(items =>{
                let item =items.filter(i =>  i.itemId == itemId);
                if (item.length>0){
                    resolve(item[0]);
                }
                else {
                    reject('Item not found');
                }
            })
        });
    }

    readJsonFile(filePath) {
        return new Promise((resolve, reject) => {
            this.fs.readFile(filePath, (error, data) => {
                if (error) {
                    reject("Reading file failed: " + error);
                }
                else {
                    let json = JSON.parse(data);
                    resolve(json);
                }
            });
        });
    }

    addItemTest(items) { //Incomplete
        return new Promise((resolve, reject) => {
            for(item of items)
            return this.writeJsonFile('../data/itemTest.json', item)
            resolve(items);
        });
    }

    getItemTest(){
        return new Promise ((resolve,reject) =>{
            this.readJsonFile('../data/itemTest.json').then(Items => {
                resolve(Items);
            }).catch(err => {
                reject(err);
            });
        });
    }


    writeJsonFile(filePath, data) {
        return new Promise((resolve, reject) => {
            this.fs.writeFile(filePath, JSON.stringify(data), error => {
                if (error) {
                    reject("Write to file failed: " + error);
                }
                else {
                    resolve();
                }
            });
        });
    }

}

module.exports = new itemRepository();