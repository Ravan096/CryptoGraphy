import React, { useState } from 'react';
import { useEffect } from 'react';
import {server} from '../index';
import axios from 'axios';
import { Container, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';

const Exchanges = () => {
    const [loading, setloading] = useState(true);
    const [exchange, setexchanges]= useState([]);
    useEffect(()=>{
        const Fetchexchanges= async()=>{
            const {data} = await axios(`${server}/exchanges?per_page=50`);
            setexchanges(data);
            console.log(data);
            setloading(false)
        }
        Fetchexchanges();
        
        
    },[]);

  return (
    <Container maxW={'container.xl'}>
        {
            loading ? <Loader/> :(
                <>
                <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {
            exchange.map((i)=>{
                return(
                <ExchangeCard name={i.name} img={i.image}
                 rank={i.trust_score_rank} key={i.id} url={i.url}/>
            )
            })
        }
            </HStack>
            </>
            )
        }

    </Container>
  )
    }


const ExchangeCard =({name, img, rank, url})=>{
    return(
    <a href={url} target={'blank'}>

        <VStack w={'52'} shadow={'lg'} borderRadius={'lg'} p={'2'}
        transition={'all 0.3s'} m={'4'}
        css={{
            '&:hover':{
                transform:"scale(1.1)"
            }
        }} >
            <Image src={img} 
            w={'10'}
            h={'10'}
            objectFit={'contain'}
            alt={'Exchange'}
            />
            <Heading size={'md'}
            noOfLines={1}
            >{rank}</Heading>
            <Text
            noOfLines={1}>{name}</Text>


        </VStack>
    </a>
    )
}

export default Exchanges