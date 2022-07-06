import type {NextPage} from 'next'
import {useState, useEffect} from 'react'
import Head from 'next/head'
import {Flex, Image, Text, Button, Tab, Tabs, TabList, TabPanels, TabPanel} from '@chakra-ui/react'
import {useMainProvider} from '../components/MainProvider'
import Controle from '../components/panels/Controle'
import Telemetria from '../components/panels/Telemetria'
import Constantes from '../components/panels/Constantes'
import Pista from '../components/panels/Pista'

const Home: NextPage = () => {
  const {connected, connecting, chara, connect, disconnect} = useMainProvider()
  return (
    <>
      <Head>
        <title>Sariguê - Início</title>
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
            <Image src="/icon.png" alt="Logo" width="50px" height="50px" marginLeft="15px" />
            <Text
              as="h1"
              fontSize="24px"
              marginBottom="0px"
              marginLeft="15px"
            >
              Sariguê - Painel de controle
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
                  <Tab>Controle</Tab>
                  <Tab>Telemetria</Tab>
                  <Tab>Constantes</Tab>
                  <Tab>Pista</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Controle />
                  </TabPanel>
                  <TabPanel>
                    <Telemetria />
                  </TabPanel>
                  <TabPanel>
                    <Constantes />
                  </TabPanel>
                  <TabPanel>
                    <Pista />
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
              Robô não conectado
            </Text>
          )}
        </Flex>
      </Flex>
    </>
  )
}

export default Home
