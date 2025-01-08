import { Container, Flex, HStack, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { ColorModeButton } from './ui/color-mode';
import { Link } from 'react-router-dom'
import { CiSquarePlus } from "react-icons/ci";
import { useProductStore } from '@/store/product';

const Navbar = () => {
  return (
    <Container maxW={"1140px"} px={4} py={1}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row"
        }}
      >
        <Text
        href='#'
        
        
        textAllign={"center"}
        // bgGradient="to-r" gradientFrom="red.500" gradientTo="pink.500"
        
        style={{'&:hover': { textDecoration: 'underline' } }}
        >
          <Link to="/">
          <Button fontSize='20px'
        fontWeight={"bold"} 
        color = "teal.500"
        variant= 'surface'
        textTransform={"uppercase"}>Product Store 🛒</Button></Link>   
        </Text>  
        <HStack spacing={2} alignItems={"center"}>
          <Link to="/create">
            <Button>
              <CiSquarePlus fontSize = {20} />
            </Button>
          </Link>
          <ColorModeButton/>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar;