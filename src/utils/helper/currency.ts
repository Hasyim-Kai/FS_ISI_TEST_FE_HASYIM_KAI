export const formatToIdrCurrency = (theNumber: number) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
}).format(theNumber)

export const formatToUsdCurrency = (theNumber: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
}).format(theNumber)