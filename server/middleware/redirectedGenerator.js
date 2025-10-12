import { nanoid } from "nanoid";

const shortyCode = () => {

    try{
        const shCode = nanoid(6);
        console.log(shCode)

    }catch(err){
        console.error(err);
        return Math.random().toString(36).substring(2, 2 + length);

    }
    

}

export default shortyCode;