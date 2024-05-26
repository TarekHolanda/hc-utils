const gitToken = process.env.GITHUB_TOKEN;
const headers = { Authorization: `token ${gitToken}` };
const repositories = [
    "HeavyConnected/HC-pdf",
    "HeavyConnected/HC-App",
    "HeavyConnected/dashboard",
    "HeavyConnected/HC-Api",
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

async function fetchJson(url) {
    const response = await fetch(url, { headers });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return response.json();
}

async function getPullRequestsByRepository(repository, startDate, endDate) {
    const url = `https://api.github.com/search/issues?q=repo:HeavyConnected/${repository}+is:pr+created:${startDate}..${endDate}`;

    try {
        return await fetchJson(url);
    } catch (error) {
        console.error("Error fetching pull requests:", error.message);
        return null;
    }
}

async function getReviewsByPullRequest(repository, pullRequestNumber) {
    const url = `https://api.github.com/repos/HeavyConnected/${repository}/pulls/${pullRequestNumber}/reviews`;
    try {
        return await fetchJson(url);
    } catch (error) {
        console.error(
            `Error fetching reviews for PR ${pullRequestNumber}:`,
            error.message
        );
        return [];
    }
}
let counter = 0;
function initializeDeveloper(devs, userId, username) {
    if (!devs[userId]) {
        devs[userId] = {
            name: names[userId] || username,
            pullRequests: 0,
            reviews: 0,
            approved: 0,
            changesRequested: 0,
        };
    }
}

function updateDeveloper(devs, review, username) {
    initializeDeveloper(devs, review.user.id, username);

    if (review.state === "APPROVED") {
        devs[review.user.id].approved++;
        devs[review.user.id].reviews++;
    }

    if (review.state === "CHANGES_REQUESTED") {
        devs[review.user.id].changesRequested++;
        devs[review.user.id].reviews++;
    }
}

async function getDataByRepository(devs, repository, startDate, endDate) {
    const allPullRequests = await getPullRequestsByRepository(
        repository,
        startDate,
        endDate
    );

    if (!allPullRequests) {
        return false;
    }

    try {
        await Promise.all(
            allPullRequests.items.map(async (pullRequest) => {
                const reviews = await getReviewsByPullRequest(
                    repository,
                    pullRequest.number
                );

                initializeDeveloper(
                    devs,
                    pullRequest.user.id,
                    pullRequest.user.login,
                    true
                );

                devs[pullRequest.user.id].pullRequests++;

                reviews.forEach((review) =>
                    updateDeveloper(devs, review, pullRequest.user.login)
                );
            })
        );
    } catch (error) {
        console.error("Error processing reviews:", error.message);
        return false;
    }

    return devs;
}

async function getPullRequests(startDate, endDate, setProgress) {
    let progressCount = 0;
    const devs = {};

    const repositoriesLoaded = await Promise.all(
        repositories.map(async (repo) => {
            const [, repository] = repo.split("/");
            const result = await getDataByRepository(
                devs,
                repository,
                startDate,
                endDate
            );

            if (result) {
                Object.assign(devs, result);
                progressCount++;
                setProgress((prevProgress) =>
                    Math.min((progressCount / repositories.length) * 100, 100)
                );

                return true;
            } else {
                console.error(`Failed to process repository: ${repository}`);
                return false;
            }
        })
    );

    if (!repositoriesLoaded.every((r) => r === true)) {
        throw new Error(
            "Something went wrong! Please contact the HC Utils admin."
        );
    }

    return devs;
}

export { getPullRequests };
