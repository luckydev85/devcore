<template>
  <super-select
    :items="ideas"
    class="text-selector"
    selector-class="list"
    v-model="dataValue"
    :v-bind="$props"
    ref="selector"
    :placeholder="placeHolderText"
    v-if="ready"
    :state="state"
    :outside-close="!showPopOver"
    :show-input="showInput"
    :show-footer-selection="false"
    @input="change"
    :filter-fn="filter"
    :show-add-btn="showAddBtn"
    :max-display-items="1"
    @close="close"
  >
    <template slot="selection-count" slot-scope="props">{{
      $tc("idea.count", props.values.length)
    }}</template>
    <template slot="dropdown-item" slot-scope="props">
      <div class="text-left">
        <span class="break-word">
          {{ props.item.title }}
          <small class="text-capitalize">{{ $t(props.item.status) }}</small>
        </span>
      </div>
    </template>
    <template slot="header-display">
      <div
        v-if="selectedItems && selectedItems.length > 0"
        class="selected-item"
      >
        <div
          v-for="item in selectedItems.slice(0, maxDisplayItems)"
          :key="item.id"
          v-b-tooltip="{ placement: 'top', boundary: 'viewport' }"
          class="text-overflow"
          :title="item.title"
        >
          {{ item.title }}
        </div>
      </div>
    </template>
    <template slot="header-display-overflow">
      <span v-if="selectedItems.length > maxDisplayItems" class="overflow">{{
        selectedItems && selectedItems.length > maxDisplayItems
          ? "+" + (selectedItems.length - maxDisplayItems)
          : null
      }}</span>
    </template>
    <template slot="display-details" slot-scope="props">
      <ul v-if="props.items" class="list-unstyled">
        <li v-for="item in selectedItems" :key="item.id" class="my-1 row">
          <span class="col-10 text-overflow"
            >  {{ item.title }}  {{ item.status }}</span
          >
          <b-button
            class="col-2 btn-white btn-outline-danger btn-xs border-0 text-danger"
            @click.stop="removeItem(item, $event)"
          >
            <i class="mdi mdi-delete"></i>
          </b-button>
        </li>
      </ul>
    </template>
  </super-select>
</template>
<script>
import { /* mapState, */ mapGetters } from "vuex";

export default {
  name: "IdeaSelector",

  props: {
    placeHolderText: null,
    items: {
      required: false,
      type: Array,
    },
    value: {
      required: false,
      default: () => [],
    },
    state: {
      required: false,
    },
    showAddBtn: {
      required: false,
      default: () => true,
    },
    showInput: {
      required: false,
      default: () => true,
    },
    showFooterSelection: {
      required: false,
      default: () => false,
    },
  },
  $_veeValidate: {
    // fetch the current value from the innerValue defined in the component data.
    name() {
      return this.title;
    },
    value() {
      return this.value;
    },
  },

  data: () => ({
    showPopOver: false,
    dataValue: [],
    ready: false,
    maxDisplayItems: 1,
  }),
  computed: {
    ...mapGetters({
      allIdeas: "idea/all",
    }),
    ideas: {
      get() {

        return (this.items || this.allIdeas).sort((a, b) =>
          a.title > b.title ? 1 : -1
        );
      },
    },
    selectedItems: {
      get() {

        return this.ideas
          .filter((r) => this.dataValue.includes(r.id))
          .sort((a, b) => (a.title > b.title ? 1 : -1));
      },
    },
  },
  async mounted() {
    if (!this.items) {
      var result = await this.$store.dispatch("idea/findAll");
    }
    if (this.value) {
      this.dataValue = this.value.filter(
        (o) => this.ideas.find((u) => u.id === o) != null
      );
    } else {
      this.dataValue = [];
    }
    this.ready = true;
  },
  methods: {
    removeItem(item, event) {
      event.stopPropagation();
      if (item) {
        this.dataValue = this.dataValue.filter((i) => i !== item.id);
        this.$refs.selector.setDataValue(this.dataValue);
        this.$emit("input", this.dataValue);
      }
    },
    change(value, event) {
      this.dataValue = value;
      this.$emit("input", this.dataValue, event);
    },
    itemAdded(item) {
      this.$refs.selector.toggleItem(item);
    },
    togglePopOver() {
      this.showPopOver = !this.showPopOver;
    },
    close() {
      this.showPopOver = false;
      this.$emit("close");
    },
    async filter(value, event) {
      if (event) {
        event.stopPropagation();
      }
      let ret = this.ideas;
      if (value) {
        ret = this.ideas.filter((i) =>
          i.title.toLowerCase().includes(value.toLowerCase())
        );
      }
      return ret;
    },
  },
};
</script>
