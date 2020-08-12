<template>
  <SlideYUpTransition :duration="animationDuration">
    <div
      @click.self="closeModal"
      class="modal fade"
      :class="{ 'show d-block': show }"
      v-show="show"
      tabindex="-1"
      role="dialog"
      :aria-hidden="!show"
    >
      <div class="modal-dialog modal-dialog-centered" :class="modalSizeClass" role="document">
        <div class="modal-content">
          <div class="modal-header py-2">
            <slot name="modal-header"></slot>
          </div>

          <div class="modal-body px-4">
            <slot name="modal-body"></slot>
          </div>

          <div class="modal-footer py-1">
            <slot name="modal-footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </SlideYUpTransition>
</template>

<script>
import { SlideYUpTransition } from 'vue2-transitions';
export default {
  name: 'base-modal',

  components: {
    SlideYUpTransition,
  },

  props: {
    show: {
      type: Boolean,
      description: 'Prop that we will use to open and close the modal',
    },

    animationDuration: {
      type: Number,
      default: 500,
      description: 'Modal transition duration',
    },

    size: {
      type: String,
      default: '',
      description: 'Modal size(lg, sm, or nothing)',
    },
  },

  computed: {
    modalSizeClass() {
      return this.size ? `modal-${this.size}` : '';
    },
  },

  methods: {
    closeModal() {
      this.$emit('update:show', false);
      this.$emit('close');
    },
  },

  watch: {
    show(val) {
      let documentClasses = document.body.classList;
      if (val) {
        documentClasses.add('modal-open');
      } else {
        documentClasses.remove('modal-open');
      }
    },
  },
};
</script>
