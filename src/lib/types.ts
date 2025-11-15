export interface Word {
  definition: string;
  word: string;
}

export interface UserData {
  favorite_words: Word[];
  blocked_words: Word[];
}
