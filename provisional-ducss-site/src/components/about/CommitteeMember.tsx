import { Card, HStack, VStack, Image, Text, Heading } from "@chakra-ui/react"

interface CommitteeMemberProps {
  name: string,
  pronouns: string,
  role: string,
  picture: string,
  bio: string
}

export const CommitteeMember: React.FC<CommitteeMemberProps> = ({ name, pronouns, role, picture, bio }) => {
  return (
    <Card p={"10px"}>
        <VStack>
          <Image w={"100%"} p={"5px"} src={picture} alt={name} borderRadius={"0.375rem"} objectFit={"contain"} objectPosition={"center"}/>
          <Heading fontSize={"lg"} w={"100%"} textAlign={"left"}>{name}</Heading>
          <Text fontSize={"md"} w={"100%"}><i>{pronouns}</i></Text>
          <Text fontSize={"md"} w={"100%"}> {role}</Text>
          <Text fontSize={"md"} w={"100%"}> {bio} </Text>
        </VStack>
    </Card>
  )
}