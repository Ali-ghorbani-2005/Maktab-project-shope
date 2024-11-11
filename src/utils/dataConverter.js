export function numberWithCommas(x) {
    return new Intl.NumberFormat("fa-IR").format(x);
}