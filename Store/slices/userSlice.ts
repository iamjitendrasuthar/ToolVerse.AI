import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

/* TYPES */
type UserState = {
  email: string | null;
  bookmarkIds: string[];
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  user: any | null;
};

/* STATE */
const initialState: UserState = {
  email: null,
  bookmarkIds: [],
  isLoggedIn: false,
  loading: false,
  error: null,
  user: null,
};

/* FETCH BOOKMARKS + USER */
export const fetchBookmarks = createAsyncThunk(
  "user/fetchBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/bookmarks");
      const data = await res.json();

      return {
        user: data.user,
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

/* TOGGLE BOOKMARK */
export const toggleBookmark = createAsyncThunk(
  "user/toggleBookmark",
  async (toolId: string, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/bookmarks/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue("Failed to toggle bookmark");
      }

      return data.bookmarkIds;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

/* SLICE */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.email = null;
      state.bookmarkIds = [];
      state.user = null;
      state.isLoggedIn = false;
    },
  },

  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.bookmarkIds = action.payload.user?.bookmarkIds || [];
        state.email = action.payload.user?.email || null;
        state.isLoggedIn = true;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* TOGGLE */
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        state.bookmarkIds = action.payload;
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
