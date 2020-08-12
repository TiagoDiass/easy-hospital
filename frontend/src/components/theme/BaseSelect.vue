<template>
  <div class="form-group base-select">
    <slot name="label">
      <label :for="id" v-if="label" class="form-control-label" :class="labelClasses">{{ label }}</label>
      <span v-if="required">*</span>
    </slot>

    <select :id="id" v-on="listeners" class="form-control" :class="selectClasses">
      <option style="color: #000;" v-if="defaultOption" :value="null" selected>
        {{ defaultOption }}
      </option>

      <option
        style="color: #000;"
        v-for="(option, index) in selectOptions"
        :key="index"
        :value="option.value"
        :selected="value == option.value"
      >
        {{ option.desc }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'base-select',

  props: {
    id: {
      type: String,
      required: true,
      description: 'The select id',
    },

    required: {
      type: Boolean,
      default: false,
      description: 'If the input is required we will add an * next to it',
    },

    label: {
      type: String,
      required: false,
      description: 'Select input label',
    },

    labelClasses: {
      type: Array,
      required: false,
      description: 'Classes of the label',
    },

    selectClasses: {
      type: Array,
      required: false,
      description: 'The classes that the select will have',
    },

    defaultOption: {
      type: String,
      default: '',
      required: false,
      description: 'The default option of the select input',
    },

    options: {
      type: Array,
      description: 'Options array: { value: Any, desc: String}',
    },

    value: {
      type: [String, Number],
      description: 'Input value',
      default: '',
    },
  },

  data: () => ({
    focused: false,
  }),

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
        focus: this.onFocus,
      };
    },

    selectOptions() {
      if (this.defaultOption) {
        const options = this.options.filter(option => option.value !== this.defaultOptionObject.value);
        return options;
      }
      return this.options;
    },
  },

  methods: {
    updateValue(evt) {
      let value = evt.target.value;
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
