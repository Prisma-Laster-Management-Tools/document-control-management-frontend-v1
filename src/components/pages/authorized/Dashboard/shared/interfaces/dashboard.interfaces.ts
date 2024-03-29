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

export interface IRecruitmentStatisticData {
    statistic: {
        total_generated_link: number;
        total_used_link: number;
        total_unused_link: number;
    };
}

export interface IMaintenanceStatisticData {
    statistic: {
        total_calibration_schedule: number;
        total_calibration_period_hit: number;
        total_maintenance_schedule: number;
        total_maintenance_attention_needed: number;
        total_maintenance_never_maintained: number;
    };
}

export interface IDeliberationStatisticData {
    statistic: {
        total_shipping_successfully: number;
        total_waiting_to_be_shipped: number;
        total_rejected_shipping: number;
        total_exportation: number;
    };
}

export interface IProductStatisticData {
    statistic: {
        total_product: number;
        total_product_type: number;
    };
}
