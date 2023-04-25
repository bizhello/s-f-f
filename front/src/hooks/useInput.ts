/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";

import IValidations from "../common/interfaces/IValidations";
import useValidation, { IUseValidation } from "./useValidation";



interface IUseInput extends IUseValidation{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  isDirty: boolean;
}

const useInput = (initialValue: string, validations: IValidations): IUseInput => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setDirty(false)
  }
  const onBlur = () => {
    setDirty(true)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return {
    ...valid,
    value,
    onChange,
    onBlur,
    isDirty,
  }

}

export default useInput;
