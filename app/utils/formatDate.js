import { format } from "date-fns";

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateOnly = new Date(
        date.valueOf() + date.getTimezoneOffset() * 60 * 1000
    );
    const dateFormatted = format(dateOnly, "MMM yyyy");
    return dateFormatted;
};
