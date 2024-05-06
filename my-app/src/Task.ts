import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  taskName: string;
  deadline: number;
  completed: boolean;
}

const taskSchema: Schema = new Schema({
  taskName: {
    type: String,
    required: true
  },
  deadline: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;