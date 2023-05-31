const setErrorLocalization = (err) => {
  if (
    err instanceof TypeError &&
    err.message.includes('Cannot read properties of undefined')
  ) {
    return 'Отсутствует связь с сервером, проверьте подключение к интернету';
  }

  return err.message;
  
};

export default setErrorLocalization;