export class productdisplay {
  public constructor(public  pro_id:number,
      public pro_name:string,
      public pro_price:number,
      public pro_qty:number,
      public pro_mfg:string,
      public pro_img:string,
      public pro_info:string,
      public fk_cat_id?:number,
      public cat_id?:number,
      public cat_name?:string
  ){ }
}
