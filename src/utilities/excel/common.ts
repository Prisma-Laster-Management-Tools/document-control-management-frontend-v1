import * as XLSX from 'xlsx';
export async function fromExcelFileToJSON(file: File): Promise<{ success: boolean; data: any }> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e: any) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            resolve({ success: true, data });
        };
        reader.onerror = (e: any) => {
            resolve({ success: false, data: e });
        };
        if (rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);
    });
}
