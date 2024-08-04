import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetcharticles,
  addarticle,
  deletearticle,
  editarticle,
  fetcharticleById,
  fetcharticlesPagination
} from '../services/articleservice';

export const getArticlesPagination = createAsyncThunk(
  'article/getArticlesPagination',
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { page, limit, searchTerm } = getState().storearticles; // Correction ici pour utiliser le nom correct du slice
    try {
      const res = await fetcharticlesPagination(page, limit, searchTerm);
     
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getArticles = createAsyncThunk(
  'article/getArticles',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetcharticles();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createArticle = createAsyncThunk(
  'article/createArticle',
  async (article, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await addarticle(article);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const delArticle = createAsyncThunk(
  'article/delArticle',
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await deletearticle(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateArticle = createAsyncThunk(
  'article/updateArticle',
  async (article, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await editarticle(article);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const findArticleByID = createAsyncThunk(
  'article/findArticleByID',
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetcharticleById(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    article: {},
    isLoading: false,
    success: null,
    error: null,
    page: 1,
    limit: 10,
    status:'idle',
    tot: 0, // Utiliser un nom plus clair pour la pagination totale
    searchTerm: ''
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get articles avec pagination et filtre
      .addCase(getArticlesPagination.pending, (state) => {
        console.log('pending');
        state.isLoading = true;
        state.error = null;
        state.status="loading";
      })
      .addCase(getArticlesPagination.fulfilled, (state, action) => {
        console.log('fulfilled');
        state.isLoading = false;
        state.error = null;
         state.status="suceeded"
        state.articles = action.payload.products;
        state.tot = action.payload.totalPages; // Correction du nom de la propriété
      })
      .addCase(getArticlesPagination.rejected, (state, action) => {
        console.log('rejected');
        state.isLoading = false;
        state.status="failed"
        state.error = action.payload;
        console.log("impossible de se connecter au serveur");
      })
      // Get articles
      .addCase(getArticles.pending, (state) => {
        console.log('pending');
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        console.log('fulfilled');
        state.isLoading = false;
        state.error = null;
        state.articles = action.payload;
      })
      .addCase(getArticles.rejected, (state, action) => {
        console.log('rejected');
        state.isLoading = false;
        state.error = action.payload;
        console.log("impossible de se connecter au serveur");
      })
      // Insertion article
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.articles.push(action.payload);
        state.isLoading = false;
        state.error = null;
        state.success = action.payload;
        console.log(state.success);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log(state.error);
        state.success = null;
      })
      // Modification article
      .addCase(updateArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.articles = state.articles.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.isLoading = false;
        state.error = null;
        state.success = action.payload;
      })
      // Delete article
      .addCase(delArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(delArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.articles = state.articles.filter((item) => item._id !== action.payload);
      })
      .addCase(delArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = null;
      })
      // Fetch article by ID
      .addCase(findArticleByID.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(findArticleByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.article = action.payload;
      });
  }
});

export default articleSlice.reducer;
export const { setPage, setLimit, setSearchTerm } = articleSlice.actions;
