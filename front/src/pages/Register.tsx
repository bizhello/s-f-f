/* eslint-disable prettier/prettier */
import React, { FC, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { IRegistryReq } from "../common/interfaces/IAuth";
import IError from "../common/interfaces/IError";
import useInput from "../hooks/useInput";
import AuthService from "../services/AuthService";
import WithoutAuth from "../components/HOC/WithoutAuth";

const Register: FC = () => {

  const navigate = useNavigate();

  const emailInput = useInput('', { isEmpty: true, isEmail: true });
  const passwordInput = useInput('', { isEmpty: true, minLength: 4, maxLength: 30 });
  const firstName = useInput('', { isEmpty: true, minLength: 2, maxLength: 30 });
  const lastName = useInput('', { isEmpty: true, minLength: 2, maxLength: 30 });

  const [formValue, setFormValue] = useState<IRegistryReq>({
    email: emailInput.value,
    password: passwordInput.value,
    firstName: firstName.value,
    lastName: lastName.value,
  })

  const [isClosePassword, setIsClosePassword] = useState<boolean>(true);

  useEffect(() => {
    if (emailInput.value !== formValue.email) {
      setFormValue({ ...formValue, email: emailInput.value })
    }
    if (passwordInput.value !== formValue.password) {
      setFormValue({ ...formValue, password: passwordInput.value })
    }
    if (firstName.value !== formValue.firstName) {
      setFormValue({ ...formValue, firstName: firstName.value })
    }
    if (lastName.value !== formValue.lastName) {
      setFormValue({ ...formValue, lastName: lastName.value })
    }
  }, [emailInput.value, passwordInput.value, firstName.value, lastName.value, formValue])

  const onSubmit = async (formData: IRegistryReq): Promise<void> => {
    try {
      await AuthService.register(formData);
      navigate("../login");
    } catch (error) {
      const myError = error as IError;
      toast(myError.message);
    }
  }
  const isValidForm = emailInput.isInputValid === true && passwordInput.isInputValid === true && firstName.isInputValid === true && lastName.isInputValid === true

  return (
    <WithoutAuth>
      <main className="auth">
        <form className="auth__form" autoComplete="off">
          <h3 className='auth__title'>Регистрация</h3>
          <div className="auth__group">
            <input type='text' name='firstName' id='register__firstName' className="auth__input" autoComplete='off' value={firstName.value} onBlur={firstName.onBlur} onChange={(e) => firstName.onChange(e)} />
            <label htmlFor='register__firstName' className={firstName.value ? 'auth__label auth__label-filled' : "auth__label auth__label-empty"}>Имя</label>
            {firstName.isDirty && firstName.errorArray.length > 0 && <span className="auth__error">{firstName.errorArray[0]}</span>}
          </div>
          <div className="auth__group">
            <input type='text' name='lastName' id='register__lastName' className="auth__input" autoComplete='off' value={lastName.value} onBlur={lastName.onBlur} onChange={(e) => lastName.onChange(e)} />
            <label htmlFor='register__lastName' className={lastName.value ? 'auth__label auth__label-filled' : "auth__label auth__label-empty"}>Фамилия</label>
            {lastName.isDirty && lastName.errorArray.length > 0 && <span className="auth__error">{lastName.errorArray[0]}</span>}
          </div>
          <div className="auth__group">
            <input type='email' name='email' id='login__email' className="auth__input " autoComplete='off' value={emailInput.value} onBlur={emailInput.onBlur} onChange={(e) => emailInput.onChange(e)} />
            <label htmlFor='login__email' className={emailInput.value ? 'auth__label auth__label-filled' : "auth__label auth__label-empty"}>E-mail</label>
            {emailInput.isDirty && emailInput.errorArray.length > 0 && <span className="auth__error">{emailInput.errorArray[0]}</span>}
          </div>
          <div className="auth__group">
            <input name='password' type={isClosePassword ? 'password' : 'text'} id='login__password' className="auth__input" autoComplete="current-password webauthn" value={passwordInput.value} onBlur={passwordInput.onBlur} onChange={(e) => passwordInput.onChange(e)} />
            <label htmlFor='login__password' className={passwordInput.value ? 'auth__label auth__label-filled' : "auth__label auth__label-empty"} >Пароль</label>
            {passwordInput.isDirty && passwordInput.errorArray.length > 0 && <span className="auth__error">{passwordInput.errorArray[0]}</span>}
          </div>
          <div className="auth__options">
            <div className="options__group" >
              <input type='checkbox' id='option__open' className="auth__checkbox" checked={!isClosePassword} onChange={() => setIsClosePassword(!isClosePassword)} />
              <label className="auth__checkbox-label" htmlFor='option__open'>Показать пароль</label>
            </div>
          </div>
          <button disabled={!isValidForm} type='button' className="auth__button" onClick={() => onSubmit(formValue)}>Зарегистрироваться</button>
          <NavLink className="option__forgot" to="../login">У меня уже есть акаунт</NavLink>
        </form>
      </main>
    </WithoutAuth>
  );
}

export default Register;
