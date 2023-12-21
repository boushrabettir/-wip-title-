<script>
    export let form;
</script>
<div class="sign-in-wrapper">
    <div class="sign-in-content">
        <form class="auth-form" method="post" action="?/OAuth2">
            <div>
                <button class="btn-auth"    type="submit">
                <img class="btn-auth-img" src='/google_signin_buttons/web/1x/ btn_google_signin_dark_pressed_web.png' alt='google sign in'/>
                </button>
            </div>
        </form>
    </div>
</div>

<style>
    div{
        color: black;
        margin-bottom: .5em;
        text-shadow: 0 0 2px white;
    }
</style>
