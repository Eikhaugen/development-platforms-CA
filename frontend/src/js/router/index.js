export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("./views/welcome.js").then((module) => module.default());
      break;
    case "/feed/":
      await import("./views/home.js").then((module) => module.default());
      break;
    case "/auth/login/":
      await import("./views/login.js").then((module) => module.default());
      break;
    case "/auth/register/":
      await import("./views/register.js").then((module) => module.default());
      break;
    case "/post/":
      await import("./views/post.js").then((module) => module.default());
      break;
    case "/profile/":
      await import("./views/profile.js").then((module) => module.default());
      break;
    case "/profileEdit/":
      await import("./views/profileEdit.js").then((module) => module.default());
      break;
    default:
      await import("./views/notFound.js").then((module) => module.default());
  }
}
