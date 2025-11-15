<script lang="ts">
    import { get_random_word, get_user_data_connection } from "../lib/db";
    import axios from "axios";
    import type { Word } from "../lib/types";
    import WordDisplay from "./WordDisplay.svelte";
    import { add_word_to_block_list, add_word_to_favorites } from "../lib/db";

    let random_word = $state("");

    const check_if_word_valid = async (word: string) => {
        if (word === "") {
            return false;
        }
        return axios
            .get(
                `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=70c4d258-f035-4fc4-bc86-78c8b92c2989`,
            )
            .then((r) => {
                if (r.data.length > 1) {
                    return false;
                }
                return true;
            })
            .catch((e) => {
                console.log(e);
                return false;
            });
    };

    const get_word_data = async (word: string) => {
        return axios
            .get(
                `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=70c4d258-f035-4fc4-bc86-78c8b92c2989`,
            )
            .then((r) => {
                console.log(r.data);
                console.log(r.data[0].shortdef[0]);

                return { word: word, definition: r.data[0].shortdef[0] };
            })
            .catch((e) => {
                console.log(e);
                return { word: word, definition: "" };
            });
    };

    $effect(() => {
        random_word = get_random_word();
    });

    let is_valid_word = $derived.by(() => {
        const word_valid = check_if_word_valid(random_word);
        console.log(word_valid);
        return word_valid;
    });

    let word_data = $derived.by(() => {
        return get_word_data(random_word);
    });

    let con = get_user_data_connection();
</script>

<div class="container box">
    <h1 class="title">Word Generator</h1>

    {#await is_valid_word}
        <p>loading...</p>
    {:then word_valid}
        {#if word_valid}
            {#await word_data}
                <p>loading...</p>
            {:then word_info}
                <WordDisplay word_data={word_info}>
                    {#if $con.favorite_words.find((w, i) => {
                        return w.word === word_info.word;
                    }) !== undefined}
                        <button
                            class="button is-danger is-outlined is-fullwidth"
                            onclick={() => {
                                $con.favorite_words =
                                    $con.favorite_words.filter((i) => {
                                        return i.word !== word_info.word;
                                    });
                            }}>Remove word from favorites</button
                        >
                    {:else}
                        <button
                            class="button is-link is-outlined is-fullwidth"
                            onclick={() => {
                                $con.favorite_words =
                                    $con.favorite_words.concat(word_info);
                            }}>Save to Favorites</button
                        >
                    {/if}
                </WordDisplay>
            {/await}
        {:else}
            <p>couldn't load word! refresh pls</p>
        {/if}
    {/await}
</div>
