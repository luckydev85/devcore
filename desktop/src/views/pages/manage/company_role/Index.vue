<template>
  <div class="page animated fadeIn">
    <div
      v-if="currentItem || currentRowDetails"
      class="overlay"
      :class="{'top-all':this.showInnerOverlayOnTop}"
      @click="overlayClick"
    ></div>
    <div class="container-fluid">
      <!-- page content -->
      <b-card>
        <b-table
          sort-icon-left
          sort-by="name"
          :busy="filter.busy"
          class="t01"
          primary-key="id"
          hover
          :fields="fields"
          :items="items"
          :show-empty="true"
          :empty-text="$t('There are no records for the given criteria')"
          :tbody-tr-class="(item,type)=>isRowEditing(item)?'editing':null"
        >
          <template v-slot:table-colgroup="scope">
            <col />
            <col style="width:300px" />
          </template>
          <template v-slot:empty="scope">
            <p class="alert alert-warning text-center">{{ scope.emptyText }}</p>
          </template>
          <template v-slot:table-busy>
            <div class="text-center text-primary my-2">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>

          <!-- name -->
          <template v-slot:cell(name)="row">
            <table-editable-cell
              :row="row"
              :editing="isRowEditing(row)"
              :item="updateForm"
              property="name"
              :static-value="row.item.name"
            >
              <span>
                <img
                  :src="row.item.getAvatarUrl('50x50')"
                  class="border rounded-circle"
                  height="25px"
                />
                {{ row.item.name }}
              </span>
              <template v-if="isRowEditing(row)" slot="editing">
                <b-input
                  v-model="updateForm.name"
                  v-validate="'required|min:4'"
                  name="name"
                  size="sm"
                  :disabled="updateForm.busy"
                  :state="$validateState('name', updateForm)"
                ></b-input>
                <b-form-invalid-feedback>{{ $displayError('name', updateForm) }}</b-form-invalid-feedback>
              </template>
            </table-editable-cell>
          </template>

          <!-- actions -->
          <template v-slot:cell(actions)="row" class="actions">
            <!-- when the row is editing -->
            <div v-if="isRowEditing(row)" class="text-right">
              <table-edit-tools-buttons
                :item="row.item"
                :show-save-button="$can('core/companyRole/update', row.item)"
                :disable-save-button="vErrors.any()||updateForm.busy"
                :show-delete-button="$can('core/companyRole/delete', row.item) && row.item.users.length===0"
                :loading="updateForm.busy"
                store="companyRole"
                @cancel="toggleItem(row.item)"
                @delete="toggleItem(null)"
                @save="saveItem(updateForm)"
              ></table-edit-tools-buttons>
            </div>
            <!-- when the row is not editing -->
            <table-tools-buttons
              v-else
              :item="row.item"
              :show-edit-button="$can('core/companyRole/update', row.item)"
              :show-delete-button="$can('core/companyRole/delete', row.item) && row.item.users.length===0"
              store="companyRole"
              @editItem="toggleItem(row.item)"
            ></table-tools-buttons>
          </template>
        </b-table>
      </b-card>
    </div>
  </div>
</template>
<script>
import { /* mapState, */ mapGetters } from "vuex";
import GQLForm from "@/lib/gqlform";

export default {
  components: {},
  data: () => {
    return {
      currentItem: null,
      currentRowDetails: null,
      updateForm: null,
      filter: {
        busy: false
      }
    };
  },
  computed: {
    ...mapGetters({
      items: "companyRole/filteredItems",
      showInnerOverlayOnTop: "app/show_inner_overlay_on_top"
    }),
    fields: {
      get() {
        return [
          { key: "name", label: this.$t("Name"), sortable: true },
          { key: "actions", label: this.$t("Manage"), class: "actions" }
        ];
      }
    }
  },
  async mounted() {
    this.$store.dispatch("companyRole/findAll", {
      force: true,
      filter: this.filter
    });
  },
  methods: {
    isRowEditing(row) {
      return (
        this.currentItem &&
        row &&
        this.currentItem.id === (row.item ? row.item.id : row.id)
      );
    },
    overlayClick() {
      if (this.currentItem) {
        this.toggleItem(null);
      }
    },
    toggleItem(item) {
      this.$validator.pause();
      this.$validator.reset();
      if (!item || (this.currentItem && this.currentItem.id === item.id)) {
        this.currentItem = null;
        this.updateForm = null;
      } else {
        this.updateForm = new GQLForm({
          id: item.id,
          name: item.name
        });
        this.currentItem = item;
        this.$validator.reset();
        this.$validator.resume();
      }
      this.$store.dispatch("app/toggleInnerOverlay");
    },
    async saveItem(form) {
      await this.$validator.validateAll();
      if (!this.vErrors.any()) {
        await this.$validator.reset();
        await this.$store.dispatch("companyRole/update", form);
        this.toggleItem(null);
      }
    }
  }
};
</script>
