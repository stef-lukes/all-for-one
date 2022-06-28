const asyncHandler = require("express-async-handler");
const DailyLog = require("../models/dailyLogModel");

//@desc Get dailyLog
//@route GET api/dailyLog
//@access Private
const getDailyLog = asyncHandler(async (req, res) => {
  const dailyLog = await DailyLog.find();
  res.status(200).json(dailyLog);
});

//@desc Set dailyLogEntry
//@route POST api/dailyLog
//@access Private
const setDailyLogEntry = asyncHandler(async (req, res) => {
  if (!req.body.activityName) {
    res.status(400);
    throw new Error("Please set a activity name");
  }
  const dailyLogEntry = await DailyLog.create({
    activityName: req.body.activityName,
    bodyText: req.body.bodyText,
    categories: req.body.categories,
    colour: req.body.colour,
    order: req.body.order,
    isRecurring: req.body.isRecurring,
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

  res.status(200).json(`Activty ${dailyLogEntry.activityName} deleted`);
});

module.exports = {
  getDailyLog,
  setDailyLogEntry,
  updateDailyLogEntry,
  deleteDailyLogEntry,
};
