export type PriceType = { amount: number | string; currency?: string };

export type TicketStatusType = 'listed' | 'not_listed' | 'on_hold';

export interface ErrorType {
  code: string;
  message: string;
}

export interface EBarimtReceiver {
  name: string;
  register: string;
}

export interface EventType {
  _id: string;
  name: string;
  type: string[];
  tags: string[];
  description: any[];
  description_en?: any[];
  cover_image: string;
  cover_image_v: string;
  genre: string[];
  startDate: string;
  endDate: string;
  parentId?: string;
  customUrl?: string;
  slug?: string;
  ebarimt: any[];
  collaboratedBy: CollaborateType[];
  acceptablePaymentMethods: string[];
  location: {
    name: string;
    link?: string;
    description: string;
    hall_plan?: string;
    latitude: number;
    longitude: number;
  };
  sponsoredBy: SponsorType[];
  duration: {
    day: number;
    hour: number;
    min: number;
  };
  seatInfo?: {
    name?: string;
    description?: string;
    name_en?: string;
    description_en?: string;
  };
  nftTicketMeta?: {
    name: string;
    sellPrice: PriceType;
  };
  ticketTemplates: Array<TicketTemplateStandartType | TicketTemplateVIPType>;
  nftOptions?: Array<{ id: string; nftIds: string[] }>;
  useNft?: {
    templateId: string;
    templateName: string;
    collectionName: string;
    sellPrice: PriceType;
    options: UseNFTOptionType[];
  };
}

export interface UseNFTOptionType {
  id: string;
  ticket_cnt: number;
  isCollection: boolean;
  requiredNFTs: string[];
}

export type SponsorType = {
  _id: string;
  userId: {
    _id: string;
    username: string;
    profile_image: string;
    display_name: string;
  };
  eventId: string;
  role: string;
  id: string;
};

export type CollaborateType = {
  _id: string;
  userId: {
    _id: string;
    username: string;
    profile_image: string;
    display_name: string;
  };
  eventId: string;
  role: string;
  id: string;
};

export type TicketTemplateStandartType = {
  _id: string;
  seats?: number;
  type: 'standart';
  isSeat: boolean;
  name: string;
  isHighDemand: boolean;
  description: string;
  description_en: string;
  startDate: string;
  endDate?: string;
  sellPrice: {
    amount: number;
    currency: 'mnt' | 'usd';
  };
  actualPrice?: {
    amount: number;
    currency: 'mnt' | 'usd';
  };
  hideSoldNumber: string[];
  total: number;
  sold_cnt: number;
  on_hold_cnt: number;
  sold: [];
  on_hold: [];
  acceptablePaymentMethods?: string[];
};

export type TicketTemplateVIPType = {
  _id: string;
  type: 'vip';
  seats?: string[];
  name: string;
  name_en: string;
  color?: string;
  isHighDemand: boolean;
  description: string;
  description_en: string;
  isSeat: boolean;
  seat_cnt?: number;
  startDate: string;
  endDate?: string;
  sellPrice: {
    amount: number;
    currency: 'mnt' | 'usd';
  };
  actualPrice?: {
    amount: number;
    currency: 'mnt' | 'usd';
  };
  total: number;
  seatIds: [];
  sold: string[];
  on_hold: string[];
  sold_cnt: 0;
  on_hold_cnt: 0;
  acceptablePaymentMethods?: string[];
};

export enum InvoiceStatusEnum {
  FAILED = 'failed',
  SUCCESS = 'success',
  PENDING = 'pending',
  EXPIRED = 'expired',
}

export type EventMetaType = {
  _id: string;
  name: string;
  cover_image: string;
  cover_image_v: string;
  startDate: string;
  location: {
    name: string;
    description?: string;
    link?: string;
  };
};

export interface UserType {
  _id: string;
  tickets: TicketType[];
  eventMetas: EventMetaType[];
}

export interface TicketType {
  _id: string;
  id: string;
  name?: string;
  eventId: string;
  ownerId: string;
  qrText: string;
  startDate: string;
  type: 'vip' | 'standart';
  seatId?: string;
  isUsed?: boolean;
  isDivided?: boolean;
  status: TicketStatusType;
  templateId: {
    _id: string;
    name: string;
    name_en?: string;
    id: string;
    seat_cnt?: number;
  };
}

export interface ProfileType {
  _id: string;
  username: string;
  isArtist: boolean;
  profile_image: string;
  cover_image: string;
  display_name: string;
  socials: SocialType[];
  descriptions: UserDescriptionType[];
  createdEvents: VisualEventsType[];
  collaboratedEvents: VisualEventsType[];
  sponsoredEvents: VisualEventsType[];
}

export type UserDescriptionType = {
  image: string;
  title: string;
  description: string;
};

export type SocialType = {
  type: string;
  link: string;
};

export type VisualEventsType = {
  id: string;
  _id: string;
  userId: string;
  role: string;
  eventId: EventVisualType;
};

export type EventVisualType = {
  _id: string;
  name: string;
  description: string;
  cover_image: string;
  startDate: string;
  type: string[];
  location: {
    name: string;
    description: string;
    hall_plan: string;
  };
  id: string;
  collaboratedBy: Array<{
    id: string;
    userId: {
      username: string;
      profile_image: string;
    };
  }>;
};

