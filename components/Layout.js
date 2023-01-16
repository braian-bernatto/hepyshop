import Head from 'next/head'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Hepy Shop</title>
        <meta
          name='description'
          content='Una tienda donde todo es caro, pero de calidad'
        />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='min-h-screen'>
        <div className='container mx-auto'>
          <div className='mx-auto'>
            <Header />
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
