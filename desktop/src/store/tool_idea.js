import { IDEA } from "@/graphql";
import { Idea } from "@/models";
import { queryToPromise } from "../lib/utils";
import { apolloClient } from "../plugins/apollo/client";
import EventBus from "@/lib/eventbus";

const initialState = () => {
  return {
    loading: false,
    all: [],
    filter: null,
    loadedProcess: []
  };
};

const state = initialState();

const getters = {
  loading: state => state.loading,
  all: state => state.all,
  filter: state => state.filter,
  currentTab: state => state.tab,
  currentTool: state => state.currentTool,
  byProcess: state => processId =>
    state.all.filter(o => o.processId === processId),
  byStage: state => stageId => state.all.filter(o => o.stageId === stageId),
  byOperation: state => operationId =>
    state.all.filter(o => o.operationId === operationId),
  byPhase: state => phaseId => state.all.filter(o => o.phaseId === phaseId),
  filteredItems: state =>
    state.filter && state.filter.length > 3
      ? state.all.filter(i =>
          i.name.toLowerCase().includes(state.filter.toLowerCase())
        )
      : state.all
};

const actions = {
  async setIdeaTab(context, form) {
    EventBus.$emit("tool_idea/currentTab", {
      form
    });

    context.commit("SET_CURRENT_TAB", form);
  },
  async create(context, form) {
    form.type = form.type || "TOOL";
    const result = await form.mutate({
      mutation: IDEA.create
      /* update(cache, result) {
                const { ideaFindAll } = cache.readQuery({ query: IDEA.findAll });
                cache.writeQuery({
                    query: IDEA.findAll,
                    data: { ideaFindAll: ideaFindAll.concat([result.data.ideaCreate]) },
                });
            } */
    });
    const role = new Idea().deserialize(result.data.ideaCreate);
    await context.dispatch("findAll", {
      force: true
    });
    return role;
  },

  async update(context, form) {
    form.type = form.type || "TOOL";
    const result = await form.mutate({
      mutation: IDEA.update,
      variables: {
        id: form.id
      }
    });
    const role = new Idea().deserialize(result.data.ideaUpdate);
    await context.dispatch("findAll", {
      force: true
    });
    return role;
  },

  async findById(context, filter) {
    const currentItem = context.state.all.find(o => o.id === filter.id);
    const force = filter.force || false;

    if (!currentItem || force || !currentItem.loaded) {
      try {
        const query = apolloClient.watchQuery({
          query: IDEA.findById,
          variables: filter
        });
        const { result } = await queryToPromise(query);
        const idea = new Idea().deserialize(result.data.ideaFindById);
        idea.loaded = true;
        context.commit("SET_ITEM", idea);
        return idea;
      } finally {
        filter.busy = false;
      }
    }
    return currentItem;
  },

  async changeStatus(context, form) {
    const result = await form.mutate({
      mutation: IDEA.changeStatus,
      variables: {
        id: form.id,
        status: form.status
      }
    });
    const role = new Idea().deserialize(result.data.ideaChangeStatus);
    context.dispatch("findAll", {
      force: true
    });
    return role;
  },

  async delete(context, form) {
    const result = await form.mutate({
      mutation: IDEA.delete,
      variables: {
        id: form.id
      }
    });
    await context.dispatch("findAll", {
      force: true
    });
    return result.data.ideaDelete;
  },
  async deleteImprovement(context, form) {
    const result = await form.mutate({
      mutation: IDEA.deleteImprovement,
      variables: {
        id: form.improvement_id
      }
    });
    context.commit("REMOVE_IMPROVE_ITEM", form);
    // await context.dispatch('findAll', { force: true });
    return result.data.ideaDelete;
  },

  async findByProcess(context, filter) {
    if (!context.state.loadedProcess.includes(filter.id) || filter.force) {
      const query = apolloClient.watchQuery({
        query: IDEA.findAll,
        variables: {
          filter: {
            where: {
              and: [
                {
                  field: "process_id",
                  value: filter.id
                },
                {
                  field: "type",
                  value: "TOOL"
                }
              ]
            }
          }
        }
      });
      const { result } = await queryToPromise(query);
      result.data.ideaFindAll.map(o => {
        context.commit("SET_ITEM", new Idea().deserialize(o));
      });
    }
  },

  async findAll(context, { filter = null, force = false } = {}) {
    if (context.getters.all.length === 0 || force) {
      filter = filter || {
        data: {
          // orderBy: ["name"],
          where: {
            and: [
              {
                field: "type",
                value: "TOOL"
              }
            ]
          }
        }
      };
      filter.busy = context.getters.all.length < 1;
      try {
        /* const { data } = await apolloClient.watchquery({
                    query: IDEA.findAll,
                    variables: { filter: filter }
                }); */
        const query = apolloClient.watchQuery({
          query: IDEA.findAll,
          variables: {
            filter: filter.data
          }
        });
        const { result } = await queryToPromise(query);
        const results = result.data.ideaFindAll.map(cr => {
          return new Idea().deserialize(cr);
        });
        context.commit("SET_ALL", results);
        return results;
      } finally {
        filter.busy = false;
      }
    }
    return context.getters.all;
  },

  async filter(context, filter) {
    context.commit("SET_FILTER", filter);
  }
};

const mutations = {
  SET_CURRENT_TAB(state, value){
    state.currentTab = value.tab
  },
  RESET_STATE(state) {
    Object.assign(state, initialState());
    return state;
  },
  SET_ALL(state, value) {
    state.all = value;
  },
  REMOVE_IMPROVE_ITEM(state, value) {
    state.all = state.all.filter(o => o.id != value.id);
  },
  SET_ITEM(state, value) {
    const index = state.all.findIndex(el => el.id === value.id);
    if (index > -1) {
      state.all[index] = value;
      state.all = [...state.all];
    } else {
      state.all.push(value);
    }
  },
  SET_FILTER(state, value) {
    state.filter = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
