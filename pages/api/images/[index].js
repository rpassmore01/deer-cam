const mongodb = require('mongodb')

const { connectToDatabase } = require('../../../middleware/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': {
            return getPosts(req, res);
        }
    }
}

async function getPosts(req, res) {
    try {
        let { db } = await connectToDatabase();
        let files = await db.collection('fs.files').find({}).toArray();
        let bucket = new mongodb.GridFSBucket(db);
        const { index } = req.query
        const filesJSON = JSON.parse(JSON.stringify(files))
        const currFile = filesJSON[index]
        const currId = currFile._id

        const success = true;

        const downstream = bucket.openDownloadStream(ObjectId(currId));

        return downstream.pipe(res)
        
    } catch (err) {
        return res.json({
            message: new Error(err).message,
            success: false,
        });
    }

    
}