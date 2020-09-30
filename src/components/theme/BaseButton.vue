<template>
  <button @click="handleClick" class="btn" :class="classesArray">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    type: {
      type: String,
      required: false,
      default: 'primary',
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    buttonTypeClass() {
      return `btn-${this.type}`;
    },

    classesArray() {
      return [this.buttonTypeClass, { disabled: this.disabled }];
    },
  },

  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event);
      }
    },
  },
};
</script>
