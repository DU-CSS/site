"use client"

import { Text, Box, Flex, Link, Wrap, IconButton, Spacer, Image, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useMediaQuery } from 'react-responsive'

const DucssLogo = <Image src="/logo.png" alt="DUCSS logo" />

export const Header = () => {
  return (
    <Box
      w={"100%"}
      h={"10%"}
      as="header"
      backgroundColor={"hsl(240, 100%, 99%)"}
      borderBottom={"3px inset hsl(229, 19%, 62%)"}
      paddingTop={5}
      paddingLeft={10}
      paddingRight={10}
      paddingBottom={5}
      top={0}
      zIndex={10}
      boxShadow="sm"
      aria-label="Header"
    >
      <Flex>
        <Flex p={0}>
          <Link href="/" w={"200%"} h={"100%"} aria-label="Home">
            <IconButton w={"200%"} p={0} icon={<Image src="/logo.svg" alt="DUCSS logo" />} h={"100%"} aria-label="DUCSS logo" colorScheme='transparent' />
          </Link>
        </Flex>

        <Spacer />
        
        <Flex p={0} h={"100%"} maxW={"95%"} aria-label="Navigation">
          <Navbar />
        </Flex>
      </Flex>
    </Box>
  );
};

export const Navbar = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

  if (isTabletOrMobile) {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Menu"
          icon={<HamburgerIcon />}
        />
        <MenuList bg={"#EFF1FF"} aria-label="Mobile navigation menu">
          <Link href="/store" colorScheme="mobileHamburger" aria-label="Store">
            <MenuItem bg={"#EFF1FF"}>
              <Text>Store</Text>
            </MenuItem>
          </Link>
          {/* 
          <Link href="/opportunities" aria-label="Opportunities">
            <MenuItem bg={"#EFF1FF"}>
            <Text>Opportunities</Text>
            </MenuItem>
          </Link>
          <Link href="/events" aria-label="Events">
            <MenuItem bg={"#EFF1FF"}>
            <Text>Events</Text>
            </MenuItem>
          </Link> 
          */}
          <Link href="/about" aria-label="About">
            <MenuItem bg={"#EFF1FF"}>
              <Text>About</Text>
            </MenuItem>
          </Link>
          <Link href="/contact" aria-label="Contact">
            <MenuItem bg={"#EFF1FF"}>
              <Text>Contact</Text>
            </MenuItem>
          </Link>
          {/* 
          <Link href="/sponsors" aria-label="Sponsors">
            <MenuItem bg={"#EFF1FF"}>
            <Text>Sponsors</Text>
            </MenuItem>
          </Link> 
          */}
        </MenuList>
      </Menu>
    )
  }
  else {
    return (
      <Flex align="center" justify="center" aria-label="Desktop navigation">
        <Wrap direction="row" align="stretch" justify="center" spacing={4}>
          <Link color={"#111111"} fontSize={{ base: "1xl" }} href="/store" aria-label="Store">Store</Link>
          {/* 
          <Link color={"#111111"} fontSize={{ base: "1xl" }} href="/opportunities" aria-label="Opportunities">Opportunities</Link>
          <Link color={"#111111"} fontSize={{ base: "1xl" }} href="/events" aria-label="Events">Events</Link> 
          */}
          <Link color={"#111111"} fontSize={{ base: "1xl" }} href="/about" aria-label="About">About</Link>
          <Link color={"#111111"} fontSize={{ base: "1xl" }} href="/contact" aria-label="Contact">Contact</Link>
          {/* 
          <Link color={"#111111"} fontSize={{ base: "1xl" }} href="/sponsors" aria-label="Sponsors">Sponsors</Link> 
          */}
        </Wrap>
      </Flex>
    )
  }
}
