const formatDateFromTimestamp = (timestamp: number) => {
  const currentDate: number = Number(new Date());

  const differenceInMilliseconds = currentDate - timestamp;
  const millisecondsInAMinute = 1000 * 60;
  const millisecondsInAnHour = 1000 * 60 * 60;
  const millisecondsInADay = 1000 * 60 * 60 * 24;

  const minutesPassed = Math.floor(
    differenceInMilliseconds / millisecondsInAMinute
  );
  const hoursPassed = Math.floor(
    differenceInMilliseconds / millisecondsInAnHour
  );
  const daysPassed = Math.floor(differenceInMilliseconds / millisecondsInADay);

  if (daysPassed > 1) {
    return { time: daysPassed, measure: "days" };
  } else {
    if (hoursPassed < 1) {
      return { time: minutesPassed, measure: "minutes" };
    }
    return { time: hoursPassed, measure: "hours" };
  }
};

export default formatDateFromTimestamp;
