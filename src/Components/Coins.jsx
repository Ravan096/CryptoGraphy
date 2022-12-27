import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {server} from '../index'
import CoinCard from './CoinCard';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const Coins = () => {
  const [currency, setCurrency] = useState('inr')
  const [loading, setloading] = useState(true)
  const [error, seterror]= useState()
  const [page, setPage] = useState(1)
  const [coin, setCoin]= useState([])

  const currencysymbol =
          currency==='inr'?'₹':currency==='eur'?'€':'$';





  const ChangePage=(page)=>{
    setPage(page);
  }
  const btns= new Array(132).fill(1)
 
  useEffect(() => {

    
    const  FetchCoins=async ()=>{
      try{
      const{data}= await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);

      setCoin(data);
      setloading(false);
      console.log(data);
    }catch(error){
      seterror(true);
      setloading(false);
    } 
  };

    // return () =>

      FetchCoins();
    // }
  }, [currency, page]);

  if(error) return <ErrorComponent/>

  return (
    <Container maxW={'container.xl'}>
      {
        loading?(
          <Loader/>
        ):(
          <>

      <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
        <HStack spacing={'4'}>
          <Radio value='inr'>INR</Radio>
          <Radio value='usd'>USD</Radio>
          <Radio value='eur'>EUR</Radio>
          
        </HStack>
      </RadioGroup>
      <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
        {
          coin.map((i)=>{
            return(
              <CoinCard 
               id={i.id}
               name={i.name}
               Srcimg={i.image}
               price={i.current_price} 
               symbol={i.symbol}
               currencysymbol={currencysymbol}
               key={i.id}/>
            )
          })
        }
      </HStack>
      <HStack overflow={'auto'} p={'8'}>
      {
        btns.map((item, index)=>{
          return(
          <Button 
      bgColor={'blackAlpha.900'}
      color={'white'}
      onClick={()=>ChangePage(index+1)}>
        {index+1}
      </Button>
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



export default Coins