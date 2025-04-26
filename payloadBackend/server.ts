import config from '@payload-config'
import { getPayload } from 'payload'
export const getPayloadClient = async () =>{
    const payload = await getPayload({config : config});
    return payload;
}