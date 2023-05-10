import store from "../store";
import router from "../router";
import ServerResponse from "../models/response.model";
import supportedLocales from "@/config/supported-locales";
import GQLForm from "@/lib/gqlform";

let loadingCount = 0;

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export function setLang(lang) {
  window.vm.$i18n.locale = lang || window.vm.$i18n.locale;
}

export function addClass(el, className) {
  el.classList.add(className);
}

export function removeClass(el, className) {
  el.classList.remove(className);
}

export function toggleClass(el, className) {
  if (el.classList.contains(className)) {
    removeClass(el, className);
  } else {
    addClass(el, className);
  }
}

export function scrollLeftToElement(el) {
  document.getElementById("main").scrollLeft = el.offsetLeft;
}

export function scrollTopToElement(el) {
  document.getElementById("main").scrollLeft = el.offsetTop;
}

export function blockUi() {
  loadingCount++;
  checkIfNeedBlock();
}

export function checkIsMobile() {
  if (!window.matchMedia("(min-width: 768px)").matches) {

    if (window.location.pathname.includes('share') !== false){
      let share_hash = window.location.pathname;
      window.location.href = `${process.env.VUE_APP_MOBILE_URL}`+"#"+share_hash;
    }
    else
      window.location = `${process.env.VUE_APP_MOBILE_URL}`;
    console.log( window.location )
  }
}

export function unblockUi() {
  loadingCount--;
  checkIfNeedBlock();
}

export function checkIfNeedBlock() {
  if (loadingCount < 0) {
    loadingCount = 0;
  }

  if (loadingCount > 0) {
    removeClass(document.body, "loaded");
  } else {
    addClass(document.body, "loaded");
  }
}

export function imageResolver(imageUrl, size) {
  if (!imageUrl) {
    return "";
  }
  return imageUrl
    .replace("/0x0/", `/${size}/`)
    .replace("//", "/")
    .replace(":/", "://");
}

export function showGraphqlErrorFromResponse(networkError) {
  const ex = new ServerResponse();
  ex.message = networkError.message;
  ex.code = networkError.statusCode;

  showMessageFromResponse(ex);
}

export function showMessageFromResponse(response) {
  if (response.statusCode == 400) {
    window.vm.$snotify.error(window.vm.$t(response.message));
    return;
  }

  if (response.statusCode == 401) {
    window.vm.$snotify.error(window.vm.$t(response.message));
    return;
  }
  if (response.statusCode === 500) {
    window.vm.$snotify.error(window.vm.$t(response.message));
    return;
  }

  const translationKey = `responses.${Object.keys(response.data)[0]}`;
  if (window.vm.$t(translationKey) == translationKey) {
    return;
  }
  if (response.statusCode > 300) {
    window.vm.$snotify.error(window.vm.$t(`${translationKey}Fail`));
  } else {
    window.vm.$snotify.success(window.vm.$t(`${translationKey}`));
  }
}

export function processGraphQLErrors(graphQLErrors) {
  if (graphQLErrors) {
    const raw = graphQLErrors[0];
    if (raw) {
      const error = new ServerResponse();
      error.original = raw;
      error.validation = raw.message.error;
      error.message = raw.message.message;
      error.code = raw.message.statusCode;
      return error;
    }
  }
  return null;
}

export function queryToPromise(
  query,
  options = {
    onLoading: null,
    onChangeStatus: null,
    unsubscribe: true
  }
) {
  return new Promise((resolve, reject) => {
    try {
      const subscription = query.subscribe(o => {
        if (options.onChangeStatus) {
          options.onChangeStatus(o);
        }
        if (o.loading && options.onLoading) {
          options.onLoading({
            result: o,
            subscription
          });
        } else if (!o.loading) {
          resolve({
            result: o,
            subscription
          });
          if (options.unsubscribe) {
            subscription.unsubscribe();
          }
        }
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

export async function loadApp() {
  const requested =
    window.location.pathname !== "/loading"
      ? window.location.pathname + window.location.search
      : "/";
  checkIsMobile();
  blockUi();
  // router.replace('/loading', () => { }, () => { });
  // init the session store
  try {
    await store.dispatch("auth/init");
    await store.dispatch("auth/getSession");
    try {
      if (window.location.pathname.includes('share') !== false){
          let sharedHash = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

          const form = new GQLForm({
              urlHash: sharedHash
          });
          const shareLink = await store.dispatch("shareLink/getShareLinkByHash", form)
          if( typeof shareLink.id !== "undefined" ){
            store.dispatch("app/shared", shareLink)
          } else {
            store.dispatch("app/shared", "")
          }
        }

      if (store.getters["auth/user"]) {
        await store.dispatch("app/load");
        store.dispatch("app/asyncLoad");
        if (store.getters["auth/user"].mustChangePassword) {
          await router.replace(
            {
              name: "change-password",
              query: {
                i: new Date().getTime()
              }
            },
            () => {},
            () => {}
          );
          return;
        }
      } else {
        
        //else
        //store.dispatch("app/shared", "")

        router.replace("/login").catch(() => {});
      }
      // eslint-disable-next-line
    } catch (ex) {
      router.replace("/login").catch(() => {});
    }
  } catch (ex) {
    console.log(ex);
    // router.replace('/login').catch(() => { });
  } finally {
    // make the router ready
    router.replace(requested).catch(() => {});
    console.log(window);
    console.log("App loaded!");
    store.dispatch("app/loaded");

    unblockUi();
  }
}

export function getSupportedLocales() {
  const annotatedLocales = [];
  for (const code of Object.keys(supportedLocales)) {
    annotatedLocales.push({
      code,
      name: supportedLocales[code]
    });
  }
  return annotatedLocales;
}

export function isSuperUser() {
  if (
    store.state.auth.session &&
    store.state.auth.session.user.can("core/company/manage")
  ) {
    return true;
  }
  return false;
}
