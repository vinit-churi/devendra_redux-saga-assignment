import { Octokit } from "octokit";
export const octokit = new Octokit({
    auth: "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",
});
export async function getMostStarredRepos() {
    try {
        // Set up the search parameters
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const query = `created:>${thirtyDaysAgo.toISOString()} sort:stars-desc`;
        const perPage = 30;

        // Make the request to search repositories
        const response = await octokit.request("GET /search/repositories", {
            q: query,
            per_page: perPage,
        });

        // Extract the list of repositories from the response
        const repositories = response.data.items;

        // Print the list of repository names and their star counts
        return repositories;
    } catch (error) {
        console.error(
            "Error fetching most starred repositories:",
            error.message
        );
    }
}
