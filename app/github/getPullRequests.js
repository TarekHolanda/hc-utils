const gitToken = process.env.GITHUB_TOKEN;
const headers = { Authorization: `token ${gitToken}` };
const repositories = [
    "HeavyConnected/HC-pdf",
    "HeavyConnected/HC-App",
    "HeavyConnected/dashboard",
    "HeavyConnected/HC-Api",
];
const names = {
    albenorfilho: "Araújo",
    domi4662: "Carlos",
    "daviteixeira-btm": "Davi",
    dielfilho: "Davi",
    Eudalio: "Eudálio",
    "flavio-barros": "Flávio",
    gustavomts: "Gustavo",
    IraneideNascimento: "Iraneide",
    ivensgustavo: "Gusta Ivens",
    kerleysol: "Kerley",
    mardsonferreira: "Mardson",
    "Max-Wendel": "Max",
    paulorenne: "Paulo Rennê",
    TarekHolanda: "Tárek",
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

function initializeDeveloper(devs, username) {
    if (!devs[username]) {
        devs[username] = {
            name: names[username] || username,
            pullRequests: 0,
            reviews: 0,
            approved: 0,
            changesRequested: 0,
        };
    }
}

function updateDeveloper(devs, review) {
    initializeDeveloper(devs, review.user.login);
    console.log(review.user.login, ":", review.state);

    if (review.state === "APPROVED" || review.state === "DISMISSED") {
        devs[review.user.login].approved++;
        devs[review.user.login].reviews++;
    }

    if (review.state === "CHANGES_REQUESTED") {
        devs[review.user.login].changesRequested++;
        devs[review.user.login].reviews++;
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
                // 2, 27, 26, 25
                console.log(reviews);

                initializeDeveloper(devs, pullRequest.user.login);

                devs[pullRequest.user.login].pullRequests++;

                reviews.forEach((review) => updateDeveloper(devs, review));
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
