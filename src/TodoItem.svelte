<script>
    import Modal from './Modal.svelte';
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

    function notesStatus(event) {
        let newNote = notes;
        dispatch('notes', { 
            id,
            newNote 
        });
        showModal = false;
    }
    
    export let id; // document ID
    export let text;
    export let complete;
    export let tag;
    export let notes;

    let showModal = false;
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
        margin-top: 3px;
    }

    .todo-tags {
        margin-top: 2px;
        margin-right: 3px;
    }

    .info-style {
        margin-top: 2px;
        margin-left: auto;
        cursor: pointer;
    }
</style>


<li in:fly="{{ x: 900, duration: 500 }}" out:fade>
    {#if complete}
        <div class="todo-tags">
            { tag }
        </div>
        <button class="is-button" on:click={toggleStatus} style="margin-right: 2px;"> 
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
        <button class="is-button" on:click={toggleStatus} style="margin-right: 2px;">
            ✅
        </button>
        <button class="is-button" on:click={remove}>
            🗑️
        </button>
        <span class="text">
            { text }
        </span>
    {/if}

    <div class="info-style" on:click="{() => showModal = true}">
        ℹ️
    </div>

    {#if showModal}
        <Modal on:close="{() => showModal = false}">
            <h3 slot="header">
                {tag} {text}
            </h3>
            <textarea style="width: 100%; height: 200px;" bind:value={notes}></textarea>
            <hr>
            <button on:click={notesStatus}>Save</button>
        </Modal>
    {/if}
</li>