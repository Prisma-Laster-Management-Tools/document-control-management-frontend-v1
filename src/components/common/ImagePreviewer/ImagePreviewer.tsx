import React, { useEffect, useState } from 'react'
import ImgsViewer from "react-images-viewer";
import { SERVER_ADDRESS} from '../../../config/STATIC.json'
interface IProps{
    images_list: Array<string>| null
    visible: boolean
    on_close: () => any
}

const ImagePreviewer:React.FC<IProps> = ({images_list,visible,on_close}) => {
    const [currentImageIndex,setCurrentImageIndex] = useState<number>(0)

    useEffect(() => {
        if(!visible) return
        setCurrentImageIndex(0)
    },[visible])


    //
    // ─── IMAGE PREVIEW ──────────────────────────────────────────────────────────────
    //
    function onStopViewingAttachmentImage(){
        setCurrentImageIndex(0)
        on_close()
    }
    function onClickNextImage(){
        if(!images_list) return
        const nxt_page_index = currentImageIndex + 1
        const total_imgs = images_list.length
        if(nxt_page_index >= total_imgs)return
        setCurrentImageIndex(nxt_page_index)
    }
    function onClickPrevImage(){
        if(!images_list) return
        const previous_page_index = currentImageIndex - 1
        const total_imgs = images_list.length
        if(previous_page_index < 0)return
        setCurrentImageIndex(previous_page_index)
    }

    // ────────────────────────────────────────────────────────────────────────────────


    if(!images_list) return null
    return (
    
<ImgsViewer imgs={images_list.map((path) => ({src: `${SERVER_ADDRESS}/${path}`}))}
       currImg={currentImageIndex} isOpen={visible} onClickPrev={onClickPrevImage} onClickNext={onClickNextImage} onClose={onStopViewingAttachmentImage}/>
    )
}

export default ImagePreviewer