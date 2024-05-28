export const translateToArabic = async (articles) => {
  const translations = await Promise.all(
    articles.map(async (article) => {
      console.log('article.title', article.title)
      const translatedTitle = await translateText(article.title, 'en', 'ar')
      const translatedDescription = article.description
        ? await translateText(article.description, 'en', 'ar')
        : ''
      const translatedCategory = article.category
        ? await translateText(article.category.join(', '), 'en', 'ar')
        : ''

      return {
        ...article,
        title: translatedTitle,
        description: translatedDescription,
        category: translatedCategory.split(', ') // Assuming category is an array
      }
    })
  )

  // Save the translations to local storage
  localStorage.setItem('articles-ar', JSON.stringify(translations))
  console.log('Translations saved to local storage:', translations)
}

const translateText = async (text, fromLang, toLang) => {
  const API_KEY = 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM' // Place your API key here
  let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`
  url += '&q=' + encodeURI(text)
  url += `&source=${fromLang}`
  url += `&target=${toLang}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    const data = await response.json()
    return data.data.translations[0].translatedText
  } catch (error) {
    console.log('There was an error with the translation request:', error)
    console.log('text', text)
    return text // Return original text if translation fails
  }
}
