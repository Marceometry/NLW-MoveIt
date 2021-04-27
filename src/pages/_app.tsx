import { Provider } from 'next-auth/client'
import '../css/global.css'
import '../css/animations.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}