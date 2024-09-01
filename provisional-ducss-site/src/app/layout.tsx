import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Navbar";
import { Box, Image, Flex, ChakraProvider, ScaleFade } from '@chakra-ui/react'
import { theme } from "@/app/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DUCSS",
  description: "Trinity College Dublin's Computer Science Society",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider theme={theme}>
          <Header />
          {/* <ScaleFade in={true}> */}
            <Flex 
            w={"100%"}
            minH={"100vh"}>
              <Box 
              w={"100%"} 
              minH={"100%"} 
              p={0} 
              bgPosition={"center"} 
              bgRepeat={"repeat"} 
              backgroundColor={"#EFF1FF"} 
              backgroundImage={"/tiling-bg-white.png"}>
                {children}
              </Box>
            </Flex>
          {/* </ScaleFade> */}
        </ChakraProvider>
      </body>
    </html>
  );
}