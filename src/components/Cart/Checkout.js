import classes from "./Checkout.module.css";
import { useRef, useState } from "react";
import { Modal } from "../UI/Modal";

const isEmpty = (value) => value.trim() === "";

const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredstreet = streetInputRef.current.value;
    const enteredpostalCode = postalCodeInputRef.current.value;
    const enteredcity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredstreet);
    const enteredpostalCodeIsValid = isFiveChars(enteredpostalCode);
    const enteredCityIsValid = !isEmpty(enteredcity);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredpostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredpostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name:enteredName,
      street:enteredstreet,
      city:enteredcity,
      postalCode:enteredpostalCode
    })
  };

  const nameControlclasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetControlclasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlclasses = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlclasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
 
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlclasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlclasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a Street name</p>}
      </div>
      <div className={postalCodeControlclasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && <p>Please enter valid postalCode </p>}

      </div>
      <div className={cityControlclasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancle}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
   
  );
};

export default Checkout;
