import React, { useEffect, useState } from 'react'
import { PageHeader, Button, Descriptions,Tag, Spin,Space } from 'antd';
import { IQualityInQueueData } from '../../../../shared/interfaces/qc.interface';
import { API_GetAllProduct } from '../../../../../Product/apis/product.api';
import { IProductList } from '../../../../../Product/shared/interfaces/product.interfaces';
interface IProps{
  product_data: Array<IQualityInQueueData> | null
}
interface IProdStat{total:number,passed:number,failed:number}
const QcHeaderStatus:React.FC<IProps> = ({product_data}) => {
  const is_loading = product_data === null

  const total_pass = product_data ? product_data.filter((data) => data.product.quality_passed===true).length : 0
  const total_failed = product_data ? product_data.filter((data) => data.product.quality_passed===false).length : 0
  const [productStatistic,setProductStatistic] = useState<IProdStat | null>(null)
  const is_fetching_stat = productStatistic === null
  async function fetchAllProductList(){
    const mapped_response = await API_GetAllProduct()
    if(mapped_response.success){
      const prods:Array<IProductList> = mapped_response.data.data.data
      const statistic:IProdStat = {
        total: prods.length,
        passed: prods.filter((data) => data.quality_passed===true).length,
        failed:  prods.filter((data) => data.quality_passed===false).length
      }
      setProductStatistic(statistic)
    }else{
      // failed to fetch
    }
  }

  useEffect(() => {
    //ON MOUNT -> fetch all product    
    fetchAllProductList()
  },[])

  return (
  <div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="การตรวจสอบคุณภาพ"
      subTitle="สถิติ"
    >
      <Descriptions size="middle" column={4}>
        <Descriptions.Item>
            {/* <Space size="small"> */}
              <Tag color="default">สินค้าทั้งหมด</Tag>
              {is_fetching_stat ?  <Spin /> : `: ${productStatistic?.total} ชื้น`}
            {/* </Space> */}
        </Descriptions.Item>
        <Descriptions.Item >
        <Tag color="green">ผ่านมาตรฐาน</Tag>
        {is_fetching_stat ?  <Spin /> : `: ${productStatistic?.passed} ชื้น`}
        </Descriptions.Item>
        <Descriptions.Item><Tag color="red">ไม่ผ่านมาตรฐาน</Tag>
        {is_fetching_stat ?  <Spin /> : `: ${productStatistic?.failed} ชื้น`}
        </Descriptions.Item>
        <Descriptions.Item><Tag color="blue">รอการตรวจสอบ</Tag>
        {is_loading ?  <Spin /> : `: ${product_data!.length} ชื้น`}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Remarks">
          Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item> */}
      </Descriptions>
    </PageHeader>
  </div>
  )
}
export default QcHeaderStatus