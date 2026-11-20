<script lang="ts">
	import '$lib/style.css';
	import { enhance } from '$app/forms';

	// Blank project
	const projectParams = {
		id: 0,
		date_submitted: null,
		title: '',
		overview: '',
		repo_link: '',
		demo_path: null,
		featured: false,
		stage_id: 2
	};
	let showForm = $state(false);
	let isReadOnly = $state(false);
	let demoFile: File | null = $state(null);
	let demoPreview = $state('');

	let projectToEdit = $state(projectParams);
	let { form, data } = $props();
	let submitting = $state(false);

	// Reset form to blank
	$effect(() => {
		if (form?.success) {
			showForm = false;
			isReadOnly = false;
			projectToEdit = projectParams;
		}
	});

	// Fill form with selected project
    function setProject(project: any) {
        projectToEdit = {
            ...project,
            date_submitted: project.date_submitted.toLocaleDateString('en-CA'),
        }
		isReadOnly = true;
		showForm = true;
    }
	function newProject() {
		projectToEdit = projectParams;
		demoPreview = '';
		isReadOnly = false;
		showForm = true;
	}
	function onDemoChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		demoFile = input.files?.[0] ?? null;
		if (demoPreview) {
			URL.revokeObjectURL(demoPreview);
		}
		demoPreview = demoFile ? URL.createObjectURL(demoFile) : '';
	}
</script>

<svelte:head>
	<!-- Icons loaded here. Specify which ones to load in the link after "icon_names=" -->
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=delete&display=block"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<section class="hero" style="display: flex;">
		<h1>Edit Projects</h1>
	</section>
	<section>
		<div>
			<h3>All Projects</h3>
			<button onclick={newProject}>New Project</button>
			<div>
				{#each data.projects as project}
					<a href="/edit-projects" onclick={() => (setProject(project))}>
						<p>{project.date_submitted.toLocaleDateString()} {project.title}</p>
					</a>
				{/each}
				{#if data.projects.length === 0}
					<p>No Projects Yet</p>
				{/if}
			</div>
		</div>
		{#if showForm}
			<div style="width: 100%;">
				<form method="POST" action="?/save" enctype="multipart/form-data" use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update();
						submitting = false;
					};
				}}>
					{#if form?.error}
						<p class="error">{form.error}</p>
					{/if}
					<input type="hidden" name="id" bind:value={projectToEdit.id} />
					<div>
						<p>Stage*</p>
						<select name="stage_id" required
							bind:value={projectToEdit.stage_id} >
							{#each data.stages as stage}
								<option value={stage.id}>{stage.title}</option>
							{/each}
						</select>
					</div>
					<div>
						<p>Featured</p>
						<input type="checkbox" name="featured" bind:checked={projectToEdit.featured}/>
					</div>
					<div>
						<p>Submitted Date*</p>
						<input required type="date" name="date_submitted" bind:value={projectToEdit.date_submitted} disabled={isReadOnly} />
					</div>
					<div style="grid-column: span 3;">
						<p>Title*</p>
						<input required type="text" name="title" bind:value={projectToEdit.title} disabled={isReadOnly} />
					</div>
					<div style="grid-column: span 3;">
						<p>Overview*</p>
						<input required type="text" name="overview" bind:value={projectToEdit.overview} disabled={isReadOnly} />
					</div>
					<div style="grid-column: span 3;">
						<p>Repo Link</p>
						<input type="text" name="repo_link" bind:value={projectToEdit.repo_link} disabled={isReadOnly} />
					</div>
					<div style="grid-column: span 3;">
						<p>Demo Path*</p>
						{#key demoPreview}
							{#if demoPreview}
								<video width="400" controls>
									<source src={demoPreview} type="video/mp4" />
								</video>

							{:else if projectToEdit.demo_path !== null}
								<video width="400" controls>
									<source src={projectToEdit.demo_path} type="video/mp4" />
								</video>
							{/if}
						{/key}
						{#if !isReadOnly}
						<input
							required
							type="file"
							name="demo_path"
							accept="video/mp4"
							onchange={onDemoChange}
						/>
						{/if}
					</div>
					<button style="grid-column: span 2;" type="submit"
						disabled={submitting} formaction="?/save">
						{submitting ? "Submitting..." : "Don't Forget to Save!"} </button>
					{#if !isReadOnly}
						<button class="icon" type="reset" onclick={onDemoChange}> Reset </button>
					{:else}
						<button class="icon" type="submit"
							formaction="?/delete" formmethod="POST"
							onclick={(event) => {
								if (!confirm('Are you sure you want to delete this project?')) {
									newProject();
									event.preventDefault();
								}
							}}> Delete Project </button>
					{/if}
				</form>
			</div>
		{/if}
	</section>
</main>

<style>
	form {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 30px;
	}
	form .error {
		grid-column: span 3;
	}
</style>