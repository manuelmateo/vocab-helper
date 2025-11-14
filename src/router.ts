import { createRouter } from "sv-router";
import MainPage from "./routes/MainPage.svelte";
import FavoriteWords from "./routes/FavoriteWords.svelte";

export const { p, navigate, isActive, route } = createRouter({
  "/": MainPage,
  "/favorites": FavoriteWords,
});
