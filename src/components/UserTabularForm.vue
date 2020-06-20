<template>
  <ValidationObserver
    v-if="model"
    #default="{ valid }"
    tag="form"
    class="UserTabularForm"
    @submit.prevent="valid ? submit() : null"
  >
    <ValidationProvider
      v-for="field in formFields"
      :key="field.prop"
      :class="`field-type-${field.type}`"
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
        <b-icon
          v-if="errors.length"
          icon="alert-circle-outline"
          :title="errors[0]"
          type="is-danger"
        />
      </div>
      <BaseDatePicker
        v-else-if="field.type === 'date'"
        v-model="model[field.prop]"
        :disabled="field.readonly"
        :type="{
          'is-danger': errors.length > 0,
        }"
        :no-clearable="field.readonly"
        :message="errors[0] || null"
      />
      <span v-else class="is-flex">
        <b-input
          v-model="model[field.prop]"
          :disabled="field.readonly"
          :type="field.type"
          :maxlength="field.maxLength || null"
          :icon-right="touched && errors.length ? 'alert-circle-outline' : null"
          :title="touched && errors.length ? errors[0] : null"
        />
      </span>
    </ValidationProvider>

    <section class="submit-block">
      <b-button
        :disabled="!valid"
        :type="{ 'is-success': valid, 'is-danger': !valid }"
        :title="valid ? null : 'Fix errors'"
        @click="submit()"
      >
        Save
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
  }),
  freeze({
    prop: 'password',
    type: 'password',
    label: 'Password',
    rules: 'required|password',
    maxLength: 60,
    hidden: true,
  }),
  freeze({
    prop: 'repeatPassword',
    source: 'password',
    type: 'password',
    label: 'Repeat password',
    rules: 'required|confirmed:password',
    maxLength: 60,
    hidden: true,
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
    hidden: true,
  }),
  freeze({
    prop: 'expired',
    type: 'date',
    label: 'Expired',
    rules: 'required|notToday',
    readonly: true,
  }),
  freeze({
    prop: 'custom_string',
    type: 'text',
    label: 'Custom string',
    hidden: true,
  }),
  freeze({
    prop: 'bool_field',
    type: 'bool',
    label: 'First boolean',
    rules: 'mustCheck',
    hidden: false,
  }),
  freeze({
    prop: 'bool_field2',
    type: 'bool',
    label: 'Second boolean',
    hidden: true,
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
    hidden: true,
  }),
  freeze({
    prop: 'big_string',
    type: 'textarea',
    label: 'Field with textarea',
    rules: 'noManyBangs',
    hidden: true,
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
  .UserTabularForm {
    display: flex;
    justify-content: space-around;
    align-items: center;

    & > *+* {
      margin: 0 1em;
    }

    & ::v-deep label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .field-type-bool {
    display: flex;
    align-items: center;
    height: 36px;

    & ::v-deep .control {
      display: none;
    }
    .field {
      display: flex;
      align-items: center;
      height: 36px;
    }
  }
  .field {
    margin: 0!important;
  }
</style>
