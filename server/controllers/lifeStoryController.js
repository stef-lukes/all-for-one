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

//@desc Update lifeStory
//@route POST api/lifeStory/:lifeStory_id
//@access Private
// const updateLifeStory = asyncHandler(async (req, res) => {
//   const lifeStory = await LifeStory.findById(req.params.lifeStory_id);
//   console.log(lifeStory);
//   if (!lifeStory) {
//     res.status(400);
//     throw new Error("Lifestory not found");
//   }

//   // if (!req.user) {
//   //   res.status(401);
//   //   throw new Error("User not found");
//   // }
//   //Add error handling when hubcodes don't match liefStory and user
//   const updatedLifeStory = await LifeStory.findByIdAndUpdate(
//     req.params.lifeStory_id,
//     req.body,
//     {
//       new: true,
//     }
//   );
//   res.status(200).json(updatedLifeStory);
// });

//@desc Update QandA on lifeStory
//@route PUT api/lifeStory/:category
//@access Private
const updateLifeStoryAnswer = asyncHandler(async (req, res) => {
  const lifeStoryQA = await LifeStory.findById(req.params.questionAnswer.qaID);
  if (!lifeStoryQA) {
    res.status(400);
    throw new Error("Lifestory question not found");
  }

  // if (!req.user) {
  //   res.status(401);
  //   throw new Error("User not found");
  // }
  //Add error handling when hubcodes don't match liefStory and user
  const updatedLifeStory = await LifeStory.findByIdAndUpdate(
    req.params.questionAnswer.qaID,
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
  updateLifeStoryAnswer,
  deleteLifeStory,
};
