const { connectToDatabase } = require('../../../middleware/mongodb');

export default async function handler(req, res){
    //connects to database and returns all file meta data
    let { db } = await connectToDatabase();
    let files = await db.collection('fs.files').find({}).toArray();
    const filesJSON = JSON.parse(JSON.stringify(files))
    const images = []
    for(let i = 0; i < filesJSON.length; i++){
        images.push({
            image: `http://localhost:3000/api/images/${i}`,
            date: filesJSON[i].uploadDate,
        })
    }
    res.json({images: images, length: filesJSON.length})
}