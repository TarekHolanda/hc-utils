export const CUSTOMER_STATUS = {
    1: {
        label: "Good",
        class: "good",
    },
    2: {
        label: "Onboarding",
        class: "onboarding",
    },
    3: {
        label: "Churn",
        class: "churn",
    },
    4: {
        label: "Inactive",
        class: "inactive",
    },
    5: {
        label: "Low Risk",
        class: "low-risk",
    },
    6: {
        label: "Medium Risk",
        class: "medium-risk",
    },
    7: {
        label: "High Risk",
        class: "high-risk",
    },
};

export const COLUMN_WIDTH_LG = "18%";

export const COLUMN_WIDTH_MD = "12%";

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
