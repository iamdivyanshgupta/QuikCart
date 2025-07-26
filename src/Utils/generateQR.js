export const generateQR = (productId) =>
    `https://api.qrserver.com/v1/create-qr-code/?data=${productId}&size=150x150`;
  