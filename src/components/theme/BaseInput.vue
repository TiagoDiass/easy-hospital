<template>
  <div class="form-group base-input">
    <slot name="label">
      <label :for="id" v-if="label" class="form-control-label" :class="labelClasses">
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </slot>

    <!-- Input with Mask -->
    <input
      v-if="mask"
      v-bind="$attrs"
      :id="id"
      :value="value"
      v-on="listeners"
      v-mask="mask"
      :masked="masked"
      :type="type"
      class="form-control"
      :class="[{ 'is-valid': valid === true }, { 'is-invalid': isInvalid }, inputClasses]"
      :placeholder="placeholder"
      :autocomplete="autocomplete ? 'on' : 'off'"
    />

    <!-- Input without Mask -->
    <input
      v-else
      v-bind="$attrs"
      :id="id"
      :type="type"
      class="form-control"
      v-on="listeners"
      :class="[{ 'is-valid': valid === true }, { 'is-invalid': isInvalid }, inputClasses]"
      :value="value"
      :placeholder="placeholder"
      :autocomplete="autocomplete ? 'on' : 'off'"
    />

    <slot name="helpBlock">
      <div class="text-danger invalid-feedback" style="display: block" v-if="error">
        <slot name="errorBlock"></slot>
      </div>
    </slot>
  </div>
</template>

<script>
import { mask, masked } from 'vue-the-mask';

export default {
  directives: { mask, masked },
  name: 'BaseInput',

  inheritAttrs: false,

  data: () => ({
    focused: false,
    isInvalid: false,
  }),

  props: {
    id: {
      type: String,
      required: true,
      description: 'ID of the input so we can create a label for that input',
    },

    autocomplete: {
      type: Boolean,
      required: false,
      default: false,
      description: 'autocomplete attribute of the input tag(HTML 5 tag)',
    },

    label: {
      type: String,
      required: false,
      description: 'Label that goes above the input',
    },

    labelClasses: {
      type: Array,
      required: false,
      description: 'Label classes',
    },

    inputClasses: {
      type: Array,
      required: false,
      description: 'Input classes',
    },

    placeholder: {
      type: String,
      required: false,
      default: '',
      description: 'Input placeholder',
    },

    type: {
      type: String,
      required: false,
      default: 'text',
      description: 'Input type',
    },

    value: {
      type: [String, Number],
      description: 'Input value',
      default: '',
    },

    required: {
      type: Boolean,
      required: false,
      default: false,
      description: 'Is this input required? If so we will add a * after the label',
    },

    mask: {
      type: [String, Array],
      description: 'Mask that the input will have',
    },

    masked: {
      type: Boolean,
      default: false,
      description: 'Boolean that will say if the value of the input will be saved masked or not',
    },

    valid: {
      type: Boolean,
      default: undefined,
      description: 'Boolean that says if the input is valid or invalid',
    },

    error: {
      type: Boolean,
      description: 'Is there an error? If so we will add a feedback below the input',
    },
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
        focus: this.onFocus,
      };
    },
  },

  methods: {
    updateValue(event) {
      // let value = event.target.value;
      // this.$emit('input', value);
      let value =
        event.target.value && !this.masked && this.mask ? event.target.value.replace(/\D/g, '') : event.target.value;
      this.$emit('input', value);
    },

    onFocus(value) {
      this.focused = true;

      this.$emit('focus', value);
    },
  },

  watch: {
    focused(newValue) {
      // if the input is focused and valid is equal to false, we're gonna put the invalid class
      if (newValue && this.valid === false) this.isInvalid = true;
    },

    valid(newValue) {
      this.isInvalid = newValue === true ? false : true;
    },
  },
};
</script>
