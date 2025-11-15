import { writable } from "svelte/store";
import { type UserData, type Word } from "../lib/types";
import words_dict from "../seven_letter_words.json";

export const get_user_data_connection = () => {
  const current_data = localStorage.getItem("userdata");

  const dummy_obj: UserData = { blocked_words: [], favorite_words: [] };

  const store = writable<UserData>(
    current_data ? JSON.parse(current_data) : JSON.stringify(dummy_obj),
  );
  store.subscribe((val) => (localStorage.userdata = JSON.stringify(val)));
  return store;
};

export const add_word_to_favorites = (word_data: Word) => {
  get_user_data_connection().update((u) => {
    u.favorite_words.push(word_data);
    return u;
  });
};

export const remove_words_from_favorites = (word_data: Word) => {
  get_user_data_connection().update((u) => {
    const i = u.favorite_words.indexOf(word_data);
    if (i > -1) {
      return u;
    }
    u.favorite_words.splice(i, 1);
    return u;
  });
};

export const add_word_to_block_list = (word_data: Word) => {
  get_user_data_connection().update((u) => {
    u.blocked_words.push(word_data);
    return u;
  });
};

export const remove_words_from_blocked = (word_data: Word) => {
  get_user_data_connection().update((u) => {
    const i = u.blocked_words.indexOf(word_data);
    if (i > -1) {
      return u;
    }
    u.blocked_words.splice(i, 1);
    return u;
  });
};

export const get_favorite_words = () => {
  const current_data = localStorage.getItem("userdata");

  return JSON.parse(current_data!).favorite_words ?? [];
};

export const get_blocked_words = () => {
  const current_data = localStorage.getItem("userdata");

  return JSON.parse(current_data!).blocked_words ?? [];
};

const get_random_element = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const get_random_word = (): string => {
  // console.log(Object.keys(words_dict).length);
  return get_random_element(words_dict)["word"];
};
