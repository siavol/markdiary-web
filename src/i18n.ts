import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import localeResources from './locales'

i18n.use(initReactI18next).init({
  lng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: localeResources,
})

export default i18n
