import React from 'react'
import {Table, TableContainer, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'
import {useMainProvider} from '../MainProvider'

const Telemetria: React.FunctionComponent = () => {
  const {data} = useMainProvider()
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Variável</Th>
              <Th>Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Temperatura do processador</Td>
              <Td>{data?.telemetry.coreTemperature.toFixed(2)}°C</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Telemetria