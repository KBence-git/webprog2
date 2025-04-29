<script>
    export let link;
    export let imgSrc;
    export let altText;
    export let title;
</script>

<a href={link} class="hero-card">
    <img src={imgSrc} alt={altText} class="hero-icon" />
    <h2>{title}</h2>
</a>
