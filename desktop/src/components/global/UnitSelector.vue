<template>
  <div class="unit-selector">
    <div
      v-for="unit in units"
      :key="getValue(unit)"
      class="unit"
      :class="getClass(unit)"
      @click="($event)=>changeValue(unit)"
    >{{ $t(getLabel(unit)) }}</div>
  </div>
</template>
<script>
export default {
  name: "UnitSelector",
  props: {
    value: {
      required: true
    },
    units: {
      required: true,
      type: Array
    },
    getValueFn: {
      type: Function,
      default: unit => unit.value
    },
    getLabelFn: {
      type: Function,
      default: unit => unit.label
    }
  },
  data: () => ({
    dataValue: null
  }),
  mounted() {
    if (this.value) {
      this.dataValue = this.value;
    }
  },
  methods: {
    getValue(unit) {
      if (unit) return this.getValueFn(unit);
    },
    getClass(unit) {
      return {
        ...unit.cssClass,
        active: this.getValue(unit) === this.dataValue
      };
    },
    getLabel(unit) {
      if (unit) return this.getLabelFn(unit);
    },
    changeValue(unit) {
      const oldValue = { ...this.dataValue };
      this.dataValue = this.getValue(unit);
      this.$emit("input", this.getValue(unit));
      if (oldValue != this.getValue(unit)) {
        this.$emit("change", this.getValue(unit));
      }
    }
  }
};
</script>