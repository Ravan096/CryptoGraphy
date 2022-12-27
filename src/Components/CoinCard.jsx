import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const CoinCard =({Srcimg,id, name, price, symbol, currencysymbol})=>{
    return (
        <Link to={`/coins/${id}`}>
  
        <VStack w={'52'}  shadow={'lg'} borderRadius={'lg'} p={'4'}
        transition={'all 0.3s'} m={'4'}
        css={{
          '&:hover': {
            transform:'scale(1.1)'
          }
        }} >
          <Image src={Srcimg}
          h={'10'}
          w={'10'}
          objectFit={'contain'}
          alt='cryptocurrency'/>
          <Heading size={'md'} noOfLines={1}
           textTransform={'uppercase'}>
            {symbol}
          </Heading>
          <Text noOfLines={1}>
          {price ?`${currencysymbol}${price}`:'NA'}
          </Text>
          <Text noOfLines={1}>
            {name}
          </Text>
  
        </VStack>
        </Link>
  
      
    )
  }

export default CoinCard