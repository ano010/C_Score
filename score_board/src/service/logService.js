import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://0de61eef1d8a4e199a02249a3678b153@sentry.io/1895487"
  });
}

export default {
  init
};
