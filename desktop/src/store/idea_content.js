import { IDEA_CONTENT } from "@/graphql";
import { IdeaContent } from "@/models";
import { queryToPromise } from "../lib/utils";
import { apolloClient } from "../plugins/apollo/client";

const initialState = () => {
  return {
    ideaInEdit: null,
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
  filter: state => state.filter
};

const actions = {
  async create(context, form, reload) {
    let ret = null;
    try {
      form.busy = true;
      const result = await form.mutate({
        mutation: IDEA_CONTENT.create
      });
      ret = new IdeaContent().deserialize(result.data.ideaContentCreate);
    } catch (e) {
      console.log(e);
    } finally {
      form.busy = false;
    }
    return ret;
  },

  async update(context, form, reload) {
    let ret = null;
    try {
      const result = await form.mutate({
        mutation: IDEA_CONTENT.update,
        variables: {
          id: form.id
        }
      });
      //if (reload) {
      ret = new IdeaContent().deserialize(result.data.ideaContentUpdate);
      context.commit("SET_ITEM", ret);
      //  }
    } catch (e) {
      console.log(e);
    } finally {
      form.busy = false;
    }
    return ret;
  },

  async delete(context, form) {
    const result = await form.mutate({
      mutation: IDEA_CONTENT.delete,
      variables: {
        id: form.id
      }
    });
    context.commit("REMOVE_ITEM", form);
    return result.data.ideaContentDelete;
  },

  async findAll(context, { filter = null, force = false } = {}) {
    if (context.getters.all.length === 0 || force) {
      filter = filter || {
        data: {
          orderBy: ["version"]
        }
      };
      filter.busy = context.getters.all.length < 1;
      try {
        const query = apolloClient.watchQuery({
          query: IDEA_CONTENT.findAll,
          variables: {
            filter: filter.data
          }
        });
        const { result } = await queryToPromise(query);
        const results = result.data.ideaContentFindAll.map(cr => {
          return new IdeaContent().deserialize(cr);
        });
        context.commit("SET_ALL", results);
        return results;
      } finally {
        filter.busy = false;
      }
    }
    return context.getters.all;
  },

  async findById(context, filter) {
    const currentItem = context.state.all.find(o => o.id === filter.id);
    const force = filter.force || false;
    if (!currentItem || force || !currentItem.loaded) {
      filter.busy = true;
      try {
        const query = apolloClient.watchQuery({
          query: IDEA_CONTENT.findById,
          variables: filter
        });
        const { result } = await queryToPromise(query);
        const ideaContent = new IdeaContent().deserialize(
          result.data.ideaContentFindById
        );
        context.commit("SET_ITEM", ideaContent);

        return ideaContent;
      } catch (e) {
        console.log(e);
      } finally {
        filter.busy = false;
      }
    }
    return currentItem;
  },

  async filter(context, filter) {
    context.commit("SET_FILTER", filter);
  }
};

const mutations = {
  SET_FILTER(state, value) {
    state.filter = value;
  },
  REMOVE_ITEM(state, value) {
    state.all = state.all.filter(o => o.id != value.id);
  },
  SET_ALL(state, value) {
    state.all = value;
  },
  SET_ITEM(state, value) {
    const index = state.all.findIndex(el => el.id === value.id);
    if (index > -1) {
      state.all[index] = value;
      state.all = [...state.all];
    } else {
      state.all.push(value);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
