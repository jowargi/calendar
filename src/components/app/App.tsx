import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "../layout/Layout";
import CalendarPageRedirect from "../../redirects/CalendarPageRedirect";
import CalendarPage from "../../pages/calendar/CalendarPage";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="calendar" replace />} />
            <Route path="calendar" element={<CalendarPageRedirect />}>
              <Route path=":year" element={<Outlet />}>
                <Route path=":month" element={<CalendarPage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
