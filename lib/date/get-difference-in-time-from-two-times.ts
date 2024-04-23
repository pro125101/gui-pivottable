"use client";

import { checkTimesInSameDay } from "./check-times-in-same-day";
import { getDateTime } from "./get-datetime";
import { getDifferenceOfTwoDates } from "./get-difference-of-two-dates";
import { shmoment } from "./shmoment";

export const getDifferenceInTimeFromTwoTimes = (timeStart: string, timeEnd: string) => {
    const isTimesInSameDay = checkTimesInSameDay(timeStart, timeEnd);
    const startDate = getDateTime(new Date(), timeStart);
    let endDate = getDateTime(startDate, timeEnd);

    if (!isTimesInSameDay) {
        const nextDay = shmoment(startDate).add('days', 1).result();
        endDate = getDateTime(nextDay, timeEnd);
    }

    const { hours, minutes } = getDifferenceOfTwoDates(startDate, endDate);

    return { hours, minutes };
}