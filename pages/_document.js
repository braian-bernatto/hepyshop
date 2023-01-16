import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='bg-gray-300 text-xs md:text-base'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
