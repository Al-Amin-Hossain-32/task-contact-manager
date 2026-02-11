import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null ;

const tokenFromStorage = localStorage.getItem("token") || null;

const initialState = {
    user : userFromStorage,
    token : tokenFromStorage,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        loginSuccess : (state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;

            localStorage.setItem("user",JSON.stringify(action.payload.user));
            localStorage.setItem("token",action.payload.token)
        },
        logout : (state)=>{
            state.user = null;
            state.token = null ;

            localStorage.removeItem("user");
            localStorage.removeItem("token") 
        },
    },
});

const API = "https://task-contact-manager.onrender.com/api/auth"; 

// ✅ login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/login`, { email, password });
      return res.data; // expect { user, token }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const {loginSuccess,logout} = authSlice.actions;
export default authSlice.reducer;


