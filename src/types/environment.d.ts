/// <reference types="web-bluetooth" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {

    }
  }
}

export interface IData {
  telemetry: {
    coreTemperature: number
  }
}