import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What type is Pikachu?",
    options: ["Fire", "Water", "Electric", "Grass"],
    correctAnswer: 2,
    explanation: "Pikachu is the famous Electric-type Pokémon!"
  },
  {
    id: 2,
    question: "Which Pokémon is known as the Flame Pokémon?",
    options: ["Charmander", "Charizard", "Charmeleon", "All of the above"],
    correctAnswer: 3,
    explanation: "All three Pokémon in the Charmander evolution line are known as Flame Pokémon!"
  },
  {
    id: 3,
    question: "What is the first Pokémon in the National Pokédex?",
    options: ["Pikachu", "Mew", "Bulbasaur", "Charmander"],
    correctAnswer: 2,
    explanation: "Bulbasaur is #001 in the National Pokédex!"
  },
  {
    id: 4,
    question: "Which type is super effective against Water-type Pokémon?",
    options: ["Fire", "Electric", "Ice", "Normal"],
    correctAnswer: 1,
    explanation: "Electric-type moves are super effective against Water-type Pokémon!"
  },
  {
    id: 5,
    question: "What item evolves Pikachu into Raichu?",
    options: ["Fire Stone", "Water Stone", "Thunder Stone", "Leaf Stone"],
    correctAnswer: 2,
    explanation: "Pikachu evolves into Raichu when exposed to a Thunder Stone!"
  },
  {
    id: 6,
    question: "Which Pokémon is known as the Psychic-type legendary?",
    options: ["Mewtwo", "Mew", "Both A and B", "Neither"],
    correctAnswer: 2,
    explanation: "Both Mew and Mewtwo are legendary Psychic-type Pokémon!"
  },
  {
    id: 7,
    question: "What does Team Rocket's motto end with?",
    options: ["Team Rocket blasts off again!", "Prepare for trouble!", "Make it double!", "That's right!"],
    correctAnswer: 0,
    explanation: "Team Rocket's motto famously ends with 'Team Rocket blasts off again!'"
  },
  {
    id: 8,
    question: "Which Pokémon can learn the most moves?",
    options: ["Mew", "Ditto", "Arceus", "Smeargle"],
    correctAnswer: 0,
    explanation: "Mew can learn almost every TM and move in the game, making it incredibly versatile!"
  },
  {
    id: 9,
    question: "What is Ash's hometown?",
    options: ["Cerulean City", "Pallet Town", "Viridian City", "Pewter City"],
    correctAnswer: 1,
    explanation: "Ash Ketchum is from Pallet Town, where Professor Oak's lab is located!"
  },
  {
    id: 10,
    question: "Which Pokémon evolves into Gyarados?",
    options: ["Goldeen", "Magikarp", "Staryu", "Tentacool"],
    correctAnswer: 1,
    explanation: "The seemingly weak Magikarp evolves into the mighty Gyarados at level 20!"
  }
];

