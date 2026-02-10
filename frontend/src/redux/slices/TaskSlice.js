import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
const API = "http://localhost:5000/api/tasks";

// fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetch", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// add task
export const addTask = createAsyncThunk("tasks/add", async (taskData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const res = await axios.post(API, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// delete task
export const deleteTask = createAsyncThunk("tasks/delete", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchTasks.pending, (state) => { state.loading = true; })
      .addCase(fetchTasks.fulfilled, (state, action) => { state.loading = false; state.tasks = action.payload; })
      .addCase(fetchTasks.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // add
      .addCase(addTask.pending, (state) => { state.loading = true; })
      .addCase(addTask.fulfilled, (state, action) => { state.loading = false; state.tasks.push(action.payload); })
      .addCase(addTask.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // delete
      .addCase(deleteTask.pending, (state) => { state.loading = true; })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default taskSlice.reducer;
// update task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, updatedTask }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.put(`${API}/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
