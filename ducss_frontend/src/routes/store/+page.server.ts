import { products } from "$db/collections";
import type { WithId } from "mongodb";
import type { PageServerLoad } from './$types'

export const load : PageServerLoad = async function() {
    var productDetails = await products.find({}, {projection: {_id : false}}).toArray();
    
    console.log('Product Details', productDetails)
    return {
        products : productDetails
    }
}