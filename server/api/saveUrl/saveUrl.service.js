import { getUrlCollection } from "../../loader/collections.js";
import shortyCode from "../../middleware/redirectedGenerator.js";
import config from "../../config/config.js";
export const handleCreateUrl = async (req, res) => {
  try {
    // Use validated data from middleware
    const { mainUrl } = req.validatedData;

    const collection = await getUrlCollection();

    // Generate shortCode if not provided
    let shortCode = '4z5bRq';

    // Ensure unique shortCode
    let exists = await collection.findOne({ shortCode });
    while(exists) {
      shortCode = '4z5bRq';
      exists = await collection.findOne({ shortCode });
      throw new Error('Short Code already exists')
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
