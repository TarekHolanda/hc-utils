const gitToken = process.env.GITHUB_TOKEN;
const headers = { Authorization: `token ${gitToken}` };
const repositories = [
    "HeavyConnected/HC-Api",
    "HeavyConnected/dashboard",
    "HeavyConnected/HC-App",
    "HeavyConnected/HC-pdf",
];
const names = {
    6921206: "Araújo",
    10663242: "Carlos",
    98056463: "Daniel",
    35413910: "Davi",
    15142247: "Eudálio",
    12729685: "Flávio",
    58297601: "Gusta",
    39544919: "Gustavo",
    103042520: "Iraneide",
    17833462: "Kerley",
    5270702: "Mardson",
    32681732: "Max",
    9063829: "Paulo Rennê",
    12614592: "Tárek",
    131719288: "Tárek",
};

const currentDate = new Date();

// Calculate start date (10 days ago)
const startDate = new Date(currentDate);
startDate.setDate(currentDate.getDate() - 14);

// Format dates as strings
const startDateStr = startDate.toISOString();
const currentDateStr = currentDate.toISOString();

let devs = {};

async function getPullRequestsByRepository(repository) {
    const url = `https://api.github.com/search/issues?q=repo:HeavyConnected/${repository}+is:pr+created:>${startDateStr}`;

    try {
        const response = await fetch(url, {
            headers,
            state: "all",
        });

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

async function countApprovedReviews(repository) {
    const allPullRequests = await getPullRequestsByRepository(repository);

    if (!allPullRequests) {
        return false;
    }

    try {
        for (const pullRequest of allPullRequests.items) {
            const reviewsUrl = `https://api.github.com/repos/HeavyConnected/${repository}/pulls/${pullRequest.number}/reviews`;
            const reviewsResponse = await fetch(reviewsUrl, { headers });
            const reviews = await reviewsResponse.json();
            console.log(reviews);

            if (devs[pullRequest.user.id]) {
                devs[pullRequest.user.id].pullRequests++;
            } else {
                devs[pullRequest.user.id] = {
                    name: names[pullRequest.user.id]
                        ? names[pullRequest.user.id]
                        : pullRequest.user.login,
                    pullRequests: 1,
                    reviews: 0,
                    approved: 0,
                    changes_requested: 0,
                };
            }

            reviews.forEach((review) => {
                if (review.state === "APPROVED") {
                    if (devs[review.user.id]) {
                        devs[review.user.id].reviews++;
                        devs[review.user.id].approved++;
                    } else {
                        devs[review.user.id] = {
                            name: names[review.user.id]
                                ? names[review.user.id]
                                : review.user.login,
                            pullRequests: 0,
                            reviews: 1,
                            approved: 1,
                            changes_requested: 0,
                        };
                    }
                } else if (review.state === "CHANGES_REQUESTED") {
                    if (devs[review.user.id]) {
                        devs[review.user.id].reviews++;
                        devs[review.user.id].changes_requested++;
                    } else {
                        devs[review.user.id] = {
                            name: names[review.user.id]
                                ? names[review.user.id]
                                : review.user.login,
                            pullRequests: 0,
                            reviews: 1,
                            approved: 0,
                            changes_requested: 1,
                        };
                    }
                }
            });
        }
    } catch (error) {
        return false;
    }

    return true;
}

async function getPullRequestsAndReviews() {
    const repositoriesLoaded = await Promise.all(
        repositories.map(async (repo) => {
            const [, repository] = repo.split("/");
            return await countApprovedReviews(repository);
        })
    );

    if (!repositoriesLoaded.every((r) => r === true)) {
        throw new Error(
            "Something went wrong! Please contact the HC Utils admin."
        );
    }

    return devs;
}

export { getPullRequestsAndReviews };
