"use client";
import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, Button } from "@chakra-ui/react"
import { useCartStore } from "@/lib/cart";
import { StripeProduct } from "@/lib/store";

export const StoreItem: React.FC<StripeProduct> = ({
  productId, priceId, name, description, images, unitPrice }) => {
  const { add } = useCartStore();

  return (
    <Card w='250px' h="md">
      <CardBody>
        <Image
          src={images ? images[0] : "/tiling_background.png"}
          alt={name}
          borderRadius='lg'
          maxW={"200px"}
          maxH={"200px"}
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{name}</Heading>
          <Text>
            {description}
          </Text>
          <Text color='orange.600' fontSize='2xl'>
          €{(Math.round(unitPrice * 100) / 100).toFixed(2)}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
          <Button 
          variant={"solid"} 
          colorScheme='orange' 
          w={"100%"}
          onClick={() => add(productId, 1)}>
            Add to cart
          </Button>
      </CardFooter>
    </Card>
  )
}
