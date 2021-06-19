import React, { useEffect, useState } from 'react';
import { IPurchasementData } from '../../../../semirized/purchasement/shared/interfaces/purchasementTracking.interfaces';
import { API_GetAllPurchasementRequest } from '../../apis/purchasement.api';
import { IPurchasementRequest } from '../../shared/interfaces/purchasement.interfaces';

export default function usePurchasementRequest() {
    const [purchasementReq, setPurchasementReq] = useState<Array<IPurchasementData> | null>(null);

    async function getAllPurchasementRequest() {
        const mapped_response = await API_GetAllPurchasementRequest();
        if (mapped_response.success) {
            setPurchasementReq(mapped_response.data.data.data);
        } else {
            //failed to fetch the data
        }
    }
    useEffect(() => {
        // ON MOUNT
        getAllPurchasementRequest();
    }, []);
    return {
        get: { purchasementReq },
        set: { setPurchasementReq },
        events: {},
    };
}
