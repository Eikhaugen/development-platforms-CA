export default async function router(pathname = window.location.pathname) {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("postId");

  switch (true) {
    case pathname === "/":
      await import("./views/welcome.js").then((module) => module.default());
      break;
    case pathname === "/feed/":
      await import("./views/home.js").then((module) => module.default());
      break;
    case pathname === "/auth/login/":
      await import("./views/login.js").then((module) => module.default());
      break;
    case pathname === "/auth/register/":
      await import("./views/register.js").then((module) => module.default());
      break;
    case pathname === "/post/": {
      if (postId) {
        await import("./views/post.js").then((module) => module.default(postId));
      } else {
        console.error("No postId found in URL");
      }
      break;
    }
    case pathname === "/myprofile/":
      await import("./views/myProfile.js").then((module) => module.default());
      break;
    case pathname === "/profileEdit/":
      await import("./views/profileEdit.js").then((module) => module.default());
      break;
    default:
      await import("./views/notFound.js").then((module) => module.default());
  }
}
