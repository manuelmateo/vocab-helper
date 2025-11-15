<script lang="ts">
    const default_menu_class = "navbar-menu";
    const active_menu_class = "navbar-menu is-active";

    const default_burger_class = "navbar-burger";
    const active_burger_class = "navbar-burger is-active";

    let current_burger_class = $state(default_burger_class);
    let current_menu_class = $state(default_menu_class);

    let toggled = $state(false);

    const handle_click = () => {
        toggled = !toggled;
        if (toggled) {
            current_burger_class = active_burger_class;
            current_menu_class = active_menu_class;
        } else {
            current_burger_class = default_burger_class;
            current_menu_class = default_menu_class;
        }
    };
</script>

<nav class="navbar">
    <div class="navbar-brand">
        <button
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            onclick={handle_click}
        >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </button>
    </div>

    <div class={current_menu_class}>
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a class="button is-dark" href="/">
                        <strong>Word Generator</strong>
                    </a>
                    <a class="button is-dark" href="/favorites">
                        Favorite Words
                    </a>
                </div>
            </div>
        </div>
    </div>
</nav>
