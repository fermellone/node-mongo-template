const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

// const MONGO_URI = `mongodb+srv://${ USER }:${ PASSWORD }@${ config.dbHost }:${ config.dbPort }/${ DB_NAME }?retryWrites=true&w=majority`
const MONGO_URI = `mongodb+srv://${ USER }:${ PASSWORD }@${ config.dbHost }/${ DB_NAME }?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        this.dbName = DB_NAME;
    }

    connect() {
        if (!this.connection) {
            this.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) reject(err);
                    
                    console.log('Connected successfully to MongoDB');
                    resolve(this.client.db(this.dbName));
                });
            });
        }

        return this.connection;
    }

    async getAll(collection, query) {
        const db = await this.connect();

        const result = await db.collection(collection).find(query).toArray();

        return result;
    }

    async get(collection, query) {
        const db = await this.connect();

        const { _id } = query;

        const params = _id ? { ...query, _id: ObjectId(_id) } : query;

        const result = await db.collection(collection).findOne(params);
        
        return result;
    }

    async create(collection, data) {
        const db = await this.connect();
            
        const result = await db.collection(collection).insertOne(data);

        return result.insertedId;
    }
    
    async update(collection, id, data, upsert = false) {
        const db = await this.connect();
            
        const result = await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert });

        return result.upsertedId || id;
    }
    
    async delete(collection, id) {
        const db = await this.connect();

        await db.collection(collection).deleteOne({ _id: ObjectId(id) });

        return id;
    }
}

module.exports = MongoLib;