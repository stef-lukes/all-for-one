const asyncHandler = require("express-async-handler");
const LifeStory = require("../models/lifeStoryModel");

//@desc Get lifeStory
//@route GET api/lifeStory
//@access Private
const getLifeStory = asyncHandler(async (req, res) => {
  //use Hub Code .find({hubId: req.hubId}) when hubIds exist
  const lifeStory = await LifeStory.find();
  res.status(200).json(lifeStory);
});

//@desc Create lifeStory
//@route POST api/lifeStory
//@access Private
const createLifeStory = asyncHandler(async (req, res) => {
  console.log(req.body, "body in controller");

  if (!req.body.heading) {
    res.status(400);
    throw new Error("Please add a heading");
  }
  const lifeStory = await LifeStory.create({
    user: req.body.user,
    heading: req.body.heading,
    bodyText: req.body.bodyText,
    categories: req.body.categories,
  });
  console.log(lifeStory._id, "in controller");
  res.status(201).json(lifeStory);
});

//@desc Update lifeStory
//@route POST api/lifeStory/:lifeStory_id
//@access Private
const updateLifeStory = asyncHandler(async (req, res) => {
  const lifeStory = await LifeStory.findById(req.params.lifeStory_id);

  if (!lifeStory) {
    res.status(400);
    throw new Error("Lifestory not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //Add error handling when hubcodes don't match liefStory and user
  const updatedLifeStory = await LifeStory.findByIdAndUpdate(
    req.params.lifeStory_id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedLifeStory);
});

//@desc Delete lifeStory
//@route DELETE api/LifeStory/:lifeStory_id
//@access Private
const deleteLifeStory = asyncHandler(async (req, res) => {
  const lifeStory = await LifeStory.findByIdAndRemove(req.params.lifeStory_id);

  if (!lifeStory) {
    res.status(400);
    throw new Error("LifeStory not found");
  }

  res.status(200).json(`LifeStory ${lifeStory.heading} deleted`);
});

module.exports = {
  getLifeStory,
  createLifeStory,
  updateLifeStory,
  deleteLifeStory,
};
