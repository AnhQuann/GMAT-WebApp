export const SELECT_QUESTION_PACK = "Select question pack";

const defaultQuestionPack = () => {
  return {
    name: "",
    id: "",
    questions: []
  }
}

export function selectQuestionPack(questionPack, handleOK, handleCancel, title="Edit question") {
  return {
    type: SELECT_QUESTION_PACK,
    payload: {
      questionPack: questionPack? questionPack: defaultQuestionPack(),
      handleCancel, handleOK, title
    }
  };
}

const DUMMY_QUESTION_ARRAYS = [
  {
    id: 1,
    stimulus: `With employer-paid training, workers have the potential to become more productive not only in their present employment but also in any number of jobs with different employers. To increase the productivity of their workforce, many firms are planning to maintain or even increase their investments in worker training. But some training experts object that if a trained worker is hired away by another firm, the employer that paid for the training has merely subsidized a competitor. They note that such hiring has been on the rise in recent years.`,
    stem: `Which of the following would, if true, contribute most to defeating the training experts’ objection to the firms’ strategy?`,
    choices: [
      `Firms that promise opportunities for advancement to their employees get, on average, somewhat larger numbers of job applications from untrained workers than do firms that make no such promise.`,
      `In many industries, employees who take continuing-education courses are more competitive in the job market.`,
      `More and more educational and training institutions are offering reduced tuition fees to firms that subsidize worker training.`,
      `Research shows that workers whose training is wholly or partially subsidized by their employer tend to get at least as much training as do workers who pay for all their own training`,
      `For most firms that invest in training their employees, the value added by that investment in employees who stay exceeds the value lost through other employees’ leaving to work for other companies`
    ],
    rightChoice: 1,
    explanation: `Before we actually jump into game programming, we need to know something called event driven programming. Event driven programming refers to that style of programming wherein the user of the application is free to choose from several options rather than be confined to a predetermined sequence of interactions with the program. Game programming is one common example of event driven programming.`,
    difficulty: 0,
  },
  {
    id: 2,
    stimulus: `Political theorist: Even with the best spies, area experts, and satellite surveillance, foreign policy assessments can still lack important information. In such circumstances intuitive judgment is vital. A national leader with such judgment can make good decisions about foreign policy even when current information is incomplete, since __________.`,
    stem: `Which of the following, if true, most logically completes the argument?`,
    choices: [
      `the central reason for failure in foreign policy decision making is the absence of critical information`,
      `those leaders whose foreign policy decisions have been highly ranked have also been found to have good intuitive judgment`,
      `both intuitive judgment and good information are required for sound decision making `,
      `both intuitive judgment and good information are required for sound decision making `,
      `intuitive judgment can produce good decisions based on past experience, even when there are important gaps in current information`
    ],
    rightChoice: 2,
    explanation: `i.e., complete and self sufficient formal system that represents a subset of reality. A game is a perfect combination of actions-reactions or event-responses where every response is based on the most-recently occurred event.`,
    difficulty: 1,
  },
  {
    id: 3,
    stimulus: `Archaeologists use technology to analyze ancient sites. It is likely that this technology will advance considerably in the near future, allowing archaeologists to gather more information than is currently possible. If they study certain sites now, they risk contaminating or compromising them for future studies. Therefore, in order to maximize the potential for gathering knowledge in the long run, a team of archaeologists plans to delay the examination of a newly excavated site.`,
    stem: `Which of the following would be most useful to investigate for the purpose of evaluating the plan’s prospects for achieving its goal?`,
    choices: [
      `Whether any of the contents of the site will significantly deteriorate before the anticipated technology is available`,
      `Whether there will continue to be improvements on the relevant technology`,
      `Whether the team can study a site other than the newly excavated site for the time being`,
      `Whether the site was inhabited by a very ancient culture`,
      `Whether the anticipated technology will damage objects under study`
    ],
    rightChoice: 3,
    explanation: `Graphics consists of any images that are displayed and any effects that are performed on them. This includes 3D objects, textures, 2D tiles, 2D full screen shots, Full Motion Video (FMV) and anything else that the player will see.`,
    difficulty: 2,
  }
];