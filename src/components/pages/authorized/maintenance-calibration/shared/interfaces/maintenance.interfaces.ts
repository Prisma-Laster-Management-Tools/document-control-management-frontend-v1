export interface IMaintenenaceCycleData {
    id: number;
    machine_name: string;
    serial_number: string;
    station: string | null;
    who: string | null;
    instruction: string;
    cycle_start_at: string;
    cycle_info: string;
    already_maintain: boolean | null;
    createdAt: string;
    updatedAt: string;
}

export interface ICreateMaintenanceCycleDTO {
    machine_name: string;
    serial_number: string;
    instruction: string;
    cycle_start_at: string;
    cycle_info: string;
    who: string | null;
    station: string | null;
}
