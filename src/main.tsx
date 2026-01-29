import BookmarkAdd from '@page/BookmarkAdd.tsx';
import FolderAdd from '@page/FolderAdd.tsx';
import Home from '@page/Home.tsx';
import Login from '@page/Login.tsx';
import Logout from '@page/Logout.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/bookmarks" element={<BookmarkAdd />} />
          <Route path="/folders" element={<FolderAdd />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
