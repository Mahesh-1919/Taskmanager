import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createProject,
  deleteProject,
  getProjects,
} from "@/app/actions/action";

const ProjectSlice = createSlice({
  name: "Projects",
  initialState: { items: <any[]>[] },

  reducers: {
    addItem(state, action: PayloadAction<any>) {
      state.items.push(action.payload);
      createProject(action.payload);
    },
    removeItem(state, action: PayloadAction<any>) {
      let index: string = "";
      state.items = state.items.filter((item) => {
        if (item.id == action.payload) {
          index = item.id;
        }
        return item.id !== action.payload;
      });
      deleteProject(index);
    },
  },
});

export const { addItem, removeItem } = ProjectSlice.actions;

export const fetchProjects = () => async (dispatch: any) => {
  try {
    const response: any = await getProjects();
    console.log("data", response.data);
    dispatch(addItem(response.data));
  } catch (error) {
    console.error(error);
  }
};

export default ProjectSlice.reducer;
