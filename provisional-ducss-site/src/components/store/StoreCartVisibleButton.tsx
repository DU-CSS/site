import { IconButton } from "@chakra-ui/react"
import { MdOutlineShoppingCart } from "react-icons/md";

export const StoreCartVisibleButton = () => {
  return (
    <IconButton icon={<MdOutlineShoppingCart />} aria-label="" />
  )
}