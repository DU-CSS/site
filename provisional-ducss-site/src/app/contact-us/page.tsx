"use client"
import { Text, VStack, Heading, Card } from "@chakra-ui/react";
import { useMediaQuery } from 'react-responsive'

export default function Page() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <VStack w={"100%"} h={"90vh"} justifyContent={"center"}>
      <Card w={isTabletOrMobile ? "90%" : "60%"} p={"25px"}>
        <VStack>
          <Heading>Contact</Heading>
          <Text>If you would like to get in touch, please email us: ducss [at symbol] csc [period] ie</Text>
          <Text>We are not interested in unsolicited social media services, unethical businesses, or generally unrelated activities to the mission of the society.</Text>
          <Text>A non-exhaustive list of industries we will not partner with: crypto, gambling, oil & gas.</Text>
        </VStack>
      </Card>
    </VStack>
  )
}