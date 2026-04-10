import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Tool = {
  _id: string;
  name: string;
  slug: string;
  category?: string;
  rating?: number;
  imageUrl?: string;
  websiteUrl?: string;
};

type Category = {
  name: string;
  slug: string;
  href: string;
};

type ToolsState = {
  tools: Tool[];
  categories: Category[];
  loading: boolean;
  error: string | null;
};

const initialState: ToolsState = {
  tools: [],
  categories: [],
  loading: false,
  error: null,
};

// 🔥 SAFE API CALL
export const fetchTools = createAsyncThunk(
  "tools/fetchTools",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/tools");

      if (!res.ok) {
        throw new Error("Failed to fetch tools");
      }

      const data = await res.json();

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTools.fulfilled, (state, action) => {
        state.loading = false;
        state.tools = action.payload.tools;
        state.categories = action.payload.categories;
      })

      .addCase(fetchTools.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to load tools";
      });
  },
});

export default toolsSlice.reducer;
