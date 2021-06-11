import React from 'react'
import { PageHeader, Button, Descriptions,Tag } from 'antd';
export default function QcHeaderStatus() {
  return (
<div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title="การตรวจสอบคุณภาพ"
      subTitle="สถิติ"
    //   extra={[
    //     <Button key="3">Operation</Button>,
    //     <Button key="2">Operation</Button>,
    //     <Button key="1" type="primary">
    //       Primary
    //     </Button>,
    //   ]}
    >
      <Descriptions size="middle" column={4}>
        <Descriptions.Item><Tag color="default">สินค้าทั้งหมด</Tag>: 206 ชิ้น</Descriptions.Item>
        <Descriptions.Item >
        <Tag color="green">ผ่านมาตรฐาน</Tag>: 10 ชิ้น
        </Descriptions.Item>
        <Descriptions.Item><Tag color="red">ไม่ผ่านมาตรฐาน</Tag>: 3 ชิ้น</Descriptions.Item>
        <Descriptions.Item><Tag color="blue">รอการตรวจสอบ</Tag>: 13 ชิ้น</Descriptions.Item>
        {/* <Descriptions.Item label="Remarks">
          Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item> */}
      </Descriptions>
    </PageHeader>
  </div>
  )
}
