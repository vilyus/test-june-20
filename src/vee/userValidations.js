import moment from 'moment'
import { extend } from 'vee-validate'
import {
  required,
  email,
  confirmed,
  max_value as maxValue,
} from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('email', {
  ...email,
  message: 'Please check that you have entered a correct E-Mail',
})

extend('password', {
  validate: password =>
    password.length >= 6 && password.length <= 60,
  message: 'Password must be at least 6 characters long',
})

extend('confirmed', {
  ...confirmed,
  message: 'Passwords do not match',
})

extend('noManyBangs', {
  validate: value => !value.includes('!!'),
  message: 'Text cannot include too! many!! bangs!!!',
})

extend('mustCheck', {
  validate: value => value === true,
  message: 'Please select this value',
})

extend('float', {
  validate: value => /^-?\d*\.?\d*$/.test(value),
  message: 'Expected a number',
})

extend('notToday', {
  validate: date =>
    !date ||
    !moment(date, 'YYYYMMDD')
      .startOf('day')
      .isSame(moment().startOf('day')),
  message: 'Not today!',
})

extend('max_value', {
  ...maxValue,
  message: 'It is over 9000!',
})
