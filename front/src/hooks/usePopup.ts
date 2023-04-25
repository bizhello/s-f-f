import { useCallback, useState } from 'react';

interface IUsePopup {
  isOpenPopup: boolean;
  togglePopup: () => void;
}

const usePopup = (): IUsePopup => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const togglePopup = useCallback(() => {
    setIsOpenPopup((prev) => !prev);
  }, []);

  return { isOpenPopup, togglePopup };
};

export default usePopup;
