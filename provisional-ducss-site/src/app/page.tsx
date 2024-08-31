import { Image, Flex, Container, VStack, Text, Center } from '@chakra-ui/react';

export default function Page() {
  return (
    <Flex 
      w={"100%"}
      h={"100vh"}
      >
      <Center w={"100%"}>
        <Container>
          <VStack>
            <Text color={"black"} fontSize={"2xl"} fontWeight={"black"}>TODO</Text>
          </VStack>
        </Container>
      </Center>
    </Flex>
  )
}