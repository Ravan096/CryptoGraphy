import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react';
import bgImg from '../Assets/btc.png';
const Home = () => {
  return (
    <Box  bgColor={'blackAlpha.900'} w={'full'} h={'85vh'}>
      <Image 
      objectFit={'contain'}
      src={bgImg}
      h={'full'}
      w={'full'}
      filter={"grayscale(1)"}
      />
      <Text mt={'-20'} fontSize={'6xl'}
      textAlign={'center'}
      fontWeight={'bold'}
      color={'whiteAlpha.700'}>
        CryptoGraphy
      </Text>
    </Box>
  )
}

export default Home