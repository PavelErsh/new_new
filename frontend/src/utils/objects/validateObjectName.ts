import { RuleObject } from "antd/lib/form";

const validateObjectName = (_: RuleObject, value: string) => {
  const forbiddenCharacters = /[<>:"/\\|?*]/;
  if (!value || value.length === 0) {
    return Promise.reject(
      new Error("Поле наименование обязательно для заполнения")
    );
  }
  if (forbiddenCharacters.test(value)) {
    return Promise.reject(
      new Error('Имя не должно содержать недопустимые символы: <>:"/\\|?*')
    );
  }
  if (value.length > 256) {
    return Promise.reject(new Error("Максимально 256 символов"));
  }
  return Promise.resolve();
};

export default validateObjectName;
