<template>
  <b-field class="BaseDatePicker field block" v-bind="$attrs">
    <div class="datepicker-row">
      <b-datepicker
        v-model="model"
        :disabled="disabled"
        expanded
        placeholder="Select a date"
      />
      <b-button
        v-if="!noClearable && !!model"
        :disabled="disabled"
        icon-left="close"
        type="is-secondary"
        @click="model = null"
      />
    </div>
  </b-field>
</template>

<script>
import moment from 'moment'

export default {
  name: 'BaseDatePicker',

  inheritAttrs: false,

  props: {
    value: { type: [String, Date], default: null },
    dateParse: {
      type: Function,
      default: date => moment(date, 'YYYYMMDDHHmmss').toDate(),
    },
    dateUnparse: {
      type: Function,
      default: date => moment(date).format('YYYYMMDDHHmmss'),
    },
    dateFormatter: {
      type: Function,
      default: date => moment(date).format('LL'),
    },
    noClearable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },

  data: () => ({
    model: null,
  }),

  watch: {
    value: {
      handler(value) {
        this.model = value ? this.dateParse(value) : null
      },
      immediate: true,
    },
    model(model) {
      if (
        (!model && this.value) ||
        (!this.value && model) ||
        !moment(model).isSame(this.dateParse(this.value))
      ) {
        this.$emit('input', model && this.dateUnparse(model))
      }
    },
  },

  methods: {
    onInput(date) {
      this.model = date ? this.dateUnparse(date) : null
    },
  },
}
</script>

<style lang="scss" scoped>
  .BaseDatePicker {
    flex-wrap: wrap;
    position: relative;

    & ::v-deep label {
      flex: 1 0 100%;
    }

    & ::v-deep .help {
      flex: 1 0 100%;
    }

    .datepicker-row {
      display: flex;
      flex-wrap: nowrap;

      & > .datepicker { flex: 1; }
    }
  }
</style>
