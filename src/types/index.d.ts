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
export type ExtendedCurrency = Currency & {
  borderColor: string;
  textColor: string;
};

export type FromToCurrency = {
  fromCurrency: Currency;
  toCurrency: Currency;
  direction: boolean;
}