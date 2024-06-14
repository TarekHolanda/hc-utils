export const CUSTOMER_STATUS = {
    1: {
        label: "Good",
        class: "good",
    },
    2: {
        label: "Recently Deployed",
        class: "recently-deployed",
    },
    3: {
        label: "Onboarding",
        class: "onboarding",
    },
    4: {
        label: "Risky",
        class: "risky",
    },
    5: {
        label: "Onboard at Risk",
        class: "onboard-at-risk",
    },
    6: {
        label: "New Deal",
        class: "new-deal",
    },
    7: {
        label: "Ganaz",
        class: "ganaz",
    },
    8: {
        label: "Churned",
        class: "churned",
    },
    9: {
        label: "Other",
        class: "other",
    },
};

export const COLUMN_WIDTH_LG = "10%";

export const COLUMN_WIDTH_MD = "10%";

export const COLUMN_WIDTH_SM = "10%";

export const RULER_DEFAULT_MONDAY = [
    {
        index: 0,
        task: "merge",
        selected: false,
    },
    {
        index: 1,
        task: "merge",
        selected: false,
    },
    {
        index: 2,
        task: "merge",
        selected: false,
    },
    {
        index: 3,
        task: "merge",
        selected: false,
    },
];

export const RULER_DEFAULT_TUESDAY = [
    {
        index: 0,
        task: "merge",
        selected: false,
    },
    {
        index: 1,
        task: "merge",
        selected: false,
    },
    {
        index: 2,
        task: "merge",
        selected: false,
    },
    {
        index: 3,
        task: "version",
        selected: false,
    },
];

export const RULER_DEFAULT_WEDNESDAY = [
    {
        index: 0,
        task: "accept",
        selected: false,
    },
    {
        index: 1,
        task: "accept",
        selected: false,
    },
    {
        index: 2,
        task: "accept",
        selected: false,
    },
    {
        index: 3,
        task: "accept",
        selected: false,
    },
];

export const RULER_DEFAULT_THURSDAY = [
    {
        index: 0,
        task: "accept",
        selected: false,
    },
    {
        index: 1,
        task: "final",
        selected: false,
    },
    {
        index: 2,
        task: "final",
        selected: false,
    },
    {
        index: 3,
        task: "final",
        selected: false,
    },
];

export const RULER_DEFAULT_FRIDAY = [
    {
        index: 0,
        task: "none",
        selected: false,
    },
    {
        index: 1,
        task: "none",
        selected: false,
    },
    {
        index: 2,
        task: "none",
        selected: false,
    },
    {
        index: 3,
        task: "none",
        selected: false,
    },
];

export const RULER_DEFAULT_WEEK = [
    {
        index: 0,
        lines: RULER_DEFAULT_MONDAY,
    },
    {
        index: 1,
        lines: RULER_DEFAULT_TUESDAY,
    },
    {
        index: 2,
        lines: RULER_DEFAULT_WEDNESDAY,
    },
    {
        index: 3,
        lines: RULER_DEFAULT_THURSDAY,
    },
    {
        index: 4,
        lines: RULER_DEFAULT_FRIDAY,
    },
];
