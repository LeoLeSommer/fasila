// Format a string with a given value
// Example:
// format("Hello, {0}!", "world") => "Hello, world!"
export function format(str: string, ...args: any[]): string {
  return str.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== "undefined" ? args[index] : match;
  });
}
