<script lang="ts">
    import { get_random_word, get_user_data_connection } from "../lib/db";
    import axios from "axios";
    import type { Word } from "../lib/types";
    import WordDisplay from "./WordDisplay.svelte";

    const check_if_word_valid = async (word: string) => {
        if (word === "") {
            return false;
        }
        return axios
            .get(
                `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=70c4d258-f035-4fc4-bc86-78c8b92c2989`,
            )
            .then((r) => {
                console.log(r);
                if (
                    typeof r.data[0] === "string" ||
                    r.data[0] instanceof String
                ) {
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
                return { word: word, definition: r.data[0].shortdef[0] };
            })
            .catch((e) => {
                console.log(e);
                return { word: word, definition: "" };
            });
    };

    const get_valid_word_data = async () => {
        let curr_word = "";
        do {
            curr_word = get_random_word();
        } while (!(await check_if_word_valid(curr_word)));

        return get_word_data(curr_word);
    };

    let curr_word_data = $derived.by(get_valid_word_data);

    let con = get_user_data_connection();
</script>

<div class="container box">
    <h1 class="title">Word Generator</h1>

    {#await curr_word_data}
        <!-- <p>loading...</p> -->
        <WordDisplay word_data={{ word: "", definition: "" }}></WordDisplay>
    {:then word_data}
        <WordDisplay {word_data}>
            {#if $con.favorite_words.find((w, i) => {
                return w.word === word_data.word;
            }) !== undefined}
                <button
                    class="button is-danger is-outlined is-fullwidth"
                    onclick={() => {
                        $con.favorite_words = $con.favorite_words.filter(
                            (i) => {
                                return i.word !== word_data.word;
                            },
                        );
                    }}>Remove word from favorites</button
                >
            {:else}
                <button
                    class="button is-link is-outlined is-fullwidth"
                    onclick={() => {
                        $con.favorite_words =
                            $con.favorite_words.concat(word_data);
                    }}>Save to Favorites</button
                >
            {/if}
        </WordDisplay>
        <button
            class="button is-outlined is-fullwidth is-warning"
            onclick={() => {
                curr_word_data = get_valid_word_data();
            }}>Refresh word</button
        >
    {/await}
</div>
