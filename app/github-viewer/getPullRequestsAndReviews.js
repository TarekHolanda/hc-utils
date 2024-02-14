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
let devs = {};

async function getPullRequestsByRepository(repository) {
    const url = `https://api.github.com/repos/HeavyConnected/${repository}/pulls?state=all`;

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

async function countApprovedReviews(repository) {
    const allPullRequests = await getPullRequestsByRepository(repository);
    if (!allPullRequests) {
        return false;
    }

    try {
        for (const pullRequest of allPullRequests) {
            const reviewsUrl = pullRequest.url + "/reviews";
            const reviewsResponse = await fetch(reviewsUrl, { headers });
            const reviews = await reviewsResponse.json();

            if (devs[pullRequest.user.id]) {
                devs[pullRequest.user.id].pullRequests++;
            } else {
                devs[pullRequest.user.id] = {
                    name: names[pullRequest.user.id]
                        ? names[pullRequest.user.id]
                        : pullRequest.user.login,
                    pullRequests: 1,
                    reviews: 0,
                };
            }

            reviews.forEach((review) => {
                if (review.state === "APPROVED") {
                    if (devs[review.user.id]) {
                        devs[review.user.id].reviews++;
                    } else {
                        devs[review.user.id] = {
                            name: names[review.user.id]
                                ? names[review.user.id]
                                : review.user.login,
                            pullRequests: 0,
                            reviews: 1,
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
