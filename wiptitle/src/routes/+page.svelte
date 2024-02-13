<h1>WIP CONVERTER</h1>


<script lang="ts">
    import { onMount } from 'svelte';
    import { main } from '../api/youtube';
  
    // Load Google API client library
    const loadGoogleApi = () => {
      return new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => resolve(); // Specify the type of onload callback
        document.body.appendChild(script);
      });
    };
  
    onMount(async () => {
      console.log('Loading Google API...');
      await loadGoogleApi();
      console.log('Google API loaded.');
      
      // Initialize and use Google API
      await main();
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