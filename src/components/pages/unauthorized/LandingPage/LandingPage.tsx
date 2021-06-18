import React, { CSSProperties } from 'react'
import Navbar from '../../../common/navbar'
import { Divider, BackTop , Carousel } from 'antd';
import { FirstContainer, FirstPic, FirstPic2, FirstTextContainer, FirstTextP, FooterContainer, H3TextGold, H3TextGray, MainLandingContainer, SecondContainer, TestCard } from './LandingPage.styles';


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
                        <FirstTextP>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, magni quia neque maiores quisquam sequi minima reiciendis repellendus, facilis, fugit aliquam sapiente! Adipisci quo ut animi vitae labore itaque tempora.</FirstTextP>
                    </FirstTextContainer>
                    <FirstPic/>
                </FirstContainer>

                
                <Divider style={{color:"#646464"}}>เครื่องมือที่ใช้พัฒณาระบบนี้</Divider>

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
        </>
    )
}
