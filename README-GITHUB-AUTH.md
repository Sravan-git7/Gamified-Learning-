# Setting Up GitHub Authentication with Supabase

This guide will walk you through the process of setting up GitHub authentication for your application using Supabase.

## Prerequisites

- A Supabase project
- A GitHub account
- Your application's URL (for development: http://localhost:5173)

## Step 1: Register a new OAuth Application on GitHub

1. Go to your GitHub account settings
2. Navigate to "Developer settings" > "OAuth Apps" > "New OAuth App"
3. Fill in the form:
   - **Application name**: Your app name (e.g., "Gamified Learning Platform")
   - **Homepage URL**: Your application's homepage URL (e.g., http://localhost:5173)
   - **Application description**: (Optional) A description of your application
   - **Authorization callback URL**: This should be your Supabase authentication callback URL, which follows this format:
     ```
     https://<YOUR_SUPABASE_PROJECT_ID>.supabase.co/auth/v1/callback
     ```
     You can find your Supabase URL in the Supabase dashboard under Project Settings > API.

4. Click "Register application"
5. After registering, you'll see your Client ID. Click "Generate a new client secret" to create a Client Secret.
6. Make note of both the Client ID and Client Secret, you'll need them in the next step.

## Step 2: Configure GitHub Auth Provider in Supabase

1. Go to your Supabase project dashboard
2. Navigate to "Authentication" > "Providers"
3. Find and click on "GitHub" in the list of providers
4. Toggle the "Enabled" switch to on
5. Enter the Client ID and Client Secret from GitHub
6. Set the Redirect URL (if needed). The default should work for most cases
7. Click "Save"

## Step 3: Configure Site URL in Supabase

1. In your Supabase dashboard, go to "Authentication" > "URL Configuration"
2. In the "Site URL" field, enter your app's URL (e.g., http://localhost:5173 for local development)
3. Add any additional redirect URLs if needed
4. Click "Save"

## Step 4: Testing GitHub Authentication

After completing the setup:

1. Restart your application if it's already running
2. Try signing up or logging in with GitHub
3. You should be redirected to GitHub to authorize your application
4. After authorization, you'll be redirected back to your application and logged in

## Troubleshooting

- If authorization fails, check that your Client ID and Client Secret are correct
- Verify that your redirect URLs are properly configured in both GitHub and Supabase
- Check the Supabase authentication logs for specific error messages
- Ensure your application's URL matches what you've configured in Supabase and GitHub

## Production Deployment

For production:

1. Update the Site URL and redirect URLs in Supabase to your production domain
2. Update the Homepage URL and Authorization callback URL in your GitHub OAuth app settings
3. Make sure your production environment variables are properly set

## Additional Resources

- [Supabase Authentication Documentation](https://supabase.com/docs/guides/auth)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) 