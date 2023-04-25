enum TextEnum {
  TITLE = 'SHOP FAMILY',
  SIGN_IN = 'Вход',
  SIGN_UP = 'Регистрация',
  EXPIRATION_DATE = 'Срок годности',
  PRICE = 'Цена',
  DESIGNATION = 'Название товара',
  ADD_PRODUCT = 'Добавить товар',
  COUNT = 'Кол-во товара',
  WELCOME = 'Добро Пожаловать',
  EXIT = 'Выйти',
  INPUT_HOLDER = 'Введите название для поиска товара ...',
  CHOOSE_SORT = 'Выберите вид сортировки',
  DATE_CREATED = 'По дате создания',
  DATE_END = 'По дате окончания срока годностии',
  DATE_MAKE = 'По дате изготовления',
  SORT_BY = 'Сортировать по',
}

enum SortEnum {
  dataCreatedAt = 'По дате создания',
  dataEnd = 'По дате окончания срока годностии',
  dataStart = 'По дате изготовления',
}

enum TextPopupEnum {
  LABEL_FILE = 'Выбрать картинку для товара',
  LABEL_TITLE = 'Название товара',
  LABEL_PRICE = 'Цена товара',
  LABEL_COUNT = 'Кол-во товара',
  SAVE = 'СОХРАНИТЬ',
  CLOSE = 'ЗАКРЫТЬ',
}

enum MessagesEnum {
  EMAIL_IS_BUSY = 'Пользователь с таким email уже существует',
  DATA_IS_NOT_CORRECT = 'Неправильно указан логин и/или пароль',
  EXIT = 'Выход',
  EXIT_REPEAT = 'Вы уже вышли из системы',
  AUTH_ERROR = 'Пользователь не авторизован',
  USER_NOT_FOUND = 'Такого пользователя не существует',
  USER_DELETE = 'Пользователь удален',
  CARD_NOT_FOUND = 'Такой карточки не существует',
  CARD_TITLE_NOT_FOUND = 'Название такой карточки уже существует',
  CARD_DELETE = 'Карточка удалена',
  CORS = 'Not allowed by CORS',
  MIN_COUNT = 'Значение должно быть больше 0',
  TOKEN_NOT_VALID = 'Токен не валидный',
}

enum PathEnum {
  SIGN_UP = '/shop-family/sign-up',
  SIGN_IN = '/shop-family/sign-in',
}

export { MessagesEnum, PathEnum, SortEnum, TextEnum, TextPopupEnum };
