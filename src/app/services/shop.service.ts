import { Injectable } from '@angular/core';
import { CartType, ShopType, UserType } from '../models/shop-type';
import { Router } from '@angular/router';
import { iif } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private products: ShopType[] = [
    {
      id: 1,
      name: 'Asus Rog Phone 7',
      img: 'https://d2xamzlzrdbdbn.cloudfront.net/products/368a9f86-1039-4f1b-8762-af4626d5b01a23081127_416x416.jpg',
      desc: 'The mighty ROG Phone 7 is built without compromises, unleashing the awesome gaming power of the flagship 3.2 GHz Snapdragon ® 8 Gen 2 Mobile Platform',
      price: 74999,
    },
    {
      id: 2,
      name: 'American Tourister Bag',
      img: 'https://www.oyegifts.com/flowers-n-gifts/vendordata/product/gifts-1641.jpg',
      desc: 'American Tourister is a trusted global brand offering high-quality travel products like luggage, backpacks, and accessories',
      price: 2799,
    },
    {
      id: 3,
      name: 'Sony Playstation 5',
      img: 'https://www.pbtech.co.nz/imgprod/G/A/GAMSNY5504__1.jpg',
      desc: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation® games.',
      price: 44990,
    },
    {
      id: 4,
      name: 'Nike Sneaker',
      img: 'https://assets.gqindia.com/photos/63da47eb6efd77bf74eab1dc/1:1/w_949,h_949,c_limit/3525-12D%20TIF%20RGB%20801264-01_SP23_Project212_TM_Shot%2012_038_main.jpg',
      desc: 'Explore a wide range of Nike Shoes online in India at Crazy Shopaholics. Checkout our exclusive collection of Nike Air Max, Jordan, Vapormax',
      price: 14995,
    },
    {
      id: 5,
      name: 'Mens Cotton Jacket',
      img: 'https://5.imimg.com/data5/BV/UY/ZP/SELLER-59756470/mens-cotton-jacket.jpg',
      desc: "Men's Cotton Men Jackets are functional, stylish and comfortable. Meesho brings you an exhaustive collection of Cotton Men Jackets which is sure to turn",
      price: 853,
    },
    {
      id: 6,
      name: 'Mi 3i 20000 PowerBank',
      img: 'https://static1.industrybuying.com/products/it-electronics/mobiles-accessories/power-bank/ITE.POW.621136137_1692972623008.webp',
      desc: 'The mighty ROG Phone 7 is built without compromises, unleashing the awesome gaming power of the flagship 3.2 GHz Snapdragon ® 8 Gen 2 Mobile Platform',
      price: 1999,
    },
    {
      id: 7,
      name: 'Samsung Monitor',
      img: 'https://ccimg.canadacomputers.com/Products/600x600/297/170/112011/28537.jpg',
      desc: "Vivid scenes wrap even more tightly around you. Experience the next level of heart-pounding gaming that's superior to anything you've seen before. The 1000R 49-inch super ultra-wide display fills your peripheral vision and draws you into the character's shoes.",
      price: 121799,
    },
    {
      id: 8,
      name: 'Urban Terrain BOLT',
      img: 'https://www.dealsmagnet.com/images/urban-terrain-bolt-ut5000s27-5-steel-cycle-o-18Gl0pjT.jpg',
      desc: "Urban Terrain Bolt UT5000S27.5 Mountain Bike is the best in the class bike for ultimate riding experience. It is made of high quality, very strong and light steel to maximize durability, performance, and smooth ride.",
      price: 6599,
    },
    {
      id: 9,
      name: 'Teddy Bear',
      img: 'https://assets.flowersnfruits.com/uploads/product-pics/1631950556_blue-teddy.jpg',
      desc: "ts pillowy soft body is perfect for big hugs & cuddling. Made with premium quality polyester materials, you'll be happy you chose this as an I love you teddy ",
      price: 699,
    },
    {
      id: 10,
      name: 'Samsung Watch 4',
      img: 'https://assets.onbuy.com/i6/product/28870437ed0f45bcb8f602e14c968530-m176255002/samsung-galaxy-watch-4-r870-44mm-smart-watch-black-103910549.jpg',
      desc: "Galaxy Watch4 comes with Bioelectrical Impedance Analysis (BIA) that lets you measure body composition. Key health monitoring features include Advanced Sleep Analysis, Health monitoring and enhanced Fitness Tracking.",
      price: 121799,
    },
  ];

  private cart: CartType[] = [];

  private orders: CartType[] = [];

  constructor(private router: Router) {}

  // Products Page
  getAllProducts(): ShopType[] {
    return this.products;
  }

  getAllCart(): CartType[] {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.cart = JSON.parse(localStorage.getItem(user)!);   
    }
    return this.cart;
  }

  getAllOrders(): CartType[] {
    return this.orders;
  }

  getTotalPrice(): number {
    let sum = 0;
    this.cart = this.getAllCart();
    if (this.cart.length > 0)
      for (let prod of this.cart) {
        if (prod.count > 0) sum += prod.price * prod.count;
      }
    return sum;
  }

  cartAdd(id: number): CartType[] {
    const user = sessionStorage.getItem('user');
    const allUsers: UserType[] = JSON.parse(localStorage.getItem('users')!);

    const singleProduct: ShopType = this.products.find((val) => val.id === id)!;
    const index: number = this.cart.findIndex((val) => val.id === id)!;
    if (index !== -1) {
      this.cart[index] = {
        ...this.cart[index],
        count: this.cart[index].count + 1,
      };
    } else {
      this.cart.push({ ...singleProduct, count: 1 });
    }
    if (user) localStorage.setItem(user, JSON.stringify(this.cart));
    return this.cart;
  }

  // Cart Page:
  removeAll(): CartType[] {
    this.cart = [];
    const user = sessionStorage.getItem('user');
    if (user) localStorage.setItem(user, JSON.stringify(this.cart));
    return this.cart;
  }

  remove(id: number): CartType[] {
    const user = sessionStorage.getItem('user');
    const index = this.cart.findIndex((val) => val.id === id);
    this.cart.splice(index, 1);
    if (user) localStorage.setItem(user, JSON.stringify(this.cart));
    return this.cart;
  }

  plus(id: number): CartType[] {
    const user = sessionStorage.getItem('user');
    const index = this.cart.findIndex((val) => val.id === id);
    this.cart[index] = {
      ...this.cart[index],
      count: this.cart[index].count + 1,
    };
    if (user) localStorage.setItem(user!, JSON.stringify(this.cart));
    return this.cart;
  }

  minus(id: number): CartType[] {
    const user = sessionStorage.getItem('user');
    const index = this.cart.findIndex((val) => val.id === id);
    if (this.cart[index].count > 1)
      this.cart[index] = {
        ...this.cart[index],
        count: this.cart[index].count - 1,
      };
    if (user) localStorage.setItem(user, JSON.stringify(this.cart));
    return this.cart;
  }

  checkout(): void {
    const user = sessionStorage.getItem('user');
    this.orders.push(...this.cart);
    this.cart = [];
    if (user){
      localStorage.setItem(user, JSON.stringify(this.cart));
      localStorage.setItem(user+"orders",JSON.stringify(this.orders));
    } 

    this.router.navigate(['/orders']);
  }
}
