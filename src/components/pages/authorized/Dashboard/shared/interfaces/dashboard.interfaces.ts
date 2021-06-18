export interface IQcStatisticData {
    statistic: {
        product_count: number;
        total_qc_passed: number;
        total_qc_failed: number;
        total_never_qc: number;
        total_in_queue: number;
    };
}
