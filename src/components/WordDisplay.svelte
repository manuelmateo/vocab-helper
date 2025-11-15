<script lang="ts">
    let props = $props();

    const capitalize = (s: string) => {
        if (s === "") {
            return "";
        }
        return s[0].toUpperCase() + s.slice(1);
    };
</script>

<article class="panel is-info">
    <p class="panel-heading">{capitalize(props.word_data.word)}</p>

    <div class="panel-block">
        {capitalize(props.word_data.definition)}
    </div>

    <div class="panel-block">
        {#if props.children}
            {@render props.children()}
        {/if}
    </div>
</article>
