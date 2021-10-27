import { Fragment, useContext, useState } from 'react';

import useInput from '../../hooks/use-input';

import CartContext from '../../store/cart-context';
import classes from './OrderForm.module.css';

const OrderForm = (props) => {
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const cartCtx = useContext(CartContext);

  const { value: enteredName, valueChangeHandler: nameChangeHandler, canSubmit: canSubmitName, inputBlurHandler: nameBlurHandler, reset: resetNameInput, } = useInput();
  const { value: enteredEmail, valueChangeHandler: emailChangeHandler, canSubmit: canSubmitEmail, inputBlurHandler: emailBlurHandler, reset: resetEmailInput, } = useInput();
  const { value: enteredStreet, valueChangeHandler: streetChangeHandler, canSubmit: canSubmitStreet, inputBlurHandler: streetBlurHandler, reset: resetStreetInput, } = useInput();
  const { value: enteredTown, valueChangeHandler: townChangeHandler, canSubmit: canSubmitTown, inputBlurHandler: townBlurHandler, reset: resetTownInput, } = useInput();
  const { value: enteredPostcode, valueChangeHandler: postcodeChangeHandler, canSubmit: canSubmitPostcode, inputBlurHandler: postcodeBlurHandler, reset: resetPostcodeInput, } = useInput();
  const { value: enteredPhoneNumber, valueChangeHandler: phoneNumberChangeHandler, canSubmit: canSubmitPhoneNumber, inputBlurHandler: phoneNumberBlurHandler, reset: resetPhoneNumberInput, } = useInput();

  const canSubmitForm = canSubmitName && canSubmitEmail && canSubmitStreet && canSubmitTown && canSubmitPostcode && canSubmitPhoneNumber;

  const resetForm = () => {
    resetNameInput();
    resetEmailInput();
    resetStreetInput();
    resetTownInput();
    resetPostcodeInput();
    resetPhoneNumberInput()
  };

  const onOrderHandler = async (event) => {
    event.preventDefault();
    setFormErrorMessage('');

    const meals = () => {
      return cartCtx.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          quantity: item.amount,
          price: item.price,
        }
      });
    };

    const order = {
      name: enteredName,
      email: enteredEmail,
      street: enteredStreet,
      town: enteredTown,
      postcode: enteredPostcode,
      phoneNumber: enteredPhoneNumber,
      meals: meals(),
    };

    try {
      const response = await fetch('https://react-http-94026-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('You gone done fucked up');
      }
    } catch (error) {
      setFormErrorMessage(error.message);
    };

    resetForm();
  };

  return (
    <Fragment>
      {formErrorMessage && <div>{formErrorMessage}</div>}
      <form>
        <div className={classes['control-group']}>
          <div className={classes['form-control']}>
            <label htmlFor='name'>Your name</label>
            <input id='name' type='text' value={enteredName} onChange={nameChangeHandler} onBlur={nameBlurHandler} />
          </div>
          <div className={classes['form-control']}>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
          </div>
        </div>
        <div className={classes['control-group']}>
          <div className={classes['form-control']}>
            <label htmlFor='street'>Street</label>
            <input id='street' type='text' value={enteredStreet} onChange={streetChangeHandler} onBlur={streetBlurHandler} />
          </div>
          <div className={classes['form-control']}>
            <label htmlFor='town'>Town</label>
            <input id='town' type='text' value={enteredTown} onChange={townChangeHandler} onBlur={townBlurHandler} />
          </div>
        </div>
        <div className={classes['control-group']}>
          <div className={classes['form-control']}>
            <label htmlFor='postcode'>Postcode</label>
            <input id='postcode' type='text' value={enteredPostcode} onChange={postcodeChangeHandler} onBlur={postcodeBlurHandler} />
          </div>
          <div className={classes['form-control']}>
            <label htmlFor='phone-number'>Phone number</label>
            <input id='phone-number' type='number' value={enteredPhoneNumber} onChange={phoneNumberChangeHandler} onBlur={phoneNumberBlurHandler} />
          </div>
        </div>

        <div className={classes['form-actions']}>
          <button onClick={props.onBack}>Back</button>
          <button className={classes['button--alt']} onClick={onOrderHandler} disabled={!canSubmitForm}>Order</button>
        </div>
      </form>
    </Fragment>
  );
};

export default OrderForm;
