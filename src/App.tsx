import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CategoryIcon from '@mui/icons-material/Category';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/category";
import {
  AuthorCreate,
  AuthorEdit,
  AuthorList,
  AuthorShow,
} from "./pages/author";
import {
  BookCopyCreate,
  BookCopyEdit,
  BookCopyList,
  BookCopyShow,
} from "./pages/book_copy";
import {
  CheckoutCreate,
  CheckoutEdit,
  CheckoutList,
  CheckoutShow,
} from "./pages/checkout";
import {
  PatronAccountCreate,
  PatronAccountEdit,
  PatronAccountList,
  PatronAccountShow,
} from "./pages/patron_account";
import {
  BookCreate,
  BookEdit,
  BookList,
  BookShow,
} from "./pages/book";
import { supabaseClient } from "./utility";
import Home from "./pages/Home/home";

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(supabaseClient)}
              liveProvider={liveProvider(supabaseClient)}
              authProvider={authProvider}
              routerProvider={routerBindings}
              notificationProvider={notificationProvider}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: "home" ,
                  list : "/",
                  icon: <HomeIcon/>
                },
                {
                  name: "book",
                  list: "/book",
                  create: "/book/create",
                  edit: "/book/edit/:id",
                  show: "/book/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon : <BookIcon/>
                },
                {
                  name: "book_copy",
                  list: "/book-copy",
                  create: "/book-copy/create",
                  edit: "/book-copy/edit/:id",
                  show: "/book-copy/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon: <MenuBookIcon/>
                },
                {
                  name: "category",
                  list: "/category",
                  create: "/category/create",
                  edit: "/category/edit/:id",
                  show: "/category/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon : <CategoryIcon/>
                },
                {
                  name: "author",
                  list: "/author",
                  create: "/author/create",
                  edit: "/author/edit/:id",
                  show: "/author/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon: <DriveFileRenameOutlineIcon/>
                },
                {
                  name: "checkout",
                  list: "/checkout",
                  create: "/checkout/create",
                  edit: "/checkout/edit/:id",
                  show: "/checkout/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon: <CreditScoreIcon/>
                },
                {
                  name: "patron_account",
                  list: "/patron_account",
                  create: "/patron_account/create",
                  edit: "/patron_account/edit/:id",
                  show: "/patron_account/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon: <PeopleAltIcon/>
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}

            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2
                        Header={() => <Header sticky />}
                        Title={({ collapsed }) => (
                          <ThemedTitleV2
                            collapsed={collapsed}
                            text="Librify"
                            icon={<AppIcon />}
                          />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route path="/category">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route>
                  <Route path="/author">
                    <Route index element={<AuthorList />} />
                    <Route path="create" element={<AuthorCreate />} />
                    <Route path="edit/:id" element={<AuthorEdit />} />
                    <Route path="show/:id" element={<AuthorShow />} />
                  </Route>
                  <Route path="/book-copy">
                    <Route index element={<BookCopyList />} />
                    <Route path="create" element={<BookCopyCreate />} />
                    <Route path="edit/:id" element={<BookCopyEdit />} />
                    <Route path="show/:id" element={<BookCopyShow />} />
                  </Route>
                  <Route path="/checkout">
                    <Route index element={<CheckoutList />} />
                    <Route path="create" element={<CheckoutCreate />} />
                    <Route path="edit/:id" element={<CheckoutEdit />} />
                    <Route path="show/:id" element={<CheckoutShow />} />
                  </Route>
                  <Route path="/book">
                    <Route index element={<BookList />} />
                    <Route path="create" element={<BookCreate />} />
                    <Route path="edit/:id" element={<BookEdit />} />
                    <Route path="show/:id" element={<BookShow />} />
                  </Route>
                  <Route path="/patron_account">
                    <Route index element={<PatronAccountList />} />
                    <Route path="create" element={<PatronAccountCreate />} />
                    <Route path="edit/:id" element={<PatronAccountEdit />} />
                    <Route path="show/:id" element={<PatronAccountShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                  <Route path="/" index element={<Home/>} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <Outlet/>
                    </Authenticated>
                  }
                >
                  <Route
                    path="/login"
                    element={
                      <AuthPage
                        type="login"
                        title={
                          <ThemedTitleV2
                            collapsed={true}
                            text="Librify"
                            icon={<AppIcon />}
                          />
                        }
                        formProps={{
                          defaultValues: {
                            email: "",
                            password: "",
                          },
                        }}
                      />
                    }
                  />
                  <Route
                    path="/register"
                    element={<AuthPage type="register" />}
                  />
                  <Route
                    path="/forgot-password"
                    element={<AuthPage type="forgotPassword" />}
                  />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
