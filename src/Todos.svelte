<script>
    import TodoItem from './TodoItem.svelte';
    import { db } from './firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';

    export let uid;

    let text = '';
    let tag = '';
    let notes = '';

    const query = db.collection('todos').where('uid', '==', uid).orderBy('tag');

    const todos = collectionData(query, 'id').pipe(startWith([]));

    function add() {
        db.collection('todos').add({ uid, text, complete: false, created: Date.now(), tag, notes });
        text = '';
        tag = '';
        notes = '';
    }

    function updateStatus(event) {
        const { id, newStatus } = event.detail;
        db.collection('todos').doc(id).update({ complete: newStatus });
    }

    function removeItem(event) {
        const { id } = event.detail;
        db.collection('todos').doc(id).delete();
    }

    function updateNotes(event) {
        const { id, newNote } = event.detail;
        db.collection('todos').doc(id).update({ notes: newNote });
    }
</script>

<style>
    input { display: block }
</style>

<ul style="padding-left: 0px;">
	{#each $todos as todo}

        <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} on:notes={updateNotes} />
        
	{/each}
</ul>

<div style="display:flex;">
    <input bind:value={text} placeholder="Enter task">
    <select style="margin-left:5px;" bind:value={tag}>
        <option></option>
        <option>{"🏢"}</option>
        <option>{"🏠"}</option>
        <option>{"🤖"}</option>
    </select>
</div>

<hr>

<p>Your task: <strong>{ text }</strong> { tag }</p>

<button class="button is-info" on:click={add}>Add Task</button>