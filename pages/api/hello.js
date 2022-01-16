const mongodb = require('mongodb')

const { connectToDatabase } = require('../../middleware/mongodb');
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

        const downstream = bucket.openDownloadStream(ObjectId("61e42d744963ef481690de36"));
        let image
        //downstream.pipe(res)

        
        return res.json({
            message: JSON.parse(JSON.stringify(files)),
            success: true,
            files: image
        });
    } catch (err) {
        return res.json({
            message: new Error(err).message,
            success: false,
        });
    }

    
}