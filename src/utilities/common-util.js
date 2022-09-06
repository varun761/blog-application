import moment from "moment"

const singularPlural = (value, string) =>
  value <= 1 ? string : `${string}s`;

const dateDifference = (value) => {
  const currentDate = moment();
  const createdDate = moment(value);
  const differenceInSecond = currentDate.diff(createdDate, "seconds");
  if (differenceInSecond <= 60) {
    return `${differenceInSecond} ${singularPlural(
      differenceInSecond,
      "second"
    )} ago`;
  }
  const differenceInMinutes = currentDate.diff(createdDate, "minutes");
  if (differenceInMinutes <= 60) {
    return `${differenceInMinutes} ${singularPlural(
      differenceInMinutes,
      "minute"
    )} ago`;
  }
  const differenceInHours = currentDate.diff(createdDate, "hours");
  if (differenceInHours < 24) {
    return `${differenceInHours} ${singularPlural(
      differenceInHours,
      "hour"
    )} ago`;
  }

  const differenceInDays = currentDate.diff(createdDate, "days");
  const differenceInMonths = currentDate.diff(createdDate, "months");
  if (differenceInMonths < 1) {
    return `${differenceInDays} ${singularPlural(differenceInDays, "day")} ago`;
  }
  if (differenceInMonths < 12) {
    return `${differenceInMonths} ${singularPlural(
      differenceInMonths,
      "month"
    )} ago`;
  }
  const differenceInYears = currentDate.diff(createdDate, "years");
  return `${differenceInYears} ${singularPlural(
    differenceInYears,
    "years"
  )} ago`;
};

export default {
    dateDifference
}
