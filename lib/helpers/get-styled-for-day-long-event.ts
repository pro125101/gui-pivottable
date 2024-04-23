"use client";

import { IMonthDay } from "@/redux/hooks/types/date";
import { IEvent } from "@/redux/hooks/types/events";
import { checkDateIsEqual, getDateTime, getDifferenceOfTwoDates, shmoment } from "@/lib/date";

export const getStyledForDayLongEvent = (day: IMonthDay, event: IEvent) => {
  const firstItem = day;
  const lastItem = day;
  const startDate = getDateTime(new Date(event.start), '00:00');
  const endDate = getDateTime(new Date(event.end), '23:59');
  const firtDayOfNextInterval = shmoment(lastItem.date).add('days', 1).result();
  const lastDay = shmoment(lastItem.date).add('hours', 23).add('minutes', 59).result();

  const isStartDayEvent = checkDateIsEqual(day.date, startDate);
  const isEventMovingToNextInterval = firtDayOfNextInterval.getTime() < endDate.getTime();
  const isEventMovingFromPrevInterval = checkDateIsEqual(firstItem.date, day.date) && day.date.getTime() > startDate.getTime();

  let eventWidth = 1;
  let isShowEvent = true;


  if (isStartDayEvent) {

    if (isEventMovingToNextInterval) {
      const totalDiffInDays = getDifferenceOfTwoDates(startDate, lastDay).days;
      eventWidth = Math.ceil(totalDiffInDays);
    }
    else {
      const totalDiffInDays = getDifferenceOfTwoDates(startDate, endDate).days;
      eventWidth = Math.ceil(totalDiffInDays);
    }
  }
  else if (isEventMovingFromPrevInterval) {
    const isLastDate = lastDay.getTime() < endDate.getTime();
    const diffInDays = getDifferenceOfTwoDates(day.date, isLastDate ? lastDay : endDate).days;
    eventWidth = Math.ceil(diffInDays);
  }
  else {
    isShowEvent = false;
  }

  return {
    width: eventWidth * 100,
    isShowEvent,
    isMovingToNext: isEventMovingToNextInterval,
    isMovingFromPrev: isEventMovingFromPrevInterval
  }
}