"use client"
import { Card, Heading, Text, Image, VStack, Box, HStack, IconButton } from "@chakra-ui/react"
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { useCartStore } from "@/lib/cart"

interface StoreCartItemProps {
  itemProductId: string;
  itemName: string;
  itemUnitPrice: number;
  itemImgSrc: string;
  itemQuantity: number;
}

export const StoreCartItem: React.FC<StoreCartItemProps> = ({
  itemProductId, itemName, itemUnitPrice, itemImgSrc, itemQuantity
}) => {
  const { add, remove } = useCartStore();

  return (
    <Card px={"15px"} w={"100%"}>
      <HStack w="100%">
        <Box
          position={"relative"}
          w={"100px"}
          h={"100px"}
          overflow={"hidden"}
          alignContent={"center"}
          justifyContent={"center"}>
          <Image
            w={"100%"}
            src={itemImgSrc}
            alt={itemName} />
        </Box>
        <VStack w={"100%"} justify={"left"}>
          <Heading size={"md"} w={"100%"}>{itemName}</Heading>
          <Text w={"100%"} textStyle={"italic"}>€{(Math.round(itemUnitPrice * 100) / 100).toFixed(2)} each</Text>
        </VStack>
        <HStack>
          <Text whiteSpace={"nowrap"}>€{(Math.round((itemUnitPrice * itemQuantity) * 100) / 100).toFixed(2)}</Text>
          <IconButton colorScheme={"red"} icon={<MinusIcon />} onClick={() => remove(itemProductId, 1)} aria-label="" />
          <Text whiteSpace={"nowrap"} fontSize={"xl"} fontWeight={"black"}>{itemQuantity}</Text>
          <IconButton colorScheme={"green"} icon={<AddIcon />} onClick={() => add(itemProductId, 1)} aria-label="" />
        </HStack>

      </HStack>

    </Card>
  )
}