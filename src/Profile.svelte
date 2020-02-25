<script>
    export let displayName;
    export let photoURL;
    // export let uid;
</script>

<style>
    .pic {
        border-radius: 75px;
        height: 50px;
        width: 50px;
    }
    .name {
        margin-top: 5px !important;
    }
</style>

<div class="pic-and-name"> 
    <img class="pic" src={ photoURL } alt="user avatar">
    <h6 class="name">Hi { displayName }!</h6>
</div>



<!-- <p>Your userID is { uid }</p> -->
