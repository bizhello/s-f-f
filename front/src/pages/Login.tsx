/* eslint-disable prettier/prettier */
import React, { FC, useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ILoginReq } from "../common/interfaces/IAuth";
import IError from "../common/interfaces/IError";
import useInput from "../hooks/useInput";
import AuthService from "../services/AuthService";
import WithoutAuth from "../components/HOC/WithoutAuth";

const Login: FC = () => {
  const navigate = useNavigate()
  const emailInput = useInput('', { isEmpty: true, isEmail: true });
  const passwordInput = useInput('', { isEmpty: true, minLength: 4, maxLength: 30 });
  const [isClosePassword, setIsClosePassword] = useState<boolean>(true);
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);

  const [formValue, setFormValue] = useState<ILoginReq>({
    email: emailInput.value,
    password: passwordInput.value,
    remember: isRememberMe,
  })

  useEffect(() => {
    if (emailInput.value !== formValue.email) {
      setFormValue({ ...formValue, email: emailInput.value })
    }
    if (passwordInput.value !== formValue.password) {
      setFormValue({ ...formValue, password: passwordInput.value })
    }
    if (isRememberMe !== formValue.remember) {
      setFormValue({ ...formValue, remember: isRememberMe })
    }
  }, [emailInput.value, passwordInput.value, isRememberMe, formValue])

  const onSubmit = useCallback(async (formData: ILoginReq): Promise<void> => {
    try {
      const response = await AuthService.login(formData);
      localStorage.setItem('access-token', response.accessToken);
      navigate("../");
    } catch (error) {
      const myError = error as IError;
      toast(myError.message);
    }
  }, [])

  const isValidForm = emailInput.isInputValid === true && passwordInput.isInputValid === true

  return (
    <WithoutAuth>
      <main className="auth">
        <form className="auth__form" autoComplete="off">
          <h3 className='auth__title'>Вход в систему</h3>
          <div className="auth__group">
            <input type='email' name='email' id='login__email' className="auth__input" autoComplete="current-password webauthn" value={emailInput.value} onBlur={emailInput.onBlur} onChange={(e) => emailInput.onChange(e)} />
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
              <input type='checkbox' id='option__open' className="auth__checkbox" checked={!isClosePassword} onChange={() => setIsClosePassword(prev => !prev)} />
              <label className="auth__checkbox-label" htmlFor='option__open'>Показать пароль</label>
            </div>
            <div className="options__group">
              <input type='checkbox' id='option__save' className="auth__checkbox" checked={isRememberMe} onChange={() => setIsRememberMe(prev => !prev)} />
              <label className="auth__checkbox-label" htmlFor='option__save'>Запомнить меня</label>
            </div>
          </div>
          <button disabled={!isValidForm} className="auth__button" type='button' onClick={() => onSubmit(formValue)}>Войди</button>
          <NavLink className="option__forgot" to="../register">У меня еще нет акаунта</NavLink>
        </form>
      </main>
    </WithoutAuth>
  );
}

export default Login;
