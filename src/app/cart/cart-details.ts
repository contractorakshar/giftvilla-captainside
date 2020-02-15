import { productdisplay } from '../productdisplay';

export class CartDetails {
  public constructor(
    public Product: productdisplay,
    public Quantuty: number,
    public SubTotal: number,
  ) { }
}
