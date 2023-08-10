const gitToken = process.env.GITHUB_TOKEN;

const repositories = [
    "HeavyConnected/HC-Api",
    "HeavyConnected/dashboard",
    "HeavyConnected/HC-App",
    "HeavyConnected/HC-pdf",
];

async function getAllPullRequests(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`;
    const headers = {
        Authorization: `token ${gitToken}`,
    };

    try {
        const response = await fetch(url, { headers });

        if (response.ok) {
            return await response.json();
        } else {
            return { error: "Failed to make the GET request." };
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
}

async function countApprovedReviews(owner, repo) {
    const allPullRequests = await getAllPullRequests(owner, repo);

    if (!allPullRequests) {
        return null;
    }

    const developers = {};

    for (const pullRequest of allPullRequests) {
        console.log("Getting reviews for:", pullRequest.url);

        const author = pullRequest.user.login;
        if (!developers[author]) {
            developers[author] = {
                pullRequests: 1,
                approvals: 0,
            };
        } else {
            developers[author].pullRequests++;
        }

        const reviewsUrl = pullRequest.url + "/reviews";
        const reviewsResponse = await fetch(reviewsUrl, {
            headers: {
                Authorization: `token ${gitToken}`,
            },
        });
        const reviews = await reviewsResponse.json();

        reviews.forEach((review) => {
            const reviewer = review.user.login;
            if (review.state === "APPROVED") {
                if (!developers[reviewer]) {
                    developers[reviewer] = {
                        pullRequests: 0,
                        approvals: 1,
                    };
                } else {
                    developers[reviewer].approvals++;
                }
            }
        });
    }

    return developers;
}

async function getPullRequestsAndReviews() {
    const allData = {};

    // Fetch data for all repositories simultaneously using Promise.all
    await Promise.all(
        repositories.map(async (repo) => {
            console.log(`Getting data for ${repo}...`);
            const [owner, repoName] = repo.split("/");
            const data = await countApprovedReviews(owner, repoName);

            if (data) {
                // Merge data from the current repository with existing data
                for (const developer in data) {
                    if (!allData[developer]) {
                        allData[developer] = data[developer];
                    } else {
                        allData[developer].pullRequests +=
                            data[developer].pullRequests;
                        allData[developer].approvals +=
                            data[developer].approvals;
                    }
                }
            }
        })
    );

    return allData;
}

export { getPullRequestsAndReviews };
