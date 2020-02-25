<script>
    import { fade, fly } from 'svelte/transition';

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    
    function remove() {
		dispatch('remove', { id });
	}

	function toggleStatus() {
        let newStatus = !complete;
		dispatch('toggle', {
            id,
            newStatus
        });
    }
    
    export let id; // document ID
    export let text;
    export let complete;
    export let tag;
</script>

<style>
    .is-complete {
        text-decoration: line-through;
        color: green;
    }

    li {
        display: flex;
        font-size: 12px;
    }

    span {
        margin-right: auto;
    }

    .is-button {
        font-size: 8px;
    }

    .text {
        margin-left: 5px;
    }

    .todo-tags {
        margin-top: 4px;
    }
</style>


<li in:fly="{{ x: 900, duration: 500 }}" out:fade>

{#if complete}
    <div class="todo-tags">
        { tag }
    </div>
	<button class="is-button" on:click={toggleStatus}>
		❌
	</button>
    <button class="is-button" on:click={remove}>
        🗑️
    </button>
    <span class="is-complete text">
        { text }
    </span>
{:else}
    <div class="todo-tags">
        { tag }
    </div>
	<button class="is-button" on:click={toggleStatus}>
		✅
	</button>
    <button class="is-button" on:click={remove}>
        🗑️
    </button>
    <span class="text">
        { text }
    </span>
{/if}
</li>