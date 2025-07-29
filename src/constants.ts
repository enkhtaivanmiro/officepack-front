export const LOCALES: Record<string, string> = {
  mn: 'MN',
  en: 'ENG',
};

export enum PublicBankType {
  ARIG = 'ARIG',
  BOGD = 'BOGD',
  GOLOMT = 'GOLOMT',
  CAPITAL = 'CAPITAL',
  CAPITRON = 'CAPITRON',
  TEEVER_HOGJIL = 'TEEVER_HOGJIL',
  TOR = 'TOR',
  TORIIN_SAN = 'TORIIN_SAN',
  KHAN = 'KHAN',
  TDB = 'TDB',
  KHAS = 'KHAS',
  CHINGIS = 'CHINGIS',
}

export const banks = [
  {
    value: PublicBankType.ARIG,
    label: 'Ариг банк',
  },
  {
    value: PublicBankType.BOGD,
    label: 'Богд банк',
  },
  {
    value: PublicBankType.GOLOMT,
    label: 'Голомт банк',
  },
  {
    value: PublicBankType.CAPITAL,
    label: 'Капитал банк',
  },
  {
    value: PublicBankType.CAPITRON,
    label: 'Капитрон банк',
  },
  {
    value: PublicBankType.TEEVER_HOGJIL,
    label: 'Тээвэр хөгжилийн банк',
  },
  {
    value: PublicBankType.TOR,
    label: 'Төрийн банк',
  },
  {
    value: PublicBankType.TORIIN_SAN,
    label: 'Төрийн сан',
  },
  {
    value: PublicBankType.KHAN,
    label: 'Хаан банк',
  },
  {
    value: PublicBankType.TDB,
    label: 'Худалдаа хөгжилийн банк',
  },
  {
    value: PublicBankType.KHAS,
    label: 'Хас банк',
  },
  {
    value: PublicBankType.CHINGIS,
    label: 'Чингис хаан банк',
  },
];

export const bankMap: Record<PublicBankType, string> = {
  [PublicBankType.ARIG]: 'Ариг банк',
  [PublicBankType.BOGD]: 'Богд банк',

  [PublicBankType.GOLOMT]: 'Голомт банк',
  [PublicBankType.CAPITAL]: 'Капитал банк',

  [PublicBankType.CAPITRON]: 'Капитрон банк',

  [PublicBankType.TEEVER_HOGJIL]: 'Тээвэр хөгжилийн банк',

  [PublicBankType.TOR]: 'Төрийн банк',

  [PublicBankType.TORIIN_SAN]: 'Төрийн сан',

  [PublicBankType.KHAN]: 'Хаан банк',

  [PublicBankType.TDB]: 'Худалдаа хөгжилийн банк',

  [PublicBankType.KHAS]: 'Хас банк',

  [PublicBankType.CHINGIS]: 'Чингис хаан банк',
};
