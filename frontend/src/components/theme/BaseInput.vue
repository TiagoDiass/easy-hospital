<template>
  <div class="form-group base-input">
    <slot name="label">
      <label :for="id" v-if="label" class="form-control-label" :class="labelClasses">
        {{ label }}
        <span v-if="required">*</span>
      </label>
    </slot>

    <input
      :id="id"
      :type="type"
      class="form-control"
      v-on="listeners"
      :class="inputClasses"
      :value="value"
      :placeholder="placeholder"
      :autocomplete="autocomplete ? 'on' : 'off'"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,

  data: () => ({
    focused: false,
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
      let value = event.target.value;
      this.$emit('input', value);
    },

    onFocus(value) {
      this.focused = true;
      this.$emit('focus', value);
    },
  },
};
</script>

<style></style>
