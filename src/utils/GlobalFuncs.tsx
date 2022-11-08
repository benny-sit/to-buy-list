export function convertDate(s: string) {
    const formatter = (val: number, unit: string) => { return `Last update ${Math.floor(val)} ${unit}${val > 1 ? "s" : ""} ago`; };
    let seconds: number = (Date.now() - Date.parse(s)) / 1000;
    let minutes: number = seconds / 60;
    if ( minutes < 1) {
      return "Last update few seconds ago";
    }
    let hours: number = minutes / 60;
    if ( hours < 1) {
      return formatter(minutes, "minute");
    }
    let days: number = hours / 24;
    if ( days < 1) {
      return formatter(hours, "hour");
    }
    let months: number = days / 30;
    if (months < 1) {
      return formatter(days, "day");
    }
    let years: number = months / 12;
    if (years < 1) {
      return formatter(months, "month");
    }
    return `Last update ${Math.floor(years)} year${years > 1 && "s"} and ${Math.floor(months)} month${months > 1 && "s"} ago`;
  }