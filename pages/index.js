import Product from '../components/Product'

export default function Home() {
  return (
    <>
      <h1 className='w-full text-center pt-5 text-2xl font-bold text-slate-500'>
        Ejogua la reipotava, para eso trabajas...
      </h1>
      <div className='w-full flex flex-wrap gap-10 justify-center p-10'>
        <Product item={1} />
        <Product item={2} />
        <Product item={3} />
        <Product item={4} />
        <Product item={5} />
        <Product item={6} />
        <Product item={1} />
        <Product item={1} />
      </div>
    </>
  )
}
