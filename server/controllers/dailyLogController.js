const asyncHandler = require("express-async-handler");
const DailyLog = require("../models/dailyLogModel");
const User = require("../models/userModel");

//@desc Get dailyLog
//@route GET api/dailyLog
//@access Private
const getDailyLog = asyncHandler(async (req, res) => {
  //use Hub Code .find({hubId: req.hubId}) when hubIds exist
  const dailyLog = await DailyLog.find();
  res.status(200).json(dailyLog);
});

//@desc Set dailyLogEntry
//@route POST api/dailyLog
//@access Private
const setDailyLogEntry = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please set a activity name");
  }
  const dailyLogEntry = await DailyLog.create({
    user: req.body.user,
    name: req.body.name,
    avatarUrl: req.body.avatarUrl,
    title: req.body.title,
    body: req.body.body,
    categories: req.body.categories,
  });
  res.status(201).json(dailyLogEntry);
});

//@desc Update dailyLogEntry
//@route PUT api/dailyLog/:dailyLogEntry_id
//@access Private
const updateDailyLogEntry = asyncHandler(async (req, res) => {
  const dailyLogEntry = await DailyLog.findById(req.params.dailyLogEntry_id);

  if (!dailyLogEntry) {
    res.status(400);
    throw new Error("Activity not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Add error handling when hubcodes don't match entry and user
  const updatedDailyLogEntry = await DailyLog.findByIdAndUpdate(
    req.params.dailyLogEntry_id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedDailyLogEntry);
});

//@desc Delete dailyLogEntry
//@route DELETE api/dailyLog/:dailyLogEntry_id
//@access Private
const deleteDailyLogEntry = asyncHandler(async (req, res) => {
  const dailyLogEntry = await DailyLog.findByIdAndRemove(
    req.params.dailyLogEntry_id
  );

  if (!dailyLogEntry) {
    res.status(400);
    throw new Error("Activity not found");
  }

  res.status(200).json(`Activty ${dailyLogEntry.title} deleted`);
});

module.exports = {
  getDailyLog,
  setDailyLogEntry,
  updateDailyLogEntry,
  deleteDailyLogEntry,
};
