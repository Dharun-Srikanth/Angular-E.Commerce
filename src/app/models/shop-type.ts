export interface ShopType {
    id:number,
    name:string,
    img:string,
    desc:string,
    price:number
}

export interface CartType {
    id:number,
    name:string,
    img:string,
    desc:string,
    price:number,
    count:number
}

export interface UserType {
    id?: number,
    email: string,
    pass: string,
    cPass?: string,
    cart:CartType[]
}