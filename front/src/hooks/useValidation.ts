/* eslint-disable no-loops/no-loops */

/* eslint-disable no-restricted-syntax */

/* eslint-disable guard-for-in */

/* eslint-disable no-unused-expressions */

/* eslint-disable no-case-declarations */

/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useState } from "react";

import IValidations from "../common/interfaces/IValidations";

interface IUseValidation {
  errorArray: string[];
  isInputValid: boolean;
}

export type { IUseValidation }

const useValidation = (value: string, validations: IValidations): IUseValidation => {

  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [isMinLengthError, setMinLengthError] = useState<boolean>(false);
  const [isMaxLengthError, setMaxLengthError] = useState<boolean>(false);
  const [isEmailError, setEmailError] = useState<boolean>(false);
  const [isInputValid, setInputValid] = useState<boolean>(false);

  const errorArray: string[] = useMemo(() => {
    const array = []
    if (isEmpty) {
      array.push('Это поле не может быть пустым')
    }
    if (isMinLengthError) {
      array.push(`Минимальная длина символов - ${validations.minLength}`)
    }
    if (isMaxLengthError) {
      array.push(`Максимальная длина символов - ${validations.maxLength}`)
    }
    if (isEmailError) {
      array.push('Email не корректен')
    }

    return array;
  }, [isEmpty, isMinLengthError, isMaxLengthError, isEmailError, validations.minLength, validations.maxLength])

  useEffect(() => {
    if (value) {
      for (const validation in validations) {
        switch (validation) {
          case 'minLength':
            if (validations.minLength) {
              value.length < validations.minLength ? setMinLengthError(true) : setMinLengthError(false);
              break;
            }
            break;
          case 'maxLength':
            if (validations.maxLength) {
              value.length > validations.maxLength ? setMaxLengthError(true) : setMaxLengthError(false);
              break;
            }
            break;
          case 'isEmpty':
            setEmpty(false)
            break;
          case 'isEmail':
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
            break;
          default:
          // do nothing: 
        }
      }
    } else {
      setEmpty(true);
    }

  }, [validations, value])

  useEffect(() => {
    if (isEmpty || isMinLengthError || isMaxLengthError || isEmailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, isMinLengthError, isMaxLengthError, isEmailError])

  return {
    errorArray,
    isInputValid,
  }
}

export default useValidation;
