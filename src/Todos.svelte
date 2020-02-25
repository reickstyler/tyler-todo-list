<script>
    import TodoItem from './TodoItem.svelte';
    import { db } from './firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';

    export let uid;

    let text = 'some task';

    let tag = '';

    const query = db.collection('todos').where('uid', '==', uid).orderBy('tag');

    const todos = collectionData(query, 'id').pipe(startWith([]));

    function add() {
        db.collection('todos').add({ uid, text, complete: false, created: Date.now(), tag });
        text = '';
        tag = '';
    }

    function updateStatus(event) {
        console.log(event);
        const { id, newStatus } = event.detail;
        db.collection('todos').doc(id).update({ complete: newStatus });
    }

    function removeItem(event) {
        const { id } = event.detail;
        db.collection('todos').doc(id).delete();
    }
</script>

<style>
    input { display: block }
</style>

<ul style="margin-left: 0px;">
	{#each $todos as todo}

        <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
        
	{/each}
</ul>

<div style="display:flex;">
    <input bind:value={text}>
    <select style="margin-left:5px;" bind:value={tag}>
        <option></option>
        <option>{"🏢"}</option>
        <option>{"🏠"}</option>
    </select>
</div>

<hr>

<p>Your task: <strong>{ text }</strong> with tag { tag }</p>

<button class="button is-info" on:click={add}>Add Task</button>