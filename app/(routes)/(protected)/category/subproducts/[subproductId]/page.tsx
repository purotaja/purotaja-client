import SubproductClientPage from './client'

interface Params {
  subproductId: string
}

const page = (
  { subproductId }: Params
) => {
  return <SubproductClientPage params={{
    productId: subproductId
  }}/>
}

export default page;
