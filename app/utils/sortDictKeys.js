const stringProps = ["name"];

export const sortDictKeys = (dict, sortingField, sortingOrder = "asc") => {
    return Object.keys(dict).sort((a, b) => {
        // Check if the sorting field is a string
        if (stringProps.includes(sortingField)) {
            return sortingOrder === "asc"
                ? dict[a][sortingField].localeCompare(dict[b][sortingField])
                : dict[b][sortingField].localeCompare(dict[a][sortingField]);
        }
        // Otherwise, sort by numeric value
        return sortingOrder === "asc"
            ? dict[a][sortingField] - dict[b][sortingField]
            : dict[b][sortingField] - dict[a][sortingField];
    });
};

export default sortDictKeys;
