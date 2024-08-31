"use client"
import { Flex, Heading, VStack } from "@chakra-ui/react"
import { useCartStore } from "@/lib/cart"
import { StoreCartItem } from "@/components/store/StoreCartItem"
import { StoreCheckoutButton } from "@/components/store/StoreCheckoutButton";
import { useMediaQuery } from "react-responsive";
import { Subtotal } from "@/components/store/Subtotal";

export const StoreCartSection = () => {
  const { items } = useCartStore();
  const cartNotEmpty = items.length > 0;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  function getSubtotal(): number {
    let subtotal = 0.0

    for (const item of items)
    {
      subtotal += (item.product.unitPrice * item.quantity)
    }

    return subtotal
  }

  return (
    <Flex w={"100%"} h={"100%"} justify={"center"}>
      <VStack w={isTabletOrMobile ? "100%" : "1024px"} h={"100%"} p={"20px"}>
        <Heading size={"lg"} w={"100%"}>Shopping Cart</Heading>
          {items.map(item => (
            <StoreCartItem
              key={item.product.productId}
              itemProductId={item.product.productId}
              itemName={item.product.name}
              itemUnitPrice={item.product.unitPrice}
              itemQuantity={item.quantity}
              itemImgSrc={item.product.images[0]} />
          ))}
        <Subtotal subtotal={getSubtotal()} />
        {cartNotEmpty && <StoreCheckoutButton />}
        
      </VStack>

    </Flex>
  )
}