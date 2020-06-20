<template>
  <ValidationObserver
    v-if="model"
    #default="{ valid }"
    tag="form"
    class="UserForm"
    @submit.prevent="valid ? submit() : null"
  >
    <section
      v-for="field in formFields"
      :key="field.prop"
      :class="`field-type-${field.type}`"
    >
      <ValidationProvider
        :name="field.prop"
        :rules="field.rules || null"
        #default="{ errors, valid, touched }"
      >
        <div
          v-if="field.type === 'bool'"
          class="field"
        >
          <b-checkbox
            v-model="model[field.prop]"
            :disabled="field.readonly"
            type="is-dark"
          >
            {{ field.label }}
          </b-checkbox>
          <p v-show="errors.length" class="has-text-danger">
            {{ errors[0] }}
          </p>
        </div>
        <BaseDatePicker
          v-else-if="field.type === 'date'"
          v-model="model[field.prop]"
          :disabled="field.readonly"
          :label="field.label"
          :type="{
            'is-danger': errors.length > 0,
          }"
          :no-clearable="field.readonly"
          :message="errors[0] || null"
        />
        <b-field
          v-else
          :label="field.label"
          :type="{
            'is-danger': touched && errors.length > 0,
          }"
          :message="touched ? (errors[0] || null) : null"
        >
          <b-input
            v-model="model[field.prop]"
            :disabled="field.readonly"
            :type="field.type"
            :maxlength="field.maxLength || null"
          />
        </b-field>
      </ValidationProvider>
    </section>
    <section class="submit-block">
      <b-button
        :disabled="!valid"
        :type="{ 'is-info': valid, 'is-danger': !valid }"
        outlined
        @click="submit()"
      >
        {{ valid ? 'Save changes' : 'Fix errors above to save user' }}
      </b-button>
    </section>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import '../vee/userValidations'
import BaseDatePicker from './BaseDatePicker'

const freeze = Object.freeze.bind(Object)

const SCHEMA = freeze([
  freeze({
    prop: 'id',
    hidden: true,
  }),
  freeze({
    prop: 'login',
    type: 'text',
    label: 'Login',
    rules: 'required',
    readonly: true,
  }),
  freeze({
    prop: 'password',
    type: 'password',
    label: 'Password',
    rules: 'required|password',
    maxLength: 60,
  }),
  freeze({
    prop: 'repeatPassword',
    source: 'password',
    type: 'password',
    label: 'Repeat password',
    rules: 'required|confirmed:password',
    maxLength: 60,
  }),
  freeze({
    prop: 'email',
    type: 'email',
    label: 'E-Mail',
    rules: 'required|email',
  }),
  freeze({
    prop: 'registered',
    type: 'date',
    label: 'Registered',
    readonly: true,
  }),
  freeze({
    prop: 'expired',
    type: 'date',
    label: 'Expired',
    rules: 'required|notToday',
  }),
  freeze({
    prop: 'custom_string',
    type: 'text',
    label: 'Custom string',
    maxLength: 100,
  }),
  freeze({
    prop: 'bool_field',
    type: 'bool',
    label: 'First boolean',
    rules: 'mustCheck',
  }),
  freeze({
    prop: 'bool_field2',
    type: 'bool',
    label: 'Second boolean',
  }),
  freeze({
    prop: 'limit_number',
    type: 'number',
    label: 'Limited number',
    rules: 'max_value:9000',
  }),
  freeze({
    prop: 'double_field',
    label: 'Float',
    rules: 'required|float',
  }),
  freeze({
    prop: 'big_string',
    type: 'textarea',
    label: 'Field with textarea',
    rules: 'noManyBangs',
  }),
])

export default {
  name: 'UserForm',

  components: {
    BaseDatePicker,
    ValidationObserver,
    ValidationProvider,
  },

  props: {
    user: { type: Object, required: true },
  },

  data: () => ({
    SCHEMA,
    model: null,
  }),

  computed: {
    formFields() {
      return this.SCHEMA.filter(f => !f.hidden)
    },

    hiddenFields() {
      return this.SCHEMA.filter(f => !!f.hidden)
    },
  },

  watch: {
    user: {
      handler: 'populateModel',
      immediate: true,
      deep: true,
    },
  },

  methods: {
    populateModel(user) {
      if (!user) return

      this.model = this.formFields.reduce((acc, field) => {
        let value = user[field.source || field.prop]
        if (field.type === 'bool') {
          value = [1, true, '1', 'true'].includes(value)
            ? true
            : ([0, false, '0', 'false'].includes(value) ? false : null)
        }
        acc[field.prop] = value
        return acc
      }, {})
    },

    submit() {
      const { model, hiddenFields, user: oldUser } = this

      const user = {
        ...model,
        ...hiddenFields.reduce((acc, f) => {
          acc[f.prop] = oldUser[f.prop]
          return acc
        }, {}),
      }

      this.$store.commit('user/setOne', { user })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .UserForm {
    display: flex;
    flex-direction: column;
  }
  .field {
    margin-bottom: 1em;
  }
  .submit-block {
    display: flex;
    justify-content: center;
  }
</style>
