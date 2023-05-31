const setErrorLocalization = (err) => {
  if (
    err instanceof TypeError &&
    err.message.includes('Cannot read properties of undefined')
  ) {
    return 'Ошибка: Невозможно прочитать свойства, отсутствует связь с сервером';
  }

  // Добавьте другие локализации ошибок по необходимости

  // Если локализация не найдена, верните исходное сообщение об ошибке
  return err.message;
};

export default setErrorLocalization;