import { ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { appTheme } from './app.theme';
import { Shell } from './layout';
import { Altair, DataDictionary, Home, IntroToGraphql, Login, ReleaseNotes } from './pages';

export function App() {

  return (
    <div>
      <ThemeProvider theme={appTheme}>
        <Shell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data-dictionary" element={<DataDictionary />} />
            <Route path="/login" element={<Login />} />
            <Route path="/api-requests" element={<Navigate to="/api-requests/intro" replace={true} />} />
            <Route path="/api-requests/intro" element={<IntroToGraphql />} />
            <Route
              path="/api-requests/altair"
              element={<Navigate to="/api-requests/altair/install" replace={true} />}
            />
            <Route path="/api-requests/altair/install" element={<Altair />} />
            <Route path="/api-requests/altair/getting-started" element={<Altair />} />
            <Route path="/api-requests/altair/tips" element={<Altair />} />
            <Route path="/api-requests/altair/resources" element={<Altair />} />
            <Route path="/release-notes" element={<ReleaseNotes />} />
          </Routes>
        </Shell>
      </ThemeProvider>
    </div>
  );
}

export default App;
