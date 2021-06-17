//
// ─── CONST VAR ──────────────────────────────────────────────────────────────────
//
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
// ────────────────────────────────────────────────────────────────────────────────

export const calculateDayPassed = function (firstDate: any, secondDate: any) {
    return Math.round(Math.abs((firstDate - secondDate) / oneDay)) as number;
};

export const isDateWithinDays = function (date: Date, num_of_day: number) {
    /*const min_date_range = new Date(moment().subtract(14, 'days').calendar());
    const max_date_range = new Date(moment().add(14, 'days').calendar());*/
    const today = new Date();
    const day_passed = calculateDayPassed(today, date);
    if (day_passed <= num_of_day) {
        return true;
    }
    return false;
};

export const isAlreadyPassedPeriodOfDay = function (num_of_day_1: number, num_of_day_2: number) {
    if (num_of_day_1 >= num_of_day_2) {
        return true;
    }
    return false;
};
export function convert_cycle_type_to_day(dtype: 'd' | 'm' | 'y') {
    if (dtype === 'd') return 1;
    else if (dtype === 'm') return 30;
    else if (dtype === 'y') return 365;
    else null;
}
