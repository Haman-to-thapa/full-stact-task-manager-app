import express from "express";
import { Task } from "../modules/task.js";
import { auth } from "../middleware/auth.js";

const routes = express.Router();

// GET all tasks (should be protected)
routes.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    return res.status(200).json({
      success: true,
      message: "Successfully fetched tasks",
      tasks
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error at getTask"
    });
  }
});

routes.post('/', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user: req.user._id
    });
    await task.save();
    return res.status(201).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error at createTask"
    });
  }
});

routes.put('/:id', auth, async(req,res) => {
  try {
    const task = await Task.findOneAndUpdate({
      _id: req.params.id, user: req.user._id
    }, req.body, {new:true})
    if(!task) {
      return res.status(404).json({
        success:false,
        message:"task not found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"updated successfully",
      task
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"server error at updated"
    })
  }
})

routes.delete('/:id', auth, async(req, res) => {
  try {
    
    const task = await Task.findByIdAndDelete({
      _id: req.params.id,
      user: req.user._id
    })
    if(!task) {
      return res.status(404).json({
        success:false,
        message :"user not found"
      })
    }
    return res.status(200).json({
      success:true,
      meessage: "Delete successfully"
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"server error at delete"
    })
  }
})

export default routes