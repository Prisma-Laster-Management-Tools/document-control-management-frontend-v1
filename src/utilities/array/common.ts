// GROUPING AN ARRAY INTO THE NEW RETURNED ARRAY
// EX groupBy(ref->array, (ele) => ele.name) // means grouping array [ref] by ele.name
// CREATED BY THITI MAHAWANNAKIT
export function groupBy(xs: Array<any>, f: (ele: any) => any) {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}
// ────────────────────────────────────────────────────────────────────────────────

// USAGE -> any_array.sort((a, b) => AcendingSorter(a, b, "key"));
// USAGE 2 -> any_array.sort(AcendingSorter.bind(null,"any_key_to_order_for_acending"))
export function AcendingSorter(a: any, b: any, key: string) {
    var nameA = a[key].toUpperCase(); // ignore upper and lowercase
    var nameB = b[key].toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    // names must be equal
    return 0;
}
