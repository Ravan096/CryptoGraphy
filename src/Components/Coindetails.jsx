import { Badge, Box, Button, Container, HStack, Image, Progress, 
  Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel,
   StatNumber, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {server} from '../index';
import {useParams}from 'react-router-dom'
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';

const Coindetails = () => {

  const [loading, setloading]=useState(true)
  const [currency, setCurrency]=useState('inr');
  const [coin, setCoin]=useState({})
  const [error, seterror]= useState(false)
  const [days, setdays]= useState('24h')
  const [chartArray, setchartArray]= useState([])
  const params= useParams()

  const btns=['24h', '7d', '14d', '30d', '60d', '200d', '1y','max'];

  const currencysymbol= currency==='inr'?'₹':currency==='eur'?'€':'$';


  const switchChartStats=(key)=>{
      switch (key) {
        case '24h':
          setdays('24h');
          setloading(true);
          break;
          case '7d':
          setdays('7d');
          setloading(true);
          break;
          case '14d':
          setdays('14d');
          setloading(true);
          break;
          case '30d':
          setdays('30d');
          setloading(true);
          break;
          case '60d':
          setdays('60d');
          setloading(true);
          break;
          case '200d':
          setdays('200d');
          setloading(true);
          break;
          case '1y':
          setdays('365d');
          setloading(true);
          break;
          case 'max':
          setdays('max');
          setloading(true);
          break;
      
        default:
          setdays('24h');
          setloading(true);
          break;
      }
    
    
  }
   useEffect(() => {
    const FetchCoin=async()=>{
      try {
        const {data}= await axios.get(`${server}/coins/${params.id}`);
        const {data:chartData}= await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${
          currency}&days=${days}`);

      console.log(data)
      setCoin(data);
      setchartArray(chartData.prices)
      setloading(false)
      } catch (error) {
        seterror(true)
        setloading(false)
      }
    }
      FetchCoin();
  }, [params.id,currency, days]);

  if(error) return <ErrorComponent/>
  
  return (
    <Container maxW={'container.xl'}>
      {
        loading?<Loader/>:(
          <>
          <Box w={'full'} borderRadius={1}>
        <Chart arr={chartArray} currency={currencysymbol} days={days}/>
      </Box>
      <HStack p={'4'} wrap={'wrap'}>
        {
        btns.map((i)=>{
          return(
            <Button key={i} onClick={()=>switchChartStats(i)}>
            {i}
          </Button>
          )
        })
      }
      </HStack>
      <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
        <HStack spacing={'4'}>
          <Radio value='inr'>INR</Radio>
          <Radio value='eur'>EURO</Radio>
          <Radio value='usd'>USD</Radio>
        </HStack>
      </RadioGroup>

      <VStack spacing={'4'} p='16' alignItems={'flex-start'}>
        <Text fontSize={'small'} alignSelf='center' opacity={0.7}>
          Last Updated On{' '} {Date(coin.market_data.last_updated).split('G')[0]}

        </Text>
        <Image src={coin.image.large}
        w={'16'}
        h={'16'}
        objectFit={'contain'}
        />        
        <Stat>
          <StatLabel>
            {coin.name}
          </StatLabel>
          <StatNumber>
            {currencysymbol}{coin.market_data.current_price[currency]}
          </StatNumber>
          <StatHelpText>
            <StatArrow type={
              coin.market_data.price_change_percentage_24h >0
        ?'increase':'decrease'
      }
      />
      {coin.market_data.price_change_percentage_24h}%
          </StatHelpText>
        </Stat>
        <Badge bgColor={'blackAlpha.900'} fontSize={'2xl'}
         color={'whiteAlpha.900'}>
          {`#${coin.market_cap_rank}`}
        </Badge>


        <CustomBar high={`${currency}${coin.market_data.high_24h[currency]}`}
         low={`${currencysymbol}${coin.market_data.low_24h[currency]}`}/>

        <Box w={'full'} p={'4'}>
          <Item title={'Max Supply'} value={coin.market_data.max_supply}/>

          <Item title={'Circulating Supply'}
           value={coin.market_data.circulating_supply}/>

          <Item title={'Market Cap'}
           value={`${currencysymbol}${coin.market_data.market_cap[currency]}`}/>

          <Item title={'All Time Low'}
           value={`${currencysymbol}${coin.market_data.atl[currency]}`}/>

          <Item title={'All Time High'} 
          value={`${currencysymbol}${coin.market_data.ath[currency]}`}/>
        </Box>
      </VStack>
          </>
        )
      }

    </Container>
  )
}


const Item=({title, value})=>{
  return(
    <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
      <Text letterSpacing={'widest'}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  )
}



const CustomBar=({high, low})=>{
  return (
    <VStack w={'full'}>
      <Progress value={50} colorScheme={'teal'} w={'full'}/>
      <HStack w={'full'} justifyContent={'space-evenly'}>
        <Badge children={low} colorScheme={'red'}/>
        <Text fontSize={'sm'}>24H Range</Text>
        <Badge children={high} colorScheme={'green'}/>
      </HStack>
    </VStack>
  )
}

export default Coindetails