const Quiz = () => {
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    shuffleQuestions();
  }, []);

  const shuffleQuestions = () => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 8);
    setCurrentQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setAnswered(true);
    setShowResult(true);
    
    if (selectedAnswer === currentQuestions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    shuffleQuestions();
  };

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;

  if (currentQuestions.length === 0) {
    return <div>Loading quiz...</div>;
  }

  if (quizCompleted) {
    const percentage = Math.round((score / currentQuestions.length) * 100);
    let message = "";
    let badgeColor = "";

    if (percentage >= 90) {
      message = "Pokémon Master! 🏆";
      badgeColor = "bg-pokemon-yellow text-black";
    } else if (percentage >= 70) {
      message = "Great Trainer! ⭐";
      badgeColor = "bg-pokemon-blue text-white";
    } else if (percentage >= 50) {
      message = "Good effort! 👍";
      badgeColor = "bg-pokemon-red text-white";
    } else {
      message = "Keep training! 💪";
      badgeColor = "bg-pokemon-blue text-white";
    }

    return (
      <section id="quiz" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="shadow-hover bg-card border-2 border-border/50">
              <CardHeader>
                <CardTitle className="font-pokemon text-2xl md:text-3xl text-primary">
                  Quiz Complete!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-6xl mb-4">🎉</div>
                <Badge className={`text-lg px-4 py-2 ${badgeColor}`}>
                  {message}
                </Badge>
                <div className="text-4xl font-bold text-foreground">
                  {score}/{currentQuestions.length}
                </div>
                <div className="text-xl text-muted-foreground">
                  You scored {percentage}%
                </div>
                <Button
                  onClick={restartQuiz}
                  size="lg"
                  className="bg-gradient-to-r from-pokemon-red to-pokemon-red/90 hover:from-pokemon-red/90 hover:to-pokemon-red text-white shadow-pokeball hover:shadow-hover transition-all duration-300 transform hover:scale-105 border-2 border-pokemon-red/20"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Play Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-pokemon text-3xl md:text-4xl text-pokemon-solid-yellow mb-4 text-pokemon-solid">
            ⚡ Pokémon Quiz
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test your Pokémon knowledge with our fun quiz!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>
              <span>Score: {score}/{currentQuestions.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="shadow-card hover:shadow-hover transition-all duration-300 bg-card border-2 border-border/50">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-center text-foreground">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 mb-6">
                {currentQuestion.options.map((option, index) => {
                  let buttonClass = "text-left h-auto p-4 transition-all duration-200";
                  let textColor = "text-black";
                  let bgColor = "bg-white";
                  let borderColor = "border-gray-300";
                  let hoverBg = "hover:bg-pokemon-red/10";
                  let hoverBorder = "hover:border-pokemon-red/30";
                  
                  if (showResult) {
                    if (index === currentQuestion.correctAnswer) {
                      buttonClass = "text-left h-auto p-4 transition-all duration-200 bg-green-500 text-white border-green-500 hover:bg-green-500";
                    } else if (index === selectedAnswer) {
                      buttonClass = "text-left h-auto p-4 transition-all duration-200 bg-red-500 text-white border-red-500 hover:bg-red-500";
                    } else {
                      buttonClass = "text-left h-auto p-4 transition-all duration-200 bg-white text-black border-gray-300 hover:bg-gray-100";
                    }
                  } else if (selectedAnswer === index) {
                    buttonClass = "text-left h-auto p-4 transition-all duration-200 bg-pokemon-red text-white border-pokemon-red";
                  } else {
                    buttonClass = "text-left h-auto p-4 transition-all duration-200 bg-white text-black border-gray-300 hover:bg-pokemon-red/10 hover:border-pokemon-red/30";
                  }

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={buttonClass}
                      style={{
                        backgroundColor: showResult 
                          ? (index === currentQuestion.correctAnswer 
                              ? '#10b981' 
                              : index === selectedAnswer 
                                ? '#ef4444' 
                                : '#ffffff')
                          : selectedAnswer === index 
                            ? '#dc2626' 
                            : '#ffffff',
                        color: showResult 
                          ? (index === currentQuestion.correctAnswer || index === selectedAnswer 
                              ? '#ffffff' 
                              : '#000000')
                          : selectedAnswer === index 
                            ? '#ffffff' 
                            : '#000000',
                        borderColor: showResult 
                          ? (index === currentQuestion.correctAnswer 
                              ? '#10b981' 
                              : index === selectedAnswer 
                                ? '#ef4444' 
                                : '#d1d5db')
                          : selectedAnswer === index 
                            ? '#dc2626' 
                            : '#d1d5db'
                      }}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={answered}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{option}</span>
                        {showResult && index === currentQuestion.correctAnswer && (
                          <CheckCircle className="h-5 w-5" />
                        )}
                        {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                          <XCircle className="h-5 w-5" />
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>

              {/* Result and Explanation */}
              {showResult && (
                <div className="mb-6 p-4 bg-muted rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="font-semibold text-foreground">
                      {selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : "Incorrect!"}
                    </span>
                  </div>
                  {currentQuestion.explanation && (
                    <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center">
                {!answered ? (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="bg-pokemon-red hover:bg-pokemon-red/90 text-white px-8 shadow-pokeball hover:shadow-hover transition-all duration-300"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-pokemon-blue hover:bg-pokemon-blue/90 text-white px-8 shadow-electric hover:shadow-hover transition-all duration-300"
                  >
                    {currentQuestionIndex < currentQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Quiz;