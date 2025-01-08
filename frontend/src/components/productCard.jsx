import React from 'react'
import { useState } from 'react'
import { Box, Heading, HStack, Button, Image, Text, VStack, Input } from '@chakra-ui/react'
import { Modal, ModalBody, ModalFooter, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { useProductStore } from '@/store/product';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useColorModeValue } from './ui/color-mode'
import { Toaster, toaster } from "@/components/ui/toaster"

const productCard = ({product}) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue('gray.700', 'gray.100')
  const bg = useColorModeValue('white', 'gray.800')
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false); // Use plain React state

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const {deleteProduct, updateProduct} = useProductStore()
  const handleDeleteProduct = async (pid) => {
    const {success, } = await deleteProduct(pid)
    if (!success) {
      toaster.create({
        title: "Error",
        description: "Product could not be deleted",
        status: "error",
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: "Product deleted successfully",
        status: "success",
        isClosable: true,
      });
    }
  }

  const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
    handleCloseModal();
		if (!success) {
			toaster.create({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toaster.create({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

  return (
    <Box 
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover'/>
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          {product.price}
        </Text>
        <HStack spacing={2}>
          <Button onClick={handleOpenModal}><CiEdit/></Button>
          {/* update the ui immediately without needing to refresh */}
          <Button colorScheme='red' onClick={() => handleDeleteProduct(product._id)}><MdDeleteOutline /><Toaster/></Button>
        </HStack>
      </Box>
      <Toaster />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} isCentered>
        <ModalContent  top='100px' width= '50%' margin= '0 auto' backgroundColor= 'lightpink' padding= '10px'>
          <ModalOverlay bg="blackAlpha.300"// Make the overlay slightly opaque
          />
          <ModalHeader margin= '0 auto'>
          <Button ml={5} onClick={handleCloseModal} variant='ghost'>close</Button>
          <Text color='gray.800'>Update Product</Text>
          </ModalHeader>
          <ModalBody padding= '20px'>
            <VStack spacing={4} topmargin='10px' >
              <Input
                placeholder='Product Name'
                name='name'
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                />
              <Input
                placeholder='Price'
                name='price'
                type='number'
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder='Image URL'
                name='image'
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='blue'
              variant='ghost'
              mr={1}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button colorScheme="blue" mr={1} variant='ghost' onClick={handleCloseModal} >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default productCard