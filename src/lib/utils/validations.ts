// [ ] { } ( ) ? " ! @ # % & / \ , > < ' : ; | _ ~ ` = + -
export const passwordRules = [
  {
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-\+={}\[\]:;<>,.?/~"'|\\`])[A-Za-z\d!@#$%^&*()_\-\+={}\[\]:;<>,.?/~"'|\\`]{8,}$/,
    message: 'Password must be',
  },
  { required: true, message: 'Password must be at least 8 characters long' },
];

export function hasSpecialCharFunc(val: string) {
  return /[!@#$%^&*()_\-\+={}\[\]:;<>,.?/~"'|\\`]/.test(val);
}

export function isValidMobile(val?: string) {
  if (!val) return false;
  const reg = /^((80|86|88|89|99|95|94|85|90|91|96|72|98|93|97|83|92|70|75|77)\d{6})$/;
  return reg.test(val);
}

export const phoneRule: any = {
  validator: (rule: any, _value: string) => {
    const value = _value?.trim();
    if (isValidMobile(value)) return Promise.resolve();
    return Promise.reject(new Error('Утасны дугаараа шалгана уу'));
  },
};
