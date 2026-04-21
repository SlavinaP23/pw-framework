import fs from 'fs';
import path from 'path';

/**
 * Playwright Global Teardown hook.
 * Resets the authentication state by clearing the contents of the user.json file.
 * This ensures that subsequent test runs start without leaked session data
 * while maintaining the file structure for the next setup.
 */
async function globalTeardown() {
  const authFile = path.join(process.cwd(), '.auth', 'user.json');

  console.log('\n🧹 Global Teardown: Starting cleanup...');

  if (fs.existsSync(authFile)) {
    try {
      // Overwrite with an empty object instead of deleting to avoid path errors in setup
      fs.writeFileSync(authFile, JSON.stringify({}, null, 2));
      console.log(`✅ Cleared content of: ${authFile}`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Failed to clear file content: ${msg}`);
    }
  } else {
    console.log('💡 Teardown: .auth/user.json not found. No action taken.');
  }
}

export default globalTeardown;
