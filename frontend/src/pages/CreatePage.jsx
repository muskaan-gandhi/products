import { useColorModeValue } from '@/components/ui/color-mode'
import { Container, VStack, Heading, Box, Input, Button } from '@chakra-ui/react'
import {useState} from 'react'
import { Toaster, toaster } from "@/components/ui/toaster"
import { useProductStore } from '@/store/product.js'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  })

	const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
    
		if (!success) {
			toaster.create({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toaster.create({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
	  setNewProduct({ name: "", price: "", image: "" });
	};

  return (
    <Container maxW={"container.sm"}>
      <VStack>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} >
          Create new Product
        </Heading>

        <Box
        w={"full"} bg= {useColorModeValue("white", "gray.800")} 
        p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack spacing={4}>
            <Input 
            placeholder="Product name" 
            name="name"
            value={newProduct.name} 
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
            <Input 
            placeholder="Product price" 
            name="price"
            value={newProduct.price} 
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
            <Input 
            placeholder="Product image"
            name="image" 
            value={newProduct.image} 
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} />
            <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
							Add Product
              <Toaster />
						</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage
