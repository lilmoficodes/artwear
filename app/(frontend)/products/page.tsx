import PaymentButton from '@/components/PaymentButton'
const ProductsPage = () => {
  return (
    <div className='flex gap-x-5'>
      <PaymentButton amount={6}/>
      <PaymentButton amount={70}/>
      <PaymentButton amount={30}/>
      <PaymentButton amount={280}/>
      <PaymentButton amount={540}/>
    </div>
  )
}

export default ProductsPage
