<template>
  <div class="idea_review_container">
    <b-row v-if="currentProcessSection">
      <b-col>
        <h3 class="h4 text-white text-uppercase">
          {{ $t("In testing") }}
          <span class="text-gray-lighter">{{ testingIdeas.length }}</span>
        </h3>
        <idea-card
          v-for="item in testingIdeas"
          :id="`idea-id-${item.uuid}`"
          :ref="`idea-ref-${item.uuid}`"
          :key="item.id"
          :idea="item"
        ></idea-card>
        <div v-if="testingIdeas.length == 0">
          <p class="alert alert-warning">
            {{ $t("There are no records for the given criteria") }}
          </p>
        </div>
      </b-col>
      <b-col>
        <h3 class="h4 text-white text-uppercase">
          {{ $t("Evaluated ideas") }}
          <span class="text-gray-lighter">{{ evaluatedIdeas.length }}</span>
        </h3>
        <idea-card
          v-for="item in evaluatedIdeas"
          :id="`idea-id-${item.uuid}`"
          :ref="`idea-ref-${item.uuid}`"
          :key="item.id"
          :idea="item"
        ></idea-card>
        <div v-if="evaluatedIdeas.length == 0">
          <p class="alert alert-warning">
            {{ $t("There are no records for the given criteria") }}
          </p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import IdeaCard from "./Card";

export default {
  components: {
    "idea-card": IdeaCard,
  },
  mounted() {
    if (this.$router.currentRoute.query) {
      if (this.$router.currentRoute.query.uuid) {
        const { uuid } = this.$router.currentRoute.query;
        this.$nextTick(() => {
          const ideaSelector = `idea-id-${uuid}`;
          const element = document.getElementById(ideaSelector);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      currentProcess: "process/current",
    }),
    process: {
      get() {
        return this.currentProcess("ideas");
      },
    },
    currentProcessSection: {
      get() {
        return (
          this.process.phase ||
          this.process.operation ||
          this.process.stage ||
          this.process.process
        );
      },
    },
    currentProcessSectionName: {
      get() {
        if (this.process.phase) {
          return "phase";
        }
        if (this.process.operation) {
          return "operation";
        }
        if (this.process.stage) {
          return "stage";
        }
        if (this.process.process) {
          return "process";
        }
        return null;
      },
    },
    testingIdeas: {
      get() {
        if (this.currentProcessSection) {
          return this.$store.getters[
            `idea/by${this.currentProcessSectionName.capitalize()}`
          ](this.currentProcessSection.id).filter(
            (i) => this.filterByProcessSection(i, "TESTING") && !i.hasReviews
          );
        }
        return [];
      },
    },
    evaluatedIdeas: {
      get() {
        if (this.currentProcessSection) {
          return this.$store.getters[
            `idea/by${this.currentProcessSectionName.capitalize()}`
          ](this.currentProcessSection.id).filter(
            (i) => this.filterByProcessSection(i, "TESTING") && i.hasReviews
          );
        }
        return [];
      },
    },
  },
  methods: {
    filterByProcessSection(item, status) {
      switch (this.currentProcessSectionName) {
        case "process":
          return item.status === status;
        case "stage":
          return item.status === status && item.parentType === "process_stage";
        case "operation":
          return (
            item.status === status && item.parentType === "process_operation"
          );
        case "phase":
          return item.status === status && item.parentType === "process_phase";
        default:
          return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.idea_review_container {
  // height: 100%;
	margin: 20px;
}
</style>
