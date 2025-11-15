<script lang="ts">
    let props = $props();
</script>

<article class="panel is-info">
    <p class="panel-heading">Word: {props.word_data.word}</p>

    <div class="panel-block">
        Definition: {props.word_data.definition}
    </div>

    <div class="panel-block">
        {#if props.children}
            {@render props.children()}
        {/if}
    </div>
</article>
