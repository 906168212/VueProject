import axios from "axios";
import {handleGetStsTokenSuccessResponse} from "@/api/responseHandler/allSuccessResponseHandle.js";

export const getStsToken = async () =>{
    try {
        const responseBody = await axios.get("http://localhost:8081/get_sts_token_for_oss_upload",{
            headers:{
                'Access-Control-Allow-Origin' : '*'
            }
        })
        return handleGetStsTokenSuccessResponse(responseBody.data);
    }catch (error){
        log.error(error.message)
    }
}