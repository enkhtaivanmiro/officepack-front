export const cardPaymentMethods = [
  {
    min: 0,
    code: 'visa',
    name: 'Credit/Debit card',
    description: 'Credit/Debit card',
    logo: 'https://cdn.portal.mn/uploads/4fe1344d-249d-4274-97b9-726d30802862.png',
  },
  // {
  //   min: 0,
  //   code: 'tdbm',
  //   name: 'TDB card',
  //   description: 'TDB BRITTO карт',
  //   // link: 'socialpay-payment://key=',
  //   logo: 'https://qpay.mn/q/logo/tdbbank.png',
  // },
];

export const paymentMethods = [
  {
    min: 0,
    code: 'qpay',
    name: 'qPay wallet',
    className: '',
    description: 'qPay хэтэвч',
    link: 'qpaywallet://q?qPay_QRcode=',
    logo: 'https://s3.qpay.mn/p/e9bbdc69-3544-4c2f-aff0-4c292bc094f6/launcher-icon-ios.jpg',
  },
  {
    min: 0,
    code: 'socialpay',
    name: 'Golomt SocialPay',
    description: 'Голомт SocialPay',
    // link: 'socialpay-payment://key=',
    logo: 'https://qpay.mn/q/logo/socialpay.png',
  },
  {
    min: 0,
    code: 'qpos',
    name: 'qPOS',
    description: 'qPOS',
    // link: 'socialpay-payment://key=',
    logo: 'https://cdn.portal.mn/uploads/058f1b51-e074-4c1d-93bb-8029edd22fb0.webp',
  },
  {
    min: 0,
    code: 'digipay',
    name: 'DiGi Pay ',
    description: 'DiGi Pay',
    // link: 'socialpay-payment://key=',
    className: 'hideMobile',
    logo: 'https://cdn.portal.mn/uploads/bab588dc-cf7d-4619-85d5-e7599e93770e.webp',
  },
  {
    min: 0,
    code: 'digipay_m',
    name: 'DiGi Pay ',
    description: 'DiGi Pay',
    // link: 'socialpay-payment://key=',
    className: 'hideDesktop',
    logo: 'https://cdn.portal.mn/uploads/bab588dc-cf7d-4619-85d5-e7599e93770e.webp',
  },
];

export const afterPaymentMethods = [
  // {
  //   code: 'simple',
  //   name: 'Simple',
  //   min: 50000,
  //   description: 'Simple pay',
  //   logo: 'https://cdn.portal.mn/uploads/98152d4c-54ab-4901-b2ab-d9f52ff6311d.jpeg',
  // },
  {
    code: 'hipay',
    name: 'HiPay wallet',
    description: 'HiPay хэтэвч',
    logo: 'https://cdn.portal.mn/uploads/3812bff7-edea-4e65-9556-3904746a6dc1.jpeg',
  },
  {
    code: 'monpay',
    name: 'Monpay',
    description: 'Monpay',
    className: 'hideDesktop',
    logo: 'https://qpay.mn/q/logo/monpay.png',
  },
  {
    code: 'monpayqr',
    name: 'Monpay',
    min: 0,
    description: 'Monpay',
    className: 'hideMobile',
    logo: 'https://qpay.mn/q/logo/monpay.png',
  },
  {
    code: 'mcredit',
    name: 'M Credit',
    description: 'M Credit',
    logo: 'https://cdn.portal.mn/uploads/345b9600-0432-4843-a1a2-c022ad080227.jpeg',
  },
  {
    code: 'pocket',
    name: 'Pocket',
    min: 49999,
    description: 'Pocket',
    logo: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/11/46/41/114641ef-0be1-4097-89a6-3f296fd45d21/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/230x0w.webp',
  },
  {
    min: 99999,
    code: 'storepay',
    name: 'Storepay',
    description: 'Storepay',
    logo: 'https://cdn.portal.mn/uploads/bbe56973-7d72-4248-bc87-120b1e048a48.webp',
  },
];
