const mongodb = require('mongodb')

const { connectToDatabase } = require('../../../middleware/mongodb');
const ObjectId = require('mongodb').ObjectId;

//Handles different incoming functions
export default async function handler(req, res) {
    switch (req.method) {
        case 'GET': {
            return getPosts(req, res);
        }
    }
}

async function getPosts(req, res) {
    try {
        //connects to database and returns the database
        let { db } = await connectToDatabase();
        //gets the file metadata
        let files = await db.collection('fs.files').find({}).toArray();
        //defines bucket for grid
        let bucket = new mongodb.GridFSBucket(db);
        //Gets the index of image we want to get
        const { index } = req.query
        //Turns file metadata into json
        const filesJSON = JSON.parse(JSON.stringify(files))
        //sets current file to the image at the specified index
        const currFile = filesJSON[index]
        //gets the id of the image at the index specified
        const currId = currFile._id

        //stream to mongodb
        const downstream = bucket.openDownloadStream(ObjectId(currId));

        //sends photo back
        downstream.pipe(res)
        
    } catch (err) {
        return res.json({
            message: new Error(err).message,
            success: false,
        });
    }

    
}