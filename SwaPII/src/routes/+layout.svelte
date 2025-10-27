<script>
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import { _ } from "svelte-i18n";
	import LanguageSwitcher from "$lib/components/LanguageSwitcher.svelte";
	import "../app.css";

	let { data, children } = $props();

	// Use $derived for reactive values
	let session = $derived(data.session);
	let supabase = $derived(data.supabase);
	let userProfile = $derived(data.userProfile);

	onMount(() => {
		const { data: authData } = supabase.auth.onAuthStateChange(
			(_, newSession) => {
				if (newSession?.expires_at !== session?.expires_at) {
					invalidate("supabase:auth");
				}
			},
		);

		return () => authData.subscription.unsubscribe();
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_missing_attribute -->
<div class="drawer">
	<input id="drawer-toggle" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="navbar bg-base-100 shadow-sm">
			<div class="navbar-start">
				<!-- Mobile menu button -->
				<label
					for="drawer-toggle"
					class="btn btn-square btn-ghost lg:hidden"
				>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</label>
				<!-- Logo -->
				<a
					href="/"
					class="btn-link decoration-transparent font-bold text-xl ml-2 flex items-center gap-2"
				>
					<img
						src="/favicon_transparent.svg"
						alt="SwaPII Logo"
						class="w-8 h-8"
					/>
					SwaPII
				</a>
			</div>

			<!-- Desktop menu -->
			<div class="navbar-center hidden lg:flex">
				<ul class="menu menu-horizontal px-1">
					<li>
						<a href="/dashboard">{$_("navigation.dashboard")}</a>
					</li>
					<li>
						<a href="/pricing">{$_("navigation.pricing")}</a>
					</li>
					<li>
						<a href="/projects">{$_("navigation.projects")}</a>
					</li>
					<li>
						<a href="/datasets">{$_("navigation.datasets")}</a>
					</li>
					<li>
						<a href="/models">{$_("navigation.models")}</a>
					</li>
				</ul>
			</div>

			<div class="navbar-end">
				<!-- Language dropdown with buttons -->
				<div class="mr-4">
					<LanguageSwitcher />
				</div>

				<!-- Auth link -->
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<a href="/auth" class="btn btn-ghost btn-circle avatar">
					<div
						class="w-10 rounded-full items-center justify-center"
						style="display: flex;"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 text-zinc-400"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
							/>
						</svg>
					</div>
				</a>
			</div>
		</div>

		<!-- Page content -->
		<main class="flex-1">
			{@render children()}
		</main>
	</div>

	<!-- Mobile drawer sidebar -->
	<div class="drawer-side">
		<label for="drawer-toggle" class="drawer-overlay"></label>
		<aside class="min-h-full w-64 bg-base-200">
			<!-- Sidebar header -->
			<div class="p-4">
				<a
					href="/"
					class="btn-link decoration-transparent font-bold text-xl ml-2 flex items-center gap-2"
				>
					<img
						src="/favicon_transparent.svg"
						alt="SwaPII Logo"
						class="w-8 h-8"
					/>
					SwaPII
				</a>
			</div>
			<!-- Mobile menu -->
			<ul class="menu p-4 space-y-2">
				<li>
					<a href="/dashboard" class="text-base"
						>{$_("navigation.dashboard")}</a
					>
				</li>
				<li>
					<a href="/pricing" class="text-base"
						>{$_("navigation.pricing")}</a
					>
				</li>
				<li>
					<a href="/projects" class="text-base"
						>{$_("navigation.projects")}</a
					>
				</li>
				<li>
					<a href="/datasets" class="text-base"
						>{$_("navigation.datasets")}</a
					>
				</li>
				<li>
					<a href="/models" class="text-base"
						>{$_("navigation.models")}</a
					>
				</li>
			</ul>
		</aside>
	</div>
</div>
