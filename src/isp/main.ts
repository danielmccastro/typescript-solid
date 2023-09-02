/* interface segregation principle (principio da segregacao de interface) -
os clientes nao devem ser forcados a depender de protocolos (protocolos: membros das classes abstratas, type, interfaces) que nao utilizam
 */
import { Messaging } from './services/messaging';
import { Order } from './entities/order';
import { Persistency } from './services/persistency';
import { Product } from './entities/product';
import { ShoppingCart } from './entities/shopping-cart';
import {
  NoDiscount,
  /* FiftyPercentDiscount, TenPercentDiscount,*/
} from './entities/discount';
import {
  EnterpriseCustomer /* IndividualCustomer */,
} from './entities/customer';

// const fiftyPercentDiscount = new FiftyPercentDiscount();
// const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
/* const individualCustomer = new IndividualCustomer(
  'Luiz',
  'Miranda',
  '111.111.111-11',
); */
const entrerpriseCustomer = new EnterpriseCustomer('Empresa', '22.060/0001-11');
const order = new Order(
  shoppingCart,
  messaging,
  persistency,
  entrerpriseCustomer,
);

shoppingCart.addItem(new Product('Camiseta', 49.9));
shoppingCart.addItem(new Product('Caderno', 9.9));
shoppingCart.addItem(new Product('Lapis', 1.9));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
