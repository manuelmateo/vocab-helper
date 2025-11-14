import { writable } from "svelte/store";
import { type UserData } from "../lib/types";

export const get_user_data_connection = () => {
  const store = writable<UserData>(
    JSON.parse(localStorage.getItem("userdata") ?? ""),
  );
  store.subscribe((val) => (localStorage.content = val));
  return store;
};
