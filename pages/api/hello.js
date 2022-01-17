const mongodb = require('mongodb')

const { connectToDatabase } = require('../../middleware/mongodb');

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