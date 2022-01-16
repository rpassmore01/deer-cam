const { connectToDatabase } = require('../../../middleware/mongodb');

export default async function handler(req, res){
    //connects to database and returns all file meta data
    let { db } = await connectToDatabase();
    let files = await db.collection('fs.files').find({}).toArray();
    const filesJSON = JSON.parse(JSON.stringify(files))
    const images = []
    for(let i = 0; i < filesJSON.length; i++){
        images.push(`http://localhost:3000/api/images/${i}`)
    }
    res.json({images: images})
}