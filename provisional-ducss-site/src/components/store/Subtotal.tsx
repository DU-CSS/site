import { Card, Text } from "@chakra-ui/react"

interface SubtotalProps {
  subtotal: number
}

export const Subtotal: React.FC<SubtotalProps> = ({
  subtotal
}) => {
  return (
    <Card px={"15px"} h={"100px"} w={"100%"} justify={"center"} textAlign={"center"}>
      <Text fontSize={"3xl"} whiteSpace={"nowrap"}><b>Subtotal: </b>€{(Math.round((subtotal) * 100) / 100).toFixed(2)}</Text>
    </Card>
  )
}