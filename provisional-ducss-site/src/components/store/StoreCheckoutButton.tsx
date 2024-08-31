"use client"
import { StoreCartItem, storeCartItemToStripeCheckoutItem, useCartStore } from "@/lib/cart"
import { checkout } from "@/lib/stripe";
import { Button, Text } from "@chakra-ui/react";

const backendUrl = process.env.BACKEND_URL || 'http://localhost:5055';

export const StoreCheckoutButton = () => {
  const { items } = useCartStore();

  const exportCart = (cartItems: StoreCartItem[]) => {
    return cartItems.map(storeCartItemToStripeCheckoutItem);
  }

  const handleCheckout = async () => {
    const body = JSON.stringify(exportCart(items))

    try {
      const data = await checkout(body)
      
      window.location.href = data.sessionUrl
      // window.open(data.sessionUrl)
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  }

  return (
    <Button 
      colorScheme={"orange"}
      w="100%" 
      h="100px" 
      onClick={handleCheckout}>
        <Text fontSize={"4xl"}>Checkout</Text>
      </Button>
  )
}