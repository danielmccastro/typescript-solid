/* modulos de alto nivel nao devem depender de modulos de baixo nivel. ambos devem depender de abstracoes.
dependa de abstracoes, nao de implementacoes.
abstracoes nao devem depender de detalhes. detalhes devem depender de abstracoes.

classes de baixo nivel sao clases que executam tarefas (os detalhes)
classes de alto nivel sao classes que gerenciam as classes de baixo nivel b
 */
// import { Messaging } from './services/messaging';
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
import { MessagingProtocol } from './entities/interfaces/messaging-protocol';

// const fiftyPercentDiscount = new FiftyPercentDiscount();
// const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
/* const messaging = new Messaging();*/
const persistency = new Persistency();
/* const individualCustomer = new IndividualCustomer(
  'Luiz',
  'Miranda',
  '111.111.111-11',
); */
const entrerpriseCustomer = new EnterpriseCustomer('Empresa', '22.060/0001-11');

class MessagingMock implements MessagingProtocol {
  sendMessage(): void {
    console.log('A mensagem foi enviada pelo MOCK');
  }
}

const messagingMock = new MessagingMock();

const order = new Order(
  shoppingCart,
  messagingMock,
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
