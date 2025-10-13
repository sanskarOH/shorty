import { getUrlCollection } from "../../loader/collections.js";
import shortyCode from "../../middleware/redirectedGenerator.js";
import config from "../../config/config.js";


export const handleCreateUrl = async (req, res) => {
  try {
   
    const mainUrl  = req.validatedData;
    const collection = await getUrlCollection();
    console.log(mainUrl)
    let urlExists = await collection.findOne({originalUrl:mainUrl});
    console.log(urlExists)
    if(urlExists!=null){
        res.status(400).json({
            success: false,
            message: "Url shortcode already exists",
            shortendUrl: `${config.base_url}/${urlExists.shortCode}`
        })
    }
    
    let shortCode = shortyCode();


    let shortCodeExists = await collection.findOne({ shortCode });
    while(shortCodeExists) {
      shortCode = shortyCode();
      exists = await collection.findOne({ shortCode });
    }

    const newEntry = {
      originalUrl: mainUrl,
      shortCode: shortCode,
      createdAt: new Date(),
    };
    console.log(newEntry)

    await collection.insertOne(newEntry);

    res.json({
      success: true,
      shortUrl: `${config.base_url}/${shortCode}`,
      data: newEntry,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
