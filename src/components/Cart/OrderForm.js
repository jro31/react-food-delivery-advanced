import classes from './OrderForm.module.css';

const OrderForm = (props) => {
  const onOrderHandler = (event) => {
    event.preventDefault();

    console.log('WTF?')
  };

  return (
    <form>
      <div className={classes['control-group']}>
        <div className={classes['form-control']}>
          <label htmlFor='name'>Your name</label>
          <input id='name' type='text' />
        </div>
        <div className={classes['form-control']}>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' />
        </div>
      </div>
      <div className={classes['control-group']}>
        <div className={classes['form-control']}>
          <label htmlFor='street'>Street</label>
          <input id='street' type='text' />
        </div>
        <div className={classes['form-control']}>
          <label htmlFor='town'>Town</label>
          <input id='town' type='text' />
        </div>
      </div>
      <div className={classes['control-group']}>
        <div className={classes['form-control']}>
          <label htmlFor='postcode'>Postcode</label>
          <input id='postcode' type='text' />
        </div>
        <div className={classes['form-control']}>
          <label htmlFor='phone-number'>Phone number</label>
          <input id='phone-number' type='number' />
        </div>
      </div>

      <div className={classes['form-actions']}>
        <button onClick={props.onBack}>Back</button>
        <button className={classes['button--alt']} onClick={onOrderHandler}>Order</button>
      </div>
    </form>
  );
};

export default OrderForm;
