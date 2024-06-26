import dayjs from "dayjs";

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateOnly = new Date(
        date.valueOf() + date.getTimezoneOffset() * 60 * 1000
    );
    const dateFormatted = dayjs(dateOnly).format("MMM YYYY");
    return dateFormatted;
};
