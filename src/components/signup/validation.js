export default function validation (values) {

  let errors = {};

  if (!values.username.trim()) {
    errors.username = 'Username required';
  }
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password needs to be 6 characters or more';
  }

  if (!values.passwordconfirm) {
    errors.passwordconfirm = 'Password is required';
  } else if (values.passwordconfirm !== values.password) {
    errors.passwordconfirm = 'Passwords do not match';
  }

  return errors;

};