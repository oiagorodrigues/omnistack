import axios from 'axios'

const api = axios.create({
  /**
   * a baseURL vai mudar de acordo com o dispositivo de teste que estiver utilizando.
   * emulador genymotion: http://10.0.3.2
   * emulador android studio: http://10.0.2.2
   * via usb: http://ip_da_maquina
   * emulador ios: http://localhost
   */
  baseURL: 'http://192.168.0.14:3333/'
})

export default api
