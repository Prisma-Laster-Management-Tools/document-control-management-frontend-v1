import React, { CSSProperties } from 'react'
import Navbar from '../../../common/navbar'
import { Divider, BackTop , Carousel ,Button} from 'antd';
import { CopyR, FirstContainer, FirstPic, FirstPic2, FirstTextContainer, FirstTextP, FooterContainer, FooterContainer2, H3TextGold, H3TextGray, MainLandingContainer, SecondContainer, TestCard, ThirdContainer, TPicContainer, TTextContainer, TTextDetaiilContainer, TTextHeader } from './LandingPage.styles';


const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#454545',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  };

export default function Landing() {
    return (
        <>
            <Navbar is_not_in_adapter={true}/>
            <MainLandingContainer>

                <FirstContainer>
                    <FirstTextContainer>
                        <H3TextGray>จัดการสินค้าที่ผลิต</H3TextGray>
                        <H3TextGold>Prima Platform</H3TextGold>
                        <FirstTextP>PRIMA TEAM นำทีมมารวมกันไม่ว่าจะอยู่ที่ไหน ด้วยการสื่อสารและเครื่องมือทั้งหมดในที่เดียว ทีมงานทางไกลจะยังคงทำงานได้อย่างมีประสิทธิภาพ ไม่ว่าคุณจะทำงานจากที่ไหน</FirstTextP>
                        <Button size='large' shape="round" style={{border:"solid #DDA520",color:"#DDA520",width:"15rem"}}>เรียนรู้เพิ่มเติม</Button>
                    </FirstTextContainer>
                    <FirstPic/>
                </FirstContainer>

                
                <Divider style={{color:"#646464",margin:"2rem 0rem 5rem 0rem"}}>ฟังก์ชั่นการทำงาน</Divider>

                <ThirdContainer>
                    <TPicContainer icon_name="producti"></TPicContainer>
                    <TTextContainer>
                        <TTextHeader>จัดการสินค้าได้รวดเร็ว</TTextHeader>
                        <TTextDetaiilContainer>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas saepe voluptatem rem molestiae nam iusto recusandae, cupiditate ipsam. Accusamus, laboriosam!</TTextDetaiilContainer>
                    </TTextContainer>
                </ThirdContainer>
                <ThirdContainer>
                    <TTextContainer>
                        <TTextHeader>ตรวจคุณภาพได้ตามเกณฑ์</TTextHeader>
                        <TTextDetaiilContainer>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas saepe voluptatem rem molestiae nam iusto recusandae, cupiditate ipsam. Accusamus, laboriosam!</TTextDetaiilContainer>
                    </TTextContainer>
                    <TPicContainer icon_name="qci"></TPicContainer>
                </ThirdContainer>
                {/* <ThirdContainer>
                    <TPicContainer></TPicContainer>
                    <TTextContainer>
                        <TTextHeader>จัดการสินค้าได้รวดเร็ว</TTextHeader>
                        <TTextDetaiilContainer>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas saepe voluptatem rem molestiae nam iusto recusandae, cupiditate ipsam. Accusamus, laboriosam!</TTextDetaiilContainer>
                    </TTextContainer>
                </ThirdContainer>
                <ThirdContainer>
                    <TTextContainer>
                        <TTextHeader>จัดการสินค้าได้รวดเร็ว</TTextHeader>
                        <TTextDetaiilContainer>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas saepe voluptatem rem molestiae nam iusto recusandae, cupiditate ipsam. Accusamus, laboriosam!</TTextDetaiilContainer>
                    </TTextContainer>
                    <TPicContainer></TPicContainer>
                </ThirdContainer> */}
                
                <Divider style={{color:"#646464",margin:"2rem 0rem 5rem 0rem"}}></Divider>

                <SecondContainer>
                    <TestCard>1</TestCard>
                    <TestCard>2</TestCard>
                    <TestCard>3</TestCard>
                    <TestCard>4</TestCard>
                    <TestCard>5</TestCard>
                    <TestCard>6</TestCard>
                    <TestCard>7</TestCard>
                    <TestCard>8</TestCard>
                    <TestCard>9</TestCard>
                </SecondContainer>

                <Divider>เครื่องมือที่ใช้พัฒณาระบบนี้</Divider>

        
                <Carousel autoplay>
                    <FirstPic2>
                    </FirstPic2>
                    <FirstPic2>
                    </FirstPic2>
                    <FirstPic2>
                    </FirstPic2>
                    <FirstPic2>
                    </FirstPic2>
                </Carousel>
            
                <BackTop>
                    <div style={style as CSSProperties}>UP</div>
                </BackTop>
            </MainLandingContainer>
            

            <FooterContainer>
                    asdasd
            </FooterContainer> 
            <FooterContainer2>
                <CopyR>Copyright © 2020 by Prima laser Therapy. All Right Reserved</CopyR>
            </FooterContainer2>
        </>
    )
}
