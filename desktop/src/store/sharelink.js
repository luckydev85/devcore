import { SHARELINK } from "@/graphql";
import { ShareLink } from "@/models";
import { queryToPromise } from "../lib/utils";
import { apolloClient } from "../plugins/apollo/client";

const initialState = () => {
  return {
    loading: false,
    all: []
  };
};

const state = initialState();

const getters = {
  loading: state => state.loading,
  all: state => state.all,
};

const actions = {
  async create(context, form) {
    const result = await form.mutate({
      mutation: SHARELINK.create
    });
    const sharelink = new ShareLink().deserialize(result.data.linkCreate);
    await context.dispatch("findAll", {
      force: true
    });
    return sharelink;
  },
  async shareProjectByLinkId(context, form) {
    const result = await form.mutate({
      mutation: SHARELINK.shareProjectByLinkId,
      variables: {
        id: form.id
      }
    })

    return result;
  },
  async getShareLinkByHash(context, form) {
    const result = await form.mutate({
      mutation: SHARELINK.getShareLinkByHash,
      variables: {
        urlHash: form.urlHash
      }
    })

    const sharelink = new ShareLink().deserialize(result.data.getShareLinkByHash);
    return sharelink;
  },
  async delete(context, form) {
    const result = await form.mutate({
      mutation: SHARELINK.delete,
      variables: {
        id: form.id
      }
    });
    await context.dispatch("findAll", {
      force: true
    });
    return result.data.linkDelete;
  },

  async findAll(context, { filter = null, force = false } = {}) {
    if (context.getters.all.length === 0 || force) {
      filter = filter || {
        data: {
          orderBy: ["name"]
        }
      };
      filter.busy = context.getters.all.length < 1;
      try {

        const query = apolloClient.watchQuery({
          query: SHARELINK.findAll,
        });
        const { result } = await queryToPromise(query);
        const results = result.data.linkFindAll.map(cr => {
          return new ShareLink().deserialize(cr);
        });
        context.commit("SET_ALL", results);
        return results;
      } finally {
        filter.busy = false;
      }
    }
    return context.getters.all;
  },
};

const mutations = {
  RESET_STATE(state) {
    Object.assign(state, initialState());
    return state;
  },
  SET_LOADING(state, value) {
    state.loading = value;
  },
  SET_ALL(state, value) {
    state.all = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
