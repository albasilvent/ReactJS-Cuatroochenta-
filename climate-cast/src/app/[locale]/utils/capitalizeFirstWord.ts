export function capitalizeFirstWord(description: string) {
    if (!description) return "";
    return description.charAt(0).toUpperCase() + description.slice(1);
}
