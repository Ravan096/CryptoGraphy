import React from 'react';
import {Button, HStack} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <HStack h={'16'} p={'2'} bgColor={'blackAlpha.900'} color={'whiteAlpha.900'}>
        <Button variant={'unstyled'}>
            <Link to={'/'}>Home</Link>
        </Button>

        <Button variant={'unstyled'}>
            <Link to={'/coins'}>Coins</Link>
        </Button>

        <Button variant={'unstyled'}>
            <Link to={'/exchanges'}>Exchange</Link>
        </Button>
    </HStack>
  )
}

export default Header