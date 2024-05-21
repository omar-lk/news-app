// App.js
import { useEffect } from 'react'
import './App.css'
import i18next from 'i18next'

// Initialize i18next outside of the component
i18next.init({
  lng: 'en',
  resources: {
    ar: {
      translation: {
        Translate: 'الترجمة'
      }
    },
    en: {
      translation: {
        Translate: 'translation'
      }
    }
  }
})

function App () {
  useEffect(() => {
    let fromLang = 'en'
    let toLang = 'ar' // translate to norwegian
    let text = 'something to translate'

    const API_KEY = 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'

    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`
    url += '&q=' + encodeURI(text)
    url += `&source=${fromLang}`
    url += `&target=${toLang}`

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log('response from google: ', response)
      })
      .catch(error => {
        console.log('There was an error with the translation request: ', error)
      })
  }, [])
  const changeLanguage = lng => {
    i18next.changeLanguage(lng)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={() => changeLanguage('ar')}>arabic</button>
        {i18next.t('Translate')}
      </header>
    </div>
  )
}

export default App
