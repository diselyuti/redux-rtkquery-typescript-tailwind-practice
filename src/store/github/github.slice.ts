import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const LS_FAV_KEY = "github-fav";

interface GithubState {
    favorites: string[];
}

const initialState: GithubState = {
    favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) || "[]"),
}

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<string>) => {
            if (!state.favorites.includes(action.payload)) {
                state.favorites.push(action.payload);
            }
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(f => f !== action.payload);
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
        }
    }
})

export const githubReducer = githubSlice.reducer;
export const githubActions = githubSlice.actions;
