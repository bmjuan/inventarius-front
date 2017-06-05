export class Item {
  constructor(
    public name: string,
    public type: number,
    public location: string,
    public description?: string,
    public expireDate?: Date,
    public quantity?: number,
    public id?: string,
    public size?: number,
    public typeLiteral?: string
  ) {  }
}
