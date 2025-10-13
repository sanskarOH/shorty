import { nanoid } from "nanoid";

const shortyCode = () => {

    try{
        const shCode = nanoid(6);
        console.log('shortcode generate', shCode)
        return shCode;

    }catch(err){
        console.error(err);
        return "xxxxxx";

    }
    

}

export default shortyCode;