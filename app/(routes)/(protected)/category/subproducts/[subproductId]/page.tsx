import SubproductClientPage from './client'

interface PageProps {
  params: {
    subproductId: string
  }
}

const Page = ({ params }: PageProps) => {
  return (
    <SubproductClientPage 
      params={{
        productId: params.subproductId
      }}
    />
  )
}

export default Page