export type PendingInvoiceType = {
  _id: string;
  userId: string;
  invoiceExp: string;
  eventId: {
    _id: string;
    name: string;
    cover_image: string;
    cover_image_v: string;
    startDate: string;
    customUrl?: string;
  };
  amount: number;
  status: InvoiceStatusEnum;
  merch: {
    merchItemId: {
      _id: string;
      attrs: Record<string, string>;
    };
    templateId: {
      _id: string;
      name: string;
      name_en: string;
      imageUrl: string[];
    };
    sellPrice: {
      amount: number;
      currency: string;
    };
    qty: number;
  };
  product: {
    items: [
      {
        qty: number;
        itemId: string;
        sellPrice: PriceType;
        name: string;
        name_en: string;
        image: string;
        eventId?: string;
      },
    ];
    type: 'bar_item' | 'cs_roll';
  };
  ebarimtReceiver?: string;
  phone_number?: string;
  templates?: Array<PendingInvoiceTicketType>;
  method: 'qpay' | 'hipay' | 'monpay' | 'monpayqr' | 'mcredit' | 'socialpay' | 'simple' | 'tdbm';
  paymentResult: {
    link?: string;
    qr_text?: string;
    invoiceId: string;
    deep_link?: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  promo?: string;
};

export type SoldCountType = {
  sold?: string[];
  on_hold?: string[];
  sold_cnt?: number;
  on_hold_cnt?: number;
};

export type SoldCountsType = Record<string, SoldCountType>;

export interface MarketInitDataType {
  templates: MarketInitTicketTemplate[];
  totalUser: number;
  min: number;
  max: number;
}

export type MarketInitTicketTemplate = {
  templateId: string;
  name: string;
  name_en: string;
};

export interface PendingInvoiceTicketType {
  templateId: {
    _id: string;
    type: string;
    name?: string;
    isSeat: boolean;
    sellPrice: PriceType;
    actualPrice?: PriceType;
  };
  sellPrice: PriceType;
  seats: number | string[];
  discount?: number;
}

export type TicketBuyType = Array<{ templateId: string; seats: number | string[] }>;

export interface PromoType {
  _id: string;
  merchants: string[];
  code: string;
  discountType: string;
  discountValue: number;
  expiryDate: string;
  usageLimit: number;
  currentUsage: number;
  eventId?: string;
  templateId?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PaymentMetaEventType {
  _id: string;
  acceptablePaymentMethods: string[];
  ticketTemplates: Array<{
    _id: string;
    acceptablePaymentMethods: string[];
  }>;
}

export type MerchantType = 'LIMITED' | 'OPEN';

export type Option = {
  value: string;
  img?: string;
};

export type Attribute = {
  name: string;
  name_en?: string;
  options: Option[];
};

export type MerchantItemType = {
  _id: string;
  qty: number;
  avail: number;
  merchTemplateId: string;
  sellPrice: {
    amount: number;
    currency: string;
  };
  attrs: Record<string, string>;
  __v: number;
  on_hold: number;
};

export interface SingleMerchantType {
  _id: string;
  name: string;
  name_en?: string;
  type: MerchantType;
  attrs: Attribute[];
  imageUrl: string[];
  items: MerchantItemType[];
  sellPrice: PriceType[];
  tags: string[];
}

export interface MerchantDetailType extends SingleMerchantType {
  endDate: string;
  description: string;
  description_en: string;
  eventId: { _id: string; name: string };
  artists: Array<{
    _id: string;
    username: string;
    profile_image: string;
  }>;
}

export type BufferIdType = { type: 'Buffer'; data: number[] };

export interface BarItemType {
  type: string;
  avail: number;
  id: string;
  image: string;
  name: string;
  name_en: string;
  on_hold: number;
  qty: number;
  sellPrice: PriceType;
  sold: number;
}

export interface BarType {
  items: BarItemType[];
  closeDate: string;
  createdAt: string;
  eventId: string;
  openDate: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface MeBarItemType {
  itemId: BufferIdType;
  name: string;
  name_en: string;
  qty: number;
}

export interface MeBarType {
  _id: string;
  eventId: {
    id: string;
    _id: string;
    name: string;
  };
  ownerId: string;
  barId: string;
  items: MeBarItemType[];
  isUsed: boolean;
  createdAt: string;
  updatedAt: string;
  qrText: string;
  __v: number;
  id: string;
}

export interface MeBarsType {
  baritems: MeBarType[];
  username: string;
  _id: string;
}

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

export interface BankAccountType {
  userId: string;
  accountNumber: number;
  accountName: string;
  bankType: PublicBankType;
  _id: string;
  isVerify: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TicketNftItem {
  _id: string;
  name: string;
  nftTemplate: string;
  nftCollection: string;
  image: string;
  tokenId: string;
}

export interface TicketDetailType {
  _id: string;
  eventId: {
    _id: string;
    name: string;
    cover_image_v: string;
    startDate: string;
    location: {
      hall_plan: string;
    };
  };
  ownerId: {
    _id: string;
    id: string;
    username: string;
  };
  templateId: {
    _id: string;
    name: string;
    name_en: string;
    description: string;
    description_en: string;
    seat_cnt?: number;
  };
  isUsed: boolean;
  isDivided: boolean;
  isSeat: boolean;
  seatId?: string;
  startDate?: string;
  sellPrice: PriceType;
  status: TicketStatusType;
}

export interface TicketListType {
  _id: string;
  sellPrice: PriceType;
  status: TicketStatusType;
  templateId: { name: string; _id: string };
  ownerId: { username: string; _id: string };
  eventId: { cover_image_v: string; _id: string };
}

export interface WalletLogItemType {
  _id: string;
  marketType: string;
  transaction: PriceType;
  type: string;
  eventId: string;
  from: string;
  to: string;
  products: {
    templateId: string;
    seats: number;
  };
  isDeleted: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletBalanceItem {
  _id: string;
  available: number;
  pending: number;
  total: number;
  type: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
