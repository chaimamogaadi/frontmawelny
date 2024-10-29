import { AmortizationDetail } from "./amortization-detail";
import { RequestLoan } from "./request-loan";

export class Amortization {
  idAmt!: number;
  date!: Date;
  periode!: number;
  startAmount!: number;
  intrest!: number;
  amrt!: number;
  annuity!: number;
  frais!: number;
  agio!: number;
  requestloan?: RequestLoan;
  detailAmorts!: AmortizationDetail[];
}