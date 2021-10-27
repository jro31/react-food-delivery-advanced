import { useState } from 'react';

import Modal from '../UI/Modal';
import CartContent from './CartContent';
import OrderForm from './OrderForm';

const Cart = (props) => {
  const [modalContentName, setModalContentName] = useState('cart');

  const confirmMealsHandler = () => {
    setModalContentName('orderForm');
  };

  const backToCartHandler = () => {
    setModalContentName('cart');
  };

  const modalContent = () => {
    if (modalContentName === 'cart') return <CartContent onConfirm={confirmMealsHandler} onClose={props.onClose} />;
    if (modalContentName === 'orderForm') return <OrderForm onBack={backToCartHandler} />;
  };

  return (
    <Modal onClose={props.onClose}>
      {modalContent()}
    </Modal>
  );
};

export default Cart;
