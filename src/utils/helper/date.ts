import moment from "moment";

export const formatDate = (date: Date, format = `DD MMM YYYY`) => moment(date).format(format)

export function getDayWithIndex(year: number, month: number, dayIndex: number, type: "id" | "en-us" = "en-us") {
    return {
        date: new Date(year, month, dayIndex),
        formattedDate: new Date(year, month, dayIndex).toLocaleDateString(type, { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    }
}

export function getToday() {
    const today = new Date();
    return today;
}

export function get10DaysLater() {
    const TenDaysLaterDate = new Date()
    TenDaysLaterDate.setDate(new Date().getDate() + 10)
    return TenDaysLaterDate
}

export function getYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
}

export function getLast7Days() {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // 7 days ago
    return {
        startDate: sevenDaysAgo,
        endDate: today,
    };
}

export function getLast30Days() {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29); // 30 days ago
    return {
        startDate: thirtyDaysAgo,
        endDate: today,
    };
}

export function getDaysInThisMonth(month: number, year: number, type: "id" | "en-us" = "en-us"): { date: Date, formattedDate: string }[] {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = [];
    for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
        daysInMonth.push({
            date: new Date(day),
            formattedDate: new Date(day).toLocaleDateString(type, { weekday: "long", year: "numeric", month: "short", day: "numeric" })
        });
    }
    return daysInMonth;
}

export function getThisMonth() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return {
        startDate: firstDayOfMonth,
        endDate: today,
    };
}

export function getLastMonth() {
    const today = new Date();
    const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    return {
        startDate: firstDayOfLastMonth,
        endDate: lastDayOfLastMonth,
    };
}

export function get5yearsAhead(): number[] {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 6 }, (_, index) => currentYear + index);
}

export function getNyearsBack(yearsCount: number): number[] {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: yearsCount }, (_, index) => currentYear - index);
}

export function getCurrentYear(): number {
    return new Date().getFullYear();
}

export function get5YearsAheadAndBack(): number[] {
    // Get the current year
    const currentYear = new Date().getFullYear();
    // Create an array for 10 years back and ahead
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        years.push(i);
    }
    return years
}

export function get10YearsAheadAndBack(): number[] {
    // Get the current year
    const currentYear = new Date().getFullYear();
    // Create an array for 10 years back and ahead
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
        years.push(i);
    }
    return years
}

export function getMonthsInYear(isShort: boolean = false): string[] {
    const months = [];
    for (let i = 0; i < 12; i++) {
        const date = new Date(2023, i, 1); // Use any year (e.g., 2023) since month names are constant
        const monthName = date.toLocaleString('en-US', { month: isShort ? 'short' : 'long' });
        months.push(monthName);
    }
    return months;
}

export function getMonthsInYearStartFromNindex(monthIndex: number = 0, isShort: boolean = false): string[] {
    const months = [];
    let monthLoopIndex = monthIndex
    for (let i = 0; i < 12; i++) {
        const date = new Date(2023, monthLoopIndex, 1); // Use any year (e.g., 2023) since month names are constant
        const monthName = date.toLocaleString('en-US', { month: isShort ? 'short' : 'long' });
        monthLoopIndex++
        if (monthLoopIndex === 12) {
            monthLoopIndex = 0; // Reset to January
        }
        months.push(monthName);
    }
    return months;
}

export function getCurrentMonthIndex() {
    const today = new Date();
    const currentMonth = today.getMonth();
    return currentMonth;
}

export function formatDateForBackEnd(date: Date | null = new Date()) {
    return date == null
        ? `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`
        : `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`
}

export function getYearsFrom2000(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    for (let year = currentYear; year >= 2000; year--) {
        years.push(year);
    }

    return years;
}