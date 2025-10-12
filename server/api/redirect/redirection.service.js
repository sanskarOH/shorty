import { getUrlCollection } from "../../loader/collections.js";

export const redirectionHandler = async(req, res) => {
    
    try{
        
        const shortCode = req.validatedData.shortCode;
        const collection = await getUrlCollection();
        
        let exists = await collection.findOne({shortCode});
        

        if(exists){
            const mainUrl = exists.originalUrl;
            return res.status(200).json({
                success: true,
                message: 'URl was found',
                url: mainUrl
            })
            
        }else{
            return res.status(404).json({
                success: false,
                message: "Url does not exist"
            })
        }

    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Interal Sever Error',
            error: err,
        })

    }

}