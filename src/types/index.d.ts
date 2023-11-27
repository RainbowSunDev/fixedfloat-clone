// Define a type for the currency object
export type Currency = {
  code: string;
  coin: string;
  network: string;
  name: string;
  recv: boolean;
  send: boolean;
  tag: null | string;
  logo: string;
  color: string;
  priority: string;
};

export type AvailableCurrencies = {
  code: number;
  msg: string;
  data: Currency[];
};

export type FromToCurrency = {
  fromCurrency: Currency;
  toCurrency: Currency;
  direction: boolean;
}
export type ExchangeRateRequestData = {
  type: string;
  fromCcy: string;
  toCcy: string;
  direction: string;
  amount: number;
  ccies?: boolean;
  usd?: boolean;
  refcode?: string;
  afftax?: number;
}
export type ExchangeError =
  | "MAINTENANCE_FROM"
  | "MAINTENANCE_TO"
  | "OFFLINE_FROM"
  | "OFFLINE_TO"
  | "RESERVE_FROM"
  | "RESERVE_TO"
  | "LIMIT_MIN"
  | "LIMIT_MAX";

export type ExchangeRateResponseData = {
  code: number;
  msg: string;
  data: {
    from: CurrencyDetail;
    to:CurrencyDetail;
    errors?: ExchangeError[]; // Use the ExchangeError union type here
    ccies: {
      code: string;
      recv: boolean;
      send: boolean;
    }[];
  };
};

export type CurrencyDetail = {
  code: string;
  network: string;
  coin: string;
  amount: string;
  rate: string;
  precision: number;
  min: string;
  max: string;
  usd: string;
}

export type CreateOrderRequestData = {
  type: string;
  fromCcy: string;
  toCcy: string;
  direction: string;
  amount: number;
  toAddress: string;
  tag?: boolean;
  refcode?: string;
  afftax?: number;
}

export type OrderStatus =
  | "NEW"
  | "PENDING"
  | "EXCHANGE"
  | "WITHDRAW"
  | "DONE"
  | "EXPIRED"
  | "EMERGENCY";

type Transaction = {
  id: string;
  amount: string;
  fee: string;
  ccyfee: string;
  timeReg: number;
  timeBlock: number;
  confirmations: number;
};
type CurrencyDetails = {
  code: string;
  coin: string;
  network: string;
  name: string;
  alias: string;
  amount: string;
  address: string;
  tag?: string;
  addressMix?: string;
  reqConfirmations?: number;
  maxConfirmations?: number;
  tx?: Transaction;
};
type TimeDetails = {
  reg: number;
  start: number;
  finish: number;
  update: number;
  expiration: number;
  left: number;
};

type EmergencyDetails = {
  status: string[];
  choice: string;
  repeat: boolean;
};

export type CreateOrderResponse = {
  code: number;
  msg: string;
  data: {
    token: string;
    id: string;
    type: string;
    email: string;
    status: string;
    time: TimeDetails;
    from: CurrencyDetails;
    to: CurrencyDetails;
    back?: CurrencyDetails;
    emergency?: EmergencyDetails;
  };
};