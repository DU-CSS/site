<script lang="ts">
	let { category} = $props();
</script>

<div class="category {category.get('name')}" style="background-color: var(--light{category.get('color')})">
    <div class="noise"></div>
    <img src={category.get('src')} alt={category.get('alt')} />
</div>

<style>
	.noise::before {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 97;
		filter: contrast(5);
		transform: scale(2);
		content: '';
		position: absolute;
		inset: 0;
		opacity: 0.2;
		background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence baseFrequency='.75' numOctaves='3'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
	}
	.category {
		overflow: hidden;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5px;
		border-radius: 0px var(--border-radius);
		border: 2px solid var(--gray);
		height: 50px;
		width: 50px;
		/* border-top: 3px solid var(--orange);
        border-right: 3px solid var(--orange);
        border-bottom: 2px solid var(--gray);
        border-left: 2px solid var(--gray);
        box-shadow: inset 7px -2px 7px rgb(220, 212, 188); **/
	}
	.category.competition img {
		filter: contrast(60%) saturate(400%) brightness(110%) drop-shadow(1px 1px var(--purple))
			drop-shadow(-1px -1px var(--purple)) drop-shadow(4px 1px var(--purple));
	}
	.category.career img {
		filter: contrast(150%) hue-rotate(-30deg) saturate(80%) drop-shadow(1px 1px var(--teal))
			drop-shadow(-1px -1px var(--teal)) drop-shadow(4px 1px var(--teal));
	}
	.category.social img {
		filter: contrast(130%) hue-rotate(-80deg) saturate(70%) brightness(110%)
			drop-shadow(1px 1px var(--green)) drop-shadow(-1px -1px var(--green))
			drop-shadow(5px 1px var(--green));
	}
	.category.gaming img {
		filter: invert(20%) sepia(80%) saturate(7) hue-rotate(90deg) brightness(110%)
			drop-shadow(1px 1px var(--red)) drop-shadow(-1px -1px var(--red))
			drop-shadow(4px 1px var(--red));
		transform: scale(1.1);
	}
	.category.tech img {
		filter: hue-rotate(160deg) contrast(80%) saturate(500%) brightness(90%)
			drop-shadow(1px 1px var(--orange)) drop-shadow(-1px -1px var(--orange))
			drop-shadow(4px 1px var(--orange));
	}
	.category img {
		height: 75%;
		object-fit: contain;
	}
</style>
