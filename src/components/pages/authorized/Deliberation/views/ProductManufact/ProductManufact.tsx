import { PageHeader } from 'antd'
import React from 'react'
import { MainContainer } from './productManufact.styles'

const ProductManufact = () => {
  return (
    <MainContainer>
        <div style={{ marginLeft: -20,marginBottom:25 }} className="site-page-header-ghost-wrapper">
            <PageHeader
            ghost={false}
            title="การจัดสรรคบุคคล"
            subTitle="พนักงานภายในทั้งหมด"
            >
            </PageHeader>
        </div>
    </MainContainer>
  )
}

export default ProductManufact