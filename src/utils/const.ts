import { endOfDay, startOfDay, subMonths } from "date-fns";

export const oneMonthAgo = subMonths(new Date(), 1);
export const todayStart = startOfDay(new Date());
export const todayEnd = endOfDay(new Date());
