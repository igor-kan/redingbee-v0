import { ReadingText } from './types';

export const texts: ReadingText[] = [
  {
    id: 1,
    content: `The human brain is one of the most complex and fascinating organs in the body. It contains approximately 86 billion neurons, each forming thousands of connections with other neurons. These connections, called synapses, allow for the transmission of electrical and chemical signals that control everything from basic bodily functions to complex thoughts and emotions. The brain's ability to form new neural connections and modify existing ones, known as neuroplasticity, enables learning and memory formation throughout our lives.`,
    readingTimeLimit: 120, // 2 minutes
    testingTimeLimit: 30,
    questions: [
      {
        text: "How many neurons does the human brain contain?",
        options: ["76 billion", "86 billion", "96 billion", "106 billion"],
        correctAnswer: 1
      },
      {
        text: "What are the connections between neurons called?",
        options: ["Axons", "Dendrites", "Synapses", "Neurons"],
        correctAnswer: 2
      },
      {
        text: "What is the brain's ability to form new neural connections called?",
        options: ["Neurotransmission", "Neuroplasticity", "Neuroscience", "Neurogenesis"],
        correctAnswer: 1
      },
      {
        text: "What type of signals do neurons transmit?",
        options: ["Only electrical", "Only chemical", "Electrical and chemical", "Neither"],
        correctAnswer: 2
      },
      {
        text: "What does neuroplasticity enable?",
        options: ["Only learning", "Only memory", "Neither learning nor memory", "Both learning and memory"],
        correctAnswer: 3
      }
    ]
  },
  {
    id: 2,
    content: `Climate change is causing unprecedented changes to Earth's ecosystems. Rising global temperatures are leading to more frequent extreme weather events, melting polar ice caps, and rising sea levels. These changes affect not only human communities but also countless plant and animal species. Scientists have observed shifts in migration patterns, breeding seasons, and habitat ranges. Some species are adapting to these changes, while others face potential extinction if they cannot adjust quickly enough.`,
    readingTimeLimit: 90, // 1.5 minutes
    testingTimeLimit: 25,
    questions: [
      {
        text: "What is one direct effect of rising global temperatures?",
        options: ["More rainfall only", "Fewer storms", "More extreme weather events", "Lower sea levels"],
        correctAnswer: 2
      },
      {
        text: "What are scientists observing in animal behavior?",
        options: ["Only migration changes", "Changes in migration and breeding", "No changes", "Only breeding changes"],
        correctAnswer: 1
      },
      {
        text: "What happens to species that cannot adapt quickly enough?",
        options: ["They thrive", "They migrate", "They face extinction", "They evolve instantly"],
        correctAnswer: 2
      },
      {
        text: "What is happening to polar ice caps?",
        options: ["Growing", "Melting", "Staying the same", "Disappearing completely"],
        correctAnswer: 1
      },
      {
        text: "How are plant species affected by climate change?",
        options: ["Not affected", "Only positively", "Through habitat changes", "Only negatively"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 3,
    content: `Artificial Intelligence is revolutionizing various industries, from healthcare to transportation. Machine learning algorithms can now analyze vast amounts of data to identify patterns and make predictions with increasing accuracy. AI systems are being used to diagnose diseases, optimize traffic flow, and even create art. However, this technology also raises important ethical questions about privacy, bias, and the future of human work.`,
    readingTimeLimit: 60, // 1 minute
    testingTimeLimit: 15,
    questions: [
      {
        text: "What can machine learning algorithms analyze?",
        options: ["Small data sets", "Vast amounts of data", "No data", "Only text data"],
        correctAnswer: 1
      },
      {
        text: "Which is NOT mentioned as an application of AI?",
        options: ["Healthcare", "Transportation", "Space exploration", "Art creation"],
        correctAnswer: 2
      },
      {
        text: "What ethical concern is mentioned?",
        options: ["Privacy", "Cost", "Speed", "Energy use"],
        correctAnswer: 0
      },
      {
        text: "What can AI systems do in healthcare?",
        options: ["Only research", "Diagnose diseases", "Only administration", "Nothing"],
        correctAnswer: 1
      },
      {
        text: "What aspect of human society does AI affect?",
        options: ["Only leisure", "Only work", "The future of work", "None"],
        correctAnswer: 2
      }
    ]
  }
];