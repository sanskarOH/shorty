import { getUrlCollection } from "../../loader/collections.js";
import redirection from '../../middleware/siteOpen.js'
export const redirectionHandler = async(req, res) => {
    
    try{
        
        const shortCode = req.validatedData.shortCode;
        const collection = await getUrlCollection();
        
        let exists = await collection.findOne({shortCode});
        

        if(exists){
            const mainUrl = exists.originalUrl;
            console.log(mainUrl)
            return res.redirect(exists.originalUrl.mainUrl)
            
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