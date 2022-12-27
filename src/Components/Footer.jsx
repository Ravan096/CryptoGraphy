import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box bgColor={'blackAlpha.900'}
    color={'whiteAlpha.700'}
    minH={'48'}
    px={'16'}
    py={['16', '8']}>
        <Stack direction={['column', 'row']}
        h={'full'}
        alignItems={'center'}>
            <VStack w={'full'} alignItems={['center','flex-start']}>
                <Text>
                About Us
                </Text>
                <Text alignItems={['center', 'left']}
                fontSize={'sm'}
                letterSpacing={'widest'}>
                    We are the best crypto trading app in India,
                    we provide our guidance at a very low price.
                </Text>
            </VStack>
            <VStack>
                <Avatar boxSize={'28'} mt={['4', '0']}/>
                <Text>
                    Our Founder
                </Text>
            </VStack>

        </Stack>
    </Box>
  )
}

export default Footer