import React, { useEffect, useState } from 'react'
import { API_GetAllSourceDetail } from '../../apis/purchasement.api'
import { IPurchasementSoruce } from '../../shared/interfaces/purchasement.interfaces'

export default function useSourceDetail() {
    const [sourceDetail,setSourceDetail] = useState<Array<IPurchasementSoruce> | null>(null)
    async function getAllSourceDetail(){
        const mapped_response = await API_GetAllSourceDetail()
        if(mapped_response.success){
            console.log(mapped_response)
            setSourceDetail(mapped_response.data)
        }else{
            // failed to fetch
        }
    }
    
    useEffect(() => {
        //On mount
        getAllSourceDetail()
    },[])

    // MAPPED USAGE
    return {
        get: {
            sourceDetail,
        },
        set: {
            setSourceDetail
        }
    }
}
