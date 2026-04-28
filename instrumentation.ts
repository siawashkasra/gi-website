export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { runMigrationsIfNeeded } = await import("@/db/index");
    runMigrationsIfNeeded();
  }
}
