<script lang="ts">
    import Navbar from "../components/Navbar.svelte";
    import WordDisplay from "../components/WordDisplay.svelte";
    import { get_user_data_connection } from "../lib/db";
    import type { Word } from "../lib/types";

    let con = get_user_data_connection();

    // let favorite_words = $state($con.favorite_words);
</script>

<Navbar />

<div class="container box">
    <h1 class="title">Favorite Words</h1>
    {#each $con.favorite_words as word_data}
        <WordDisplay {word_data}>
            <button
                class="button is-danger is-outlined is-fullwidth"
                onclick={() => {
                    $con.favorite_words = $con.favorite_words.filter((i) => {
                        return i.word !== word_data.word;
                    });
                }}>Remove word from favorites</button
            >
        </WordDisplay>
    {/each}
</div>
