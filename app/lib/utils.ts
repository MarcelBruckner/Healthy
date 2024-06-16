import moment from "moment";
import groupBy from "lodash/groupBy";
import { Food, FoodDB } from "./definitions";

export const formatCurrency = (amount: number | string) => {
  return (+amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric"
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export function groupEntriesByMonth(entries: Food[]) {
  const sortedGroups = Object.entries(
    groupBy(entries, (entry: Food) => {
      return moment(entry.datetime, "YYYY-MM-DD").format("YYYY MM");
    })
  ).sort((a, b) => (a[0] < b[0] ? 1 : -1));

  const knownMonths = sortedGroups.map(entry => entry[0]);

  for (let i = 0; i < 12; i++) {
    const month = moment(sortedGroups[0][0], "YYYY MM")
      .subtract(i, "months")
      .format("YYYY MM");
    if (knownMonths.includes(month)) {
      continue;
    }
    sortedGroups.push([month, []]);
  }

  return sortedGroups.sort((a, b) => (a[0] > b[0] ? 1 : -1));
}

export const generateYAxis = (entries: Food[]) => {
  const groupsByMonth = groupEntriesByMonth(entries);

  const topLabel = Math.max(
    ...Object.values(groupsByMonth).map(x => x[1].length)
  );

  const yAxisLabels = [];
  for (let i = topLabel; i >= 0; i -= 10) {
    yAxisLabels.push(i);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages
  ];
};

export function formatDatetime(datetime: Date) {
  return moment(datetime).format("YYYY-MM-DD HH:mm");
}
