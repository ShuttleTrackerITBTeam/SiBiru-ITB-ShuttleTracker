import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@src/styles/global.css'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider defaultTheme="light" enableSystem={false}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App
