import { Container, SimpleGrid, VStack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import productCard from "../components/productCard";

const HomePage = () => {  
  const {fetchProducts, products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacinf={8}>
        <Text 
        mt="-40px"
        fontSize="20px"
        fontWeight="bold"
        bgClip="text"
        bgGradient="linear(to-r, blue.400, teal.400)"
        textAlign="center"
        color="teal.500">
          Current Products
        </Text>
        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 3 }} 
          gap='15px'
          margin={4}
        >
        {products.map((product) => (
          <productCard key={product._id} product={product} />
        ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
          No products found 😢{" "}
          <Link to={"/create"}>
            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
              Create a product
            </Text>
          </Link>
        </Text>
        )}
      </VStack>
    
    </Container>
  );
}

export default HomePage;

