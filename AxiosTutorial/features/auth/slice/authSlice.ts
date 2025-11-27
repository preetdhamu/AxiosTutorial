import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../../features/auth/models/authStateModel";
import { AuthRepository } from "../../../features/auth/repository/AuthRepository";
import { createAuthUseCases } from "../../../features/auth/helper/AuthUseCases";
import { IAuthRepository } from "../../../features/auth/protocols/IAuthRepository";

let currentController: AbortController | null = null;
const repo : IAuthRepository = AuthRepository();
const useCases = createAuthUseCases(repo);

export const initialState: AuthState = {
    token: null,
    user: null,
    loading: false,
    error: null,
    firstLaunch: true,
    isAppLockedEnabled: false
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        finishOnBoarding: (state) => {
            state.firstLaunch = false;
        },
        updateGender: (state, action: PayloadAction<"male" | "female">) => {
            if (state.user) {
                state.user = { ...state.user, gender: action.payload };
            }
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.firstLaunch = false;
        },
        toggleAppLock : (state , action : PayloadAction<boolean>)=>{
            state.isAppLockedEnabled = action.payload;
        }


    },
    extraReducers: (builder) => {

        builder.addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state) => {
                state.loading = true;
                state.error = null;
            }
        );

        builder.addMatcher(
            (action) => action.type.endsWith("/fulfilled"),
            (state, action: any) => {
                state.loading = false;
                state.error = null;
                state.token = action.payload.token;
                state.user = action.payload.user;
            }
        );

        builder.addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            }
        );

    },
});


export const {
    finishOnBoarding,
    updateGender,
    logout,
    toggleAppLock 
} = authSlice.actions;



export default authSlice.reducer;



// ASYNC THUNKS 

export const loginWithEmailPassword = createAsyncThunk(
    'auth/loginEmailPassword',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {

        if (currentController) currentController.abort();
        currentController = new AbortController();

        try {
            return await useCases.loginEmail(email, password);
        } catch (e) {
            console.log(e);
            return rejectWithValue("Invalid email or password " + e);
        }
    }
);

export const loginWithGoogle = createAsyncThunk('auth/loginGoogle',
    async (_, { rejectWithValue }) => {
        if (currentController) currentController.abort();
        currentController = new AbortController();

        try {
            return await useCases.loginGoogle();
        } catch (e) {
            console.log(e)
            return rejectWithValue('Google Login Canclled');
        }
    }
)

export const loginWithFacebook = createAsyncThunk(
    'auth/loginFacebook',
    async (_, { rejectWithValue }) => {
        if (currentController) currentController.abort();
        currentController = new AbortController();

        try {
            return await useCases.loginFaceBook();
        } catch (e) {
            console.log(e);
            return rejectWithValue('Facebook login cancelled');
        }
    }
);
