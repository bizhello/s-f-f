import { NavLink } from 'react-router-dom';

const MenuPopup = () => {
    return (
        <div className='menu'>
            <div className='menu__box'>
                <ul className='menu__group'>
                    <li className='menu__list'>
                        <NavLink className='menu__nav' to={'/'} exact >Полки</NavLink>
                    </li>
                    <li className='menu__list'>
                        <NavLink className='menu__nav' to={'/'} exact >Чат сотрудников</NavLink>
                    </li>
                </ul>
                <div></div>

            </div>
        </div>);
}

export default MenuPopup;