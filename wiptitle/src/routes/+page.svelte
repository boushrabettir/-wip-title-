<h1>WIP CONVERTER</h1>


<script lang="ts">
    import { onMount } from 'svelte';
    import { runSample } from '../api/youtube';

    onMount(() => {
        console.log('Hello!');
        runSample();
    });
</script>



<style>
h1
    {
    text-align: center;
    color: rgb(255, 255, 255);
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-style: normal;
    font-size: 2em;
    }
</style>