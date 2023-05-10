<template>
  <div
    style="max-height: 90vh; margin-bottom: 64px;padding: 0 10px;"
    class="home animated h-90 slideInLeft faster d-flex flex-column py-5"
  >
    <pull-to-refresh :refresh-fn="() => loadProjects(true)">
      <div class="project_home_container_items" v-if="!filter.busy">
        <score-card :user="user" :scoreData="getScoreData"></score-card>
        <div v-if="items.length > 0">
          <div
            v-for="item in items"
            :key="item.id"
            class="project-card__container"
          >
            <project-card :project="item"></project-card>
          </div>
        </div>
        <empty-data
          v-else
          :text="$t('You don\'t have active projects!')"
        ></empty-data>
      </div>
      <page-loader v-else></page-loader>
    </pull-to-refresh>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Card from "./Card";
import ScoreCard from "../../components/global/ScoreCard.vue";

export default {
  components: {
    "project-card": Card,
    "score-card": ScoreCard,
  },
  data: () => ({
    filter: {
      busy: false,
      force: true,
    },
    slides: [
      {
        title: null,
        show: false,
        description: "",
        number: 1,
        name: "competitive",
        hasCondition: false,
      },
      {
        title: null,
        show: false,
        description: "",
        number: 2,
        name: "versus",
        hasCondition: true,
      },
      {
        title: null,
        show: false,
        description: "",
        number: 3,
        name: "achiever",
        hasCondition: false,
      },
      {
        title: null,
        show: false,
        description: "",
        number: 4,
        name: "philanthropist",
        hasCondition: false,
      },
      {
        title: null,
        show: false,
        description: "",
        number: 5,
        name: "Helper",
        hasCondition: false,
      },
    ],
  }),
  computed: {
    ...mapGetters({
      projectsAll: "project/all",
      projects: "project/filteredItems",
      milestones: "milestone/filteredItems",
      user: "auth/user",
    }),
    getSlides() {
      return this.slides.filter((x) => x.show);
    },
    getUserRolesSorted() {
      const allRoles = [...this.user.userRoleScores].sort(
        (a, b) => a.roleValue - b.roleValue
      );
      return allRoles;
    },
    getScoreData() {
      return {
        title: this.getYourTitleText,
        description: this.getYourDescriptionText,
        milestoneIcon: this.getYourMilestoneIcon,
      };
    },
    getYourMilestoneIcon() {
      return this.getMilestoneIcon(
        this.getSlides[this.user.profileScoreDisplay]
      );
    },
    getYourDescriptionText() {
      return this.getDescriptionText(
        this.getSlides[this.user.profileScoreDisplay]
      );
    },
    getYourTitleText() {
      return this.getTitleText(this.getSlides[this.user.profileScoreDisplay]);
    },
    getSortedMilestones() {
      return [...this.milestones].sort(
        (a, b) => a.requiredScore - b.requiredScore
      );
    },
    getMilestoneIndex: {
      get: function () {
        const index = this.milestones.findIndex(
          (x) => x.id === this.user.activeMilestone.id
        );
        return index + 1;
      },
    },

    items: {
      get: function () {
        const projects = [...this.projects].sort((a, b) => {
          if (a.hasUserPendingEvaluations && !b.hasUserPendingEvaluations) {
            return -1;
          }
          if (b.hasUserPendingEvaluations && !a.hasUserPendingEvaluations) {
            return 1;
          }
          return a.name > b.name ? 1 : -1;
        });

        return projects.filter((project) => project.activeIdeaCount > 0);
      },
    },
  },
  async mounted() {
    //await this.redirectIfFirstLogin();
    await this.$store.dispatch("auth/init");
    await this.loadProjects();
    await this.loadScore();
    await this.enableSlides();
  },
  methods: {
    async redirectIfFirstLogin() {
      const route = this.$route.query;
      if (route) {
        if (route && this.user.mustChangePassword) {
          await this.$router.replace(
            {
              name: "settings",
              query: {
                i: new Date().getTime(),
              },
            },
            () => {},
            () => {}
          );
        }
      }
    },
    getMilestoneIcon(slide) {
      if (!slide) return;
      const sorted = this.getSortedMilestones;
      if (slide.number && this.user.activeMilestone) {
        const userIndex = sorted.findIndex(
          (x) => x.id == this.user.activeMilestone.id
        );

        return `milestone_rank_${userIndex + 1}`;
      }

      return `milestone_rank_0`;
    },
    getDescriptionText(slide) {
      if (!slide) return;
      if (slide.number == 1 && slide.show) {
        return this.$t("Your rank in company!", {
          company: this.user.company.name,
        });
      } else if (slide.number == 2 && slide.show) {
        const contender = this.getUserRolesSorted.find((x) => x.isAgainst);
        return this.$t("Don't let competitor win!", {
          role: contender.role ? contender.role : "",
        });
      } else if (slide.number == 3 && slide.show) {
        return this.$t("Keep going, soon reaching next milestone!");
      } else if (slide.number == 4 && slide.show) {
        return this.$t("Are using your idea that you helped to create!");
      } else if (slide.number == 5 && slide.show) {
        return this.$t("Value shared to your co-workers! Good job!");
      } else {
        return this.$t("Your rank in company!", {
          company: this.user.company.name,
        });
      }
    },
    getCompetitiveData() {
      return `${this.user.userScoreRank}#`;
    },
    getAchieverData() {
      let nextMilestone = null;
      const milestonesSorted = [...this.milestones].sort(
        (a, b) => a.requiredScore - b.requiredScore
      );
      if (this.user.activeMilestone && milestonesSorted[0]) {
        const activeMilestoneIndex = milestonesSorted.findIndex(
          (x) => x.id == this.user.activeMilestone.id
        );
        if (milestonesSorted[activeMilestoneIndex + 1]) {
          const next = milestonesSorted[activeMilestoneIndex + 1].requiredScore;
          nextMilestone = next;
        }
      }
      if (!nextMilestone) {
        return "100%";
      }

      const x = this.user.activeMilestone.requiredScore;
      const y = nextMilestone;

      const division = (this.user.engageScore - x) / (y - x);
      if (division > 0) {
        return Math.round(division * 100) + "%";
      }
      return "0%";
    },
    getVersusData() {
      const versusData = {
        current: null,
        contender: null,
      };
      const curRoleIndex = this.getUserRolesSorted.findIndex(
        (x) => x.roleId == this.user.companyRole.id
      );
      versusData.current = this.getUserRolesSorted[curRoleIndex];
      if (this.getUserRolesSorted[curRoleIndex + 1]) {
        versusData.contender = this.getUserRolesSorted[curRoleIndex + 1];
      } else {
        versusData.contender = this.getUserRolesSorted[curRoleIndex - 1];
      }

      return versusData;
    },

    getPhilantropistData() {
      const getUserIdeaCountFromProject = (project) => {
        let _userIds = [];
        if (
          project.userIdeas &&
          project.userIdeas.length > 0 &&
          project.usersCount > 0
        ) {
          let authoredProjectIdeas = project.userIdeas.filter(
            (x) => x.idea.author.id === this.user.id
          );
          if (authoredProjectIdeas.length > 0) {
            project.users.forEach((user) => _userIds.push(user.id));
          }
        }
        return _userIds;
      };

      let userIds = [];
      this.projectsAll.forEach((project) => {
        userIds.push(getUserIdeaCountFromProject(project));
      });
      return [...new Set(userIds.flat())].length;
    },

    getTitleText(slide) {
      if (!slide) return;
      if (slide.number == 1 && slide.show) {
        return this.getCompetitiveData();
      } else if (slide.number == 2 && slide.show) {
        const versusData = this.getVersusData();
        if (versusData.contender && versusData.current) {
          const total =
            versusData.contender.roleValue + versusData.current.roleValue;
          const currentPercentage = versusData.current.roleValue / total;
          return Math.round(currentPercentage * 100) + "%";
        }
      } else if (slide.number == 3 && slide.show) {
        return this.getAchieverData();
      } else if (slide.number == 4 && slide.show) {
        return this.getPhilantropistData();
      } else {
        return this.user.userSharedValue;
      }
    },
    async loadScore(force = true) {
      await this.$store.dispatch("milestone/findAll", {
        force: true,
      });
    },
    async loadProjects(force = true) {
      await this.$store.dispatch("project/findAll", {
        //  filter: this.filter,
        filter: { where: { field: "userIdeas", op: "ne", value: [] } },
        force: force,
      });
    },
    async enableSlides() {
      //Condition for slide 2. Competitive role.

      this.slides.forEach((slide) => {
        if (!slide.hasCondition) {
          slide.show = true;
        } else if (slide.number == 2) {
          if (this.user.userRoleScores.length < 2) {
            slide.show = false;
          } else if (
            this.user.userRoleScores[0].roleValue &&
            this.user.userRoleScores[1].roleValue
          ) {
            slide.show = true;
          } else {
            slide.show = false;
          }
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">

@media screen and (min-width: 650px) {
  .project_home_container_items {
    display: flex;
    min-width: 650px;
    width: 50%;
    flex-direction: column;
    margin: auto;
  }
}


.project-card__container:last-child {
  margin-bottom: 128px;
}
</style>