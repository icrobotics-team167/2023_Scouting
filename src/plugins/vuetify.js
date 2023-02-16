// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
<template><div class="text-primary-lighten-1">text color</div></template>


const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#0b5c06',
    surface: '#000000',
    primary: '#000000',
    'primary-darken-1': '#000000',
    secondary: '#000000',
    'secondary-darken-1': '#000000',
    error: '#000000',
    info: '#000000',
    success: '#000000',
    warning: '#000000',
    text: '#000000'
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes:{
      myCustomLightTheme,
    }
  }
}
)
