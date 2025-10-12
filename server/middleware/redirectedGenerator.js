import { nanoid } from "nanoid";

const shortyCode = () => {

    try{
        const shCode = nanoid(6);
        return shCode;

    }catch(err){
        console.error(err);
        return "xxxxxx";

    }
    

}

export default shortyCode;