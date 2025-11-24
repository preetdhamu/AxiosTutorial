import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../../features/auth/models/authStateModel";
import { fakeLoginAPI } from "../../../api/authApi";

let currentController: AbortController | null = null;

export const initialState: AuthState = {
    token: null,
    user: null,
    loading: false,
    error: null,
    firstLaunch: true,
};

export const loginWithEmailPassword = createAsyncThunk(
    'auth/loginEmailPassword',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {

        if (currentController) currentController.abort();
        currentController = new AbortController();

        try {
            return await fakeLoginAPI('email', email, password);
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
            return await fakeLoginAPI('google');
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
            return await fakeLoginAPI('facebook');
        } catch (e) {
            console.log(e);
            return rejectWithValue('Facebook login cancelled');
        }
    }
);

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
    },
    extraReducers: (builder) => {

        
        builder.addCase(loginWithGoogle.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        
        builder.addCase(loginWithFacebook.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(loginWithEmailPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        });


        builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.loading = false;
            state.error = null;
        });

        builder.addCase(loginWithFacebook.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.loading = false;
            state.error = null;
        });
       
        builder.addCase(loginWithEmailPassword.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.loading = false;
            state.error = null;
        });


        builder.addCase(loginWithGoogle.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(loginWithFacebook.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });


        builder.addCase(loginWithEmailPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

    },
});


export const { 
    finishOnBoarding,
    updateGender,
    logout 
} = authSlice.actions;



export default authSlice.reducer;