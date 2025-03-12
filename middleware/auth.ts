export default defineNuxtRouteMiddleware(async () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  if (!user.value) return navigateTo("/login");

  // Fetch user profile from Supabase
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('completed_onboarding')
    .eq('id', user.value.id)
    .single();

  if (error || !profile) {
    console.error("Error fetching profile:", error);
    return;
  }

  // Redirect to intro page if profile is incomplete
  if (!profile.completed_onboarding) {
    return navigateTo("/intro");
  }
});
