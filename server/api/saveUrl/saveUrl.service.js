import { getUrlCollection } from "../../loader/collections";
import shortyCode from "../../middleware/redirectedGenerator";

export const handleCreateUrl = async (url) => {
    const collection = await getUrlCollection();
    
    let shortCode = shortyCode();
    let exists = await collection.findOne({shortCode});
    while(exists){
        shortCode = shortCode();
        exists = await collection.findOne({shortCode})
    }

    const newEntry = {
        originalUrl: url,
        shortCode,
        createdAt: new Date(),
    };

    await collection.insertOne(newEntry);

    return {
        success: true,
        shortUrl: `${process.env.BASE_URL}/${shortCode}`,
        data: newEntry,
    };
};