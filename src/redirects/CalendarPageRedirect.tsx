import { Navigate, Outlet, useParams } from "react-router-dom";

const isValidYear = (year: number): boolean => {
  if (!Number.isFinite(year)) return false;

  return Number.isInteger(year) && year > 0;
};

const isValidMonth = (month: number): boolean => {
  if (!Number.isFinite(month)) return false;

  return Number.isInteger(month) && month >= 0 && month <= 11;
};

export default function CalendarPageRedirect() {
  const { year } = useParams();
  const { month } = useParams();

  if (isValidYear(Number(year)) && isValidMonth(Number(month)))
    return <Outlet />;

  const today = new Date();

  return (
    <Navigate
      to={`/calendar/${today.getFullYear()}/${today.getMonth()}`}
      replace
    />
  );
}
