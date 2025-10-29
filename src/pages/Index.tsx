import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userScore, setUserScore] = useState(250);
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, category: 'Продукты', amount: 15000, date: '2025-10-15' },
    { id: 2, category: 'Транспорт', amount: 5000, date: '2025-10-18' },
    { id: 3, category: 'Развлечения', amount: 8000, date: '2025-10-20' }
  ]);

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'Правило 50/30/20',
      description: 'Оптимальное распределение доходов: 50% на необходимое, 30% на желаемое, 20% на сбережения. Этот принцип помогает поддерживать финансовый баланс.',
      category: 'Базовые принципы',
      icon: 'PieChart'
    },
    {
      id: 2,
      title: 'Сила сложного процента',
      description: 'Если инвестировать 10,000₽ ежемесячно под 12% годовых, через 20 лет накопится более 10 млн рублей. Время — ваш главный союзник в инвестициях.',
      category: 'Инвестиции',
      icon: 'TrendingUp'
    },
    {
      id: 3,
      title: 'Подушка безопасности',
      description: 'Эксперты рекомендуют иметь запас средств на 3-6 месяцев жизни. Это защитит вас от непредвиденных обстоятельств и даст финансовую стабильность.',
      category: 'Накопления',
      icon: 'Shield'
    },
    {
      id: 4,
      title: 'Диверсификация рисков',
      description: 'Не храните все яйца в одной корзине. Распределение капитала между разными активами снижает риски и повышает стабильность портфеля.',
      category: 'Риски',
      icon: 'Layers'
    }
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Что такое инфляция?',
      options: [
        'Рост цен на товары и услуги',
        'Снижение курса валюты',
        'Увеличение зарплат',
        'Уменьшение налогов'
      ],
      correctAnswer: 0,
      difficulty: 'easy',
      points: 10
    },
    {
      id: 2,
      question: 'Какой процент дохода рекомендуется откладывать ежемесячно?',
      options: ['5-10%', '10-20%', '20-30%', '30-40%'],
      correctAnswer: 1,
      difficulty: 'easy',
      points: 10
    },
    {
      id: 3,
      question: 'Что означает термин "диверсификация портфеля"?',
      options: [
        'Продажа всех активов',
        'Распределение инвестиций между разными активами',
        'Покупка одного вида акций',
        'Хранение денег в банке'
      ],
      correctAnswer: 1,
      difficulty: 'medium',
      points: 20
    },
    {
      id: 4,
      question: 'Что такое ликвидность актива?',
      options: [
        'Его прибыльность',
        'Скорость превращения в деньги',
        'Размер налога',
        'Срок владения'
      ],
      correctAnswer: 1,
      difficulty: 'hard',
      points: 30
    }
  ];

  const leaderboard = [
    { name: 'Алексей М.', score: 580, rank: 1 },
    { name: 'Мария К.', score: 520, rank: 2 },
    { name: 'Вы', score: userScore, rank: 8 },
    { name: 'Дмитрий П.', score: 420, rank: 3 },
    { name: 'Елена С.', score: 390, rank: 4 }
  ].sort((a, b) => b.score - a.score);

  const handleAnswerSubmit = (questionId: number) => {
    const question = quizQuestions.find(q => q.id === questionId);
    if (question && selectedAnswer === question.correctAnswer) {
      setUserScore(prev => prev + question.points);
    }
    setCurrentQuiz(null);
    setSelectedAnswer(null);
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetLimit = 50000;
  const budgetUsage = (totalExpenses / budgetLimit) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center animate-fade-in">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl shadow-lg">
              <Icon name="Sparkles" size={32} className="animate-pulse" />
              <h1 className="text-4xl font-heading font-bold">FinEasy</h1>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Твой путь к финансовой свободе начинается здесь
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-4xl mx-auto h-auto p-2 bg-white/80 backdrop-blur rounded-2xl shadow-lg">
            <TabsTrigger value="home" className="flex flex-col gap-1 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all">
              <Icon name="Home" size={20} />
              <span className="text-sm font-medium">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex flex-col gap-1 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all">
              <Icon name="Newspaper" size={20} />
              <span className="text-sm font-medium">Новости</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex flex-col gap-1 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all">
              <Icon name="Brain" size={20} />
              <span className="text-sm font-medium">Тесты</span>
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex flex-col gap-1 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all">
              <Icon name="Calendar" size={20} />
              <span className="text-sm font-medium">Планер</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8 animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white overflow-hidden hover:shadow-2xl transition-all hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="Trophy" size={24} />
                    Ваши баллы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold font-heading">{userScore}</div>
                  <p className="text-purple-100 mt-2">Место в рейтинге: #8</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white overflow-hidden hover:shadow-2xl transition-all hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="BookOpen" size={24} />
                    Пройдено тестов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold font-heading">12</div>
                  <p className="text-blue-100 mt-2">Средний балл: 85%</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 to-pink-500 text-white overflow-hidden hover:shadow-2xl transition-all hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Icon name="Wallet" size={24} />
                    Бюджет месяца
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold font-heading">{budgetUsage.toFixed(0)}%</div>
                  <p className="text-orange-100 mt-2">Использовано</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-heading">
                  <Icon name="Rocket" size={28} className="text-purple-600" />
                  Начните обучение
                </CardTitle>
                <CardDescription className="text-base">
                  Выберите раздел и улучшайте свои знания в финансовой грамотности
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Button
                  onClick={() => setActiveTab('news')}
                  className="h-auto py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Icon name="Newspaper" size={24} />
                    <div className="text-left">
                      <div className="font-semibold text-lg">Экономические факты</div>
                      <div className="text-sm text-purple-100">4 новых материала</div>
                    </div>
                  </div>
                </Button>
                <Button
                  onClick={() => setActiveTab('quiz')}
                  className="h-auto py-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Icon name="Brain" size={24} />
                    <div className="text-left">
                      <div className="font-semibold text-lg">Пройти тест</div>
                      <div className="text-sm text-blue-100">4 теста доступно</div>
                    </div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-6 animate-fade-in">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-heading">
                  <Icon name="Lightbulb" size={28} className="text-purple-600" />
                  Интересные факты о финансах
                </CardTitle>
                <CardDescription>
                  Узнавайте новое каждый день
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {newsItems.map((item, index) => (
                <Card
                  key={item.id}
                  className="border-0 shadow-lg bg-white hover:shadow-2xl transition-all hover-scale cursor-pointer overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge className="mb-2 bg-purple-100 text-purple-700 border-0">
                          {item.category}
                        </Badge>
                        <CardTitle className="text-xl font-heading flex items-center gap-2">
                          <Icon name={item.icon} size={24} className="text-purple-600" />
                          {item.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Icon name="Award" size={24} />
                    Ваш прогресс
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Баллы опыта</span>
                        <span className="font-bold">{userScore} XP</span>
                      </div>
                      <Progress value={(userScore % 100)} className="h-3 bg-purple-300" />
                    </div>
                    <div className="text-sm text-purple-100">
                      До следующего уровня: {100 - (userScore % 100)} XP
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" size={24} className="text-purple-600" />
                    Топ игроков
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.slice(0, 3).map((user, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          user.name === 'Вы' ? 'bg-purple-100 border-2 border-purple-600' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            idx === 0 ? 'bg-yellow-400 text-yellow-900' :
                            idx === 1 ? 'bg-gray-300 text-gray-700' :
                            'bg-orange-300 text-orange-900'
                          }`}>
                            {idx + 1}
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                        <span className="font-bold text-purple-600">{user.score} XP</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {quizQuestions.map((question, index) => (
                <Card
                  key={question.id}
                  className="border-0 shadow-lg bg-white hover:shadow-xl transition-all animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        className={`border-0 ${
                          question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}
                      >
                        {question.difficulty === 'easy' ? 'Легкий' :
                         question.difficulty === 'medium' ? 'Средний' : 'Сложный'}
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-700 border-0">
                        +{question.points} XP
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-heading">{question.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentQuiz === question.id ? (
                      <div className="space-y-3">
                        {question.options.map((option, idx) => (
                          <Button
                            key={idx}
                            variant={selectedAnswer === idx ? 'default' : 'outline'}
                            className={`w-full justify-start text-left h-auto py-3 ${
                              selectedAnswer === idx
                                ? 'bg-purple-600 text-white'
                                : 'hover:bg-purple-50'
                            }`}
                            onClick={() => setSelectedAnswer(idx)}
                          >
                            {option}
                          </Button>
                        ))}
                        <Button
                          onClick={() => handleAnswerSubmit(question.id)}
                          disabled={selectedAnswer === null}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        >
                          Ответить
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setCurrentQuiz(question.id)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        Начать тест
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="planner" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PiggyBank" size={24} className="text-purple-600" />
                    Бюджет на октябрь
                  </CardTitle>
                  <CardDescription>
                    Отслеживайте свои расходы
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Использовано</span>
                      <span className="font-bold">{totalExpenses.toLocaleString('ru-RU')} ₽ / {budgetLimit.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <Progress value={budgetUsage} className="h-3" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{budgetUsage.toFixed(0)}%</div>
                      <div className="text-xs text-gray-600">Израсходовано</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{(budgetLimit - totalExpenses).toLocaleString('ru-RU')}</div>
                      <div className="text-xs text-gray-600">Остаток</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{expenses.length}</div>
                      <div className="text-xs text-gray-600">Операций</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Plus" size={24} className="text-purple-600" />
                    Добавить расход
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Категория (например, Продукты)" />
                  <Input type="number" placeholder="Сумма в рублях" />
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    <Icon name="Save" size={18} className="mr-2" />
                    Сохранить
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="List" size={24} className="text-purple-600" />
                  История расходов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Icon name="ShoppingBag" size={20} className="text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium">{expense.category}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(expense.date).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-lg">{expense.amount.toLocaleString('ru-RU')} ₽</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
