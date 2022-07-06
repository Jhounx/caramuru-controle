import type {NextPage} from 'next'
import Head from 'next/head'
import {Flex, Image, Text, Button, Tab, Tabs, TabList, TabPanels, TabPanel} from '@chakra-ui/react'
import {useMainProvider} from '../components/MainProvider'
import Telemetria from '../components/panels/Telemetria'


const Home: NextPage = () => {
  const {connected, connecting, chara, connect, disconnect} = useMainProvider()
  return (
    <>
      <Head>
        <title>Caramuru - Início</title>
      </Head>
      <Flex
        height="100%"
        width="100%"
        flexDir="column"
      >
        <Flex
          as="nav"
          width="100%"
          height="64px"
          backgroundColor="#edf2f7"
        >
          <Flex
            flex="1"
            height="100%"
            alignItems="center"
          >
            <Image src="/barco.png" alt="Logo" width="50px" height="50px" marginLeft="15px" />
            <Text
              as="h1"
              fontSize="24px"
              marginBottom="0px"
              marginLeft="15px"
            >
              Caramuru - Painel de controle
            </Text>
          </Flex>
          <Flex
            flex="1"
            height="100%"
            justifyContent="end"
            alignItems="center"
            paddingRight="15px"
          >
            {(!connected) && (
              <Button colorScheme="blue" onClick={connect} disabled={connecting}>Conectar</Button>
            )}
            {(connected) && (
              <Button colorScheme="blue" onClick={disconnect} disabled={connecting}>Desconectar</Button>
            )}
          </Flex>
        </Flex>
        <Flex
          width="100%"
          justifyContent="center"
          alignItems="center"
          flexGrow="1"
        >
          {(connected) && (
            <>
              <Tabs
                width="100%"
                height="100%"
              >
                <TabList>
                  <Tab>Telemetria</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Telemetria />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </>
          )}
          {(!connected) && (
            <Text
              color="#3182ce"
              fontSize="25px"
            >
              Barco não conectado
            </Text>
          )} 
        </Flex>
      </Flex>
    </>
  )
}

export default Home
