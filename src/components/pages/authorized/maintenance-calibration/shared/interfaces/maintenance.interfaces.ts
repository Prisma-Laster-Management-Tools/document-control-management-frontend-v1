export interface IMaintenenaceCycleData {
    id: number;
    machine_name: string;
    serial_number: string;
    station: string | null;
    who: string | null;
    instruction: string;
    cycle_start_at: string;
    cycle_info: string;
    createdAt: string;
    updatedAt: string;
}
