export interface ICalibrationEvidenceData {
    id: number;
    machine_name: string;
    serial_number: string;
    description: string | null;
    is_pass: boolean;
    attachments: string; // splitter ,spiltter-23564,
    stamper_firstname: string;
    stamper_lastname: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICalibrationCycleData {
    id: number;
    machine_name: string;
    serial_number: string;
    instruction: string;
    cycle_start_at: string;
    cycle_info: string;
    createdAt: string;
    updatedAt: string;

    calibration_evidence: Array<ICalibrationEvidenceData>; // eager by default
}

export interface ICreateCalibrationCycleDTO {
    machine_name: string;
    serial_number: string;
    instruction: string;
    cycle_start_at: string;
    cycle_info: string;
    // who: string | null;
    // station: string | null;
}
