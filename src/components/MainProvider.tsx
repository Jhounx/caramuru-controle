import React, {useState, useEffect, useContext, createContext} from 'react'
import {IData} from '../types/environment.d'

export interface IMainContext {
  connected: boolean,
  data: IData | undefined,
  chara: BluetoothRemoteGATTCharacteristic | null,
  setChara: React.Dispatch<React.SetStateAction<BluetoothRemoteGATTCharacteristic | null>>,
  device: BluetoothDevice | null,
  setDevice: React.Dispatch<React.SetStateAction<BluetoothDevice | null>>,
  connecting: boolean,
  connect: () => void,
  disconnect: () => void
}

export const MainContext = createContext<IMainContext>({} as IMainContext)

export const useMainProvider = () => useContext(MainContext)

export const MainProvider: React.FunctionComponent = (props) => {
  const [connected, setIsConnected] = useState(false)
  const [chara, setChara] = useState<BluetoothRemoteGATTCharacteristic | null>(null)
  const [device, setDevice] = useState<BluetoothDevice | null>(null)
  const [server, setServer] = useState<BluetoothRemoteGATTServer | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [data, setData] = useState<IData>()

  useEffect(() => {
    if (!navigator.bluetooth) {
      console.log('Web Bluetooth API is not available in this browser!')
    }
  }, [])

  const connect = () => {
    setConnecting(true)
    navigator.bluetooth.requestDevice({
      optionalServices: ["battery_service", "device_information"],
      acceptAllDevices: true
    }).then(async (device_) => {
      const server = await device_!.gatt!.connect();
      setServer(server)
      device_.addEventListener('gattserverdisconnected', () => {
        setChara(null)
        setDevice(null)
      });
      const service = await server.getPrimaryService("battery_service");
      const tempChara = await service.getCharacteristic("battery_level")
      tempChara.startNotifications()
      tempChara.addEventListener('characteristicvaluechanged', (event: any) => {
        const decoder = new TextDecoder('utf-8');
        const buffer = event.target.value
        const str = decoder.decode(buffer)
        try {
          const obj = JSON.parse(str)
          setData(obj)
        } catch { }
      });
      setDevice(device_)
      setChara(tempChara)
      setIsConnected(true)
      setConnecting(false)
    }).catch((error) => {
      setChara(null)
      setConnecting(false)
      console.error(error)
    })
  }

  const disconnect = () => {
    if (device) {
      setConnecting(true)
      server?.disconnect()
      device.gatt?.disconnect()
      setChara(null)
      setTimeout(() => {
        setConnecting(false)
        setIsConnected(false)
      }, 1500)
    }
  }

  return (
    <MainContext.Provider value={{
      connected: connected,
      data: data,
      chara: chara,
      setChara: setChara,
      device: device,
      setDevice: setDevice,
      connecting: connecting,
      connect: connect,
      disconnect: disconnect
    }}>
      {props.children}
    </MainContext.Provider>
  )
}