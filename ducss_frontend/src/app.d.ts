// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			email: string,
			role: string,
			first_name: string,
			last_name: string
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
