import { Amortization } from "./amortization";


export class AmortizationDetail {
  idDetail!: number;
  periode!: number;
  date!: Date;
  startAmount!: number;
  intrest!: number;
  amrt!: number;
  annuity!: number;
  frais!: number;
  agio!: number;
  amortization?: Amortization;
}