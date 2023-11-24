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

export type ExtendedCurrency = Currency & {
  borderColor: string;
  textColor: string;
};