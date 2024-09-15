
import type { PageServerLoad } from './$types';
import { env } from "$env/dynamic/private";
import Stripe from 'stripe';

export const load : PageServerLoad = async function({ cookies }) {
    try {
        const stripe = new Stripe(env.STRIPE_SECRET_KEY);
        var productDetails : any = await stripe.products.list({active : true, expand: ['data.default_price'],}); 
    } catch (error) {
        var productDetails = null;
    }
    
    //console.log('Product Details', productDetails);
    console.log(env.BASE)

    return {
        products : productDetails,
    }
}