export interface IQcStatisticData {
    statistic: {
        product_count: number;
        total_qc_passed: number;
        total_qc_failed: number;
        total_never_qc: number;
        total_in_queue: number;
    };
}

export interface IPurchasementStatisticData {
    statistic: {
        totaL_request: number;
        total_await_request_to_be_accept: number;
        total_rejected_request: number;
        total_in_process_request: number;
        total_successfully_request: number;
    };
}
