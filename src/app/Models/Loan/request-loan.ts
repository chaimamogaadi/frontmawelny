import { OfferLoan } from './offer-loan';
import { Amortization } from './amortization';

export class RequestLoan{
  requestId!: number;
  reqDate!: Date;
  loanAmnt!: number;
  nbrMonth!: number;
  nbrYears!: number;
  garantorFile!: any;
  fileName!: string;
  status!: StatLoan;
  typeAmrt!: TypeAmort;
  offerLoan?: OfferLoan;
  amortization?: Amortization;
}

export enum TypeAmort {
  CONST_ANNUITY = 'CONST_ANNUITY',
  CONST_AMORTIZATION = 'CONST_AMORTIZATION',
  LOAN_PER_BLOC = 'LOAN_PER_BLOC',
  CONST_MONTHLY = 'CONST_MONTHLY',
}

export enum StatLoan {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}