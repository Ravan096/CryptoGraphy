import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react';
import bgImg from '../Assets/btc.png';
import {motion} from 'framer-motion';
const Home = () => {
  return (
    <Box  bgColor={'blackAlpha.900'} w={'full'} h={'85vh'}>
      <motion.div style={{
        height:'80vh',
      }}
      animate={{
          translateX:'20px',
        }}
        
        transition={{
          duration:1.3,
          repeat:"Infinity",
          repeatType:'mirror',
          
        }}
        >
      <Image 
      objectFit={'contain'}
      src={bgImg}
      h={'full'}
      w={'full'}
      filter={"grayscale(1)"}
      />
      </motion.div>
